import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, Image,
    KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Send } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { chatAPI } from '../api/chat';
import { getUploadUrl } from '../api/config';
import { useAuth } from '../context/AuthContext';

interface Message {
    _id: string;
    sender: { _id: string; name: string; avatar: string } | string;
    content: string;
    type: string;
    createdAt: string;
}

const ChatScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { chatId, user: otherUser, receiverId, receiverName } = route.params || {};
    const { user: me } = useAuth();

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentChatId, setCurrentChatId] = useState<string | null>(chatId);
    const [chatBuddy, setChatBuddy] = useState<any>(otherUser || (receiverId ? { _id: receiverId, name: receiverName } : null));
    const scrollRef = useRef<ScrollView>(null);

    const fetchMessages = useCallback(async (id: string) => {
        try {
            const res = await chatAPI.getMessages(id);
            setMessages(res.data.messages || []);
            if (res.data.participants) {
                const buddy = res.data.participants.find((p: any) => p._id !== me?._id);
                setChatBuddy(buddy);
            }
        } catch (err) {
            console.error('Fetch messages error:', err);
        } finally {
            setLoading(false);
        }
    }, [me]);

    useEffect(() => {
        const initChat = async () => {
            setError(null);
            console.log('Initializing Chat Screen with params:', { chatId, receiverId, receiverName });
            
            if (chatId) {
                await fetchMessages(chatId);
            } else if (receiverId) {
                try {
                    const res = await chatAPI.create(receiverId);
                    const newChatId = res.data.chat?._id;
                    if (!newChatId) throw new Error("Chat creation failed (no ID returned)");
                    
                    setCurrentChatId(newChatId);
                    setChatBuddy(res.data.chat.user);
                    setLoading(false);
                    await fetchMessages(newChatId);
                } catch (err: any) {
                    setError(err.response?.data?.error || err.message || "Failed to initialize chat");
                    setLoading(false);
                }
            } else {
                setError("No chat or recipient specified.");
                setLoading(false);
            }
        };
        initChat();
    }, [chatId, receiverId, fetchMessages]);

    useEffect(() => {
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 100);
    }, [messages]);

    const handleSend = async () => {
        const text = inputText.trim();
        if (!text) return;
        
        if (!currentChatId) {
            Alert.alert("Initializing", "Please wait a moment while we set up your chat...");
            return;
        }

        setInputText('');
        setSending(true);
        try {
            const res = await chatAPI.sendMessage(currentChatId, text);
            setMessages(prev => [...prev, res.data.message]);
        } catch (err) {
            console.error('Send message error:', err);
            Alert.alert("Error", "Could not send message. Please check your connection.");
        } finally {
            setSending(false);
        }
    };

    const getTimeStr = (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const isMine = (msg: Message) => {
        const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
        return senderId === me?._id;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={28} color="#4F9A42" />
                </TouchableOpacity>
                <Image
                    source={{ uri: chatBuddy?.avatar ? getUploadUrl(chatBuddy.avatar) : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80' }}
                    style={styles.headerAvatar}
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.headerName}>{chatBuddy?.name || 'Chat'}</Text>
                    <Text style={styles.headerStatus}>Online</Text>
                </View>
            </View>

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#4F9A42" />
                    </View>
                ) : error ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
                        <Text style={{ fontSize: 16, color: '#FF4D4D', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
                        <TouchableOpacity 
                            onPress={() => { setLoading(true); navigation.goBack(); }}
                            style={{ backgroundColor: '#4F9A42', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25 }}
                        >
                            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <ScrollView
                        ref={scrollRef}
                        contentContainerStyle={styles.messagesContainer}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                    >
                        {messages.length === 0 && (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>No messages yet. Say hello! 👋</Text>
                            </View>
                        )}
                        {messages.map((msg, i) => {
                            const mine = isMine(msg);
                            return (
                                <View key={msg._id || i} style={[styles.messageRow, mine ? styles.myRow : styles.theirRow]}>
                                    {!mine && (
                                        <Image
                                            source={{ uri: typeof msg.sender === 'object' && msg.sender.avatar ? getUploadUrl(msg.sender.avatar) : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=40' }}
                                            style={styles.msgAvatar}
                                        />
                                    )}
                                    <View style={[styles.bubble, mine ? styles.myBubble : styles.theirBubble]}>
                                        <Text style={[styles.bubbleText, mine ? styles.myText : styles.theirText]}>{msg.content}</Text>
                                        <Text style={[styles.timeText, mine ? { color: 'rgba(255,255,255,0.7)' } : { color: '#AAA' }]}>{getTimeStr(msg.createdAt)}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}

                {/* Input Bar */}
                <View style={styles.inputBar}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type a message..."
                        placeholderTextColor="#AAA"
                        multiline
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity 
                        onPress={handleSend} 
                        disabled={sending || !inputText.trim()} 
                        style={[styles.sendBtn, (sending || !inputText.trim()) && { opacity: 0.4 }]}
                    >
                        {sending ? <ActivityIndicator size="small" color="#FFF" /> : <Send size={20} color="#FFF" />}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFBE6' },
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 15, paddingVertical: 12,
        backgroundColor: '#FFFBE6',
        borderBottomWidth: 1, borderBottomColor: '#EEE',
    },
    backBtn: { marginRight: 8 },
    headerAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
    headerInfo: { flex: 1 },
    headerName: { fontSize: 17, fontWeight: '700', color: '#141414' },
    headerStatus: { fontSize: 13, color: '#4F9A42', marginTop: 2 },
    messagesContainer: { padding: 15, paddingBottom: 10 },
    emptyState: { flex: 1, alignItems: 'center', marginTop: 60 },
    emptyText: { color: '#999', fontSize: 15 },
    messageRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
    myRow: { justifyContent: 'flex-end' },
    theirRow: { justifyContent: 'flex-start' },
    msgAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
    bubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
    myBubble: { backgroundColor: '#4F9A42', borderBottomRightRadius: 4 },
    theirBubble: { backgroundColor: '#FFF', borderBottomLeftRadius: 4, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
    bubbleText: { fontSize: 15, lineHeight: 20 },
    myText: { color: '#FFF' },
    theirText: { color: '#141414' },
    timeText: { fontSize: 11, marginTop: 4, alignSelf: 'flex-end' },
    inputBar: {
        flexDirection: 'row', alignItems: 'flex-end',
        paddingHorizontal: 15, paddingVertical: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1, borderTopColor: '#EEE',
    },
    input: {
        flex: 1, backgroundColor: '#F5F5F5', borderRadius: 22,
        paddingHorizontal: 16, paddingVertical: 10,
        fontSize: 15, maxHeight: 100, color: '#141414',
    },
    sendBtn: {
        marginLeft: 10, width: 44, height: 44,
        borderRadius: 22, backgroundColor: '#4F9A42',
        justifyContent: 'center', alignItems: 'center',
    },
});

export default ChatScreen;

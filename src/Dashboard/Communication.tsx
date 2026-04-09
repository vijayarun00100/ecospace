import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, ActivityIndicator, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Search, SquarePen, Check, CheckCheck, Settings, Image as ImageIcon, Mic, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { chatAPI } from '../api/chat';
import { getUploadUrl } from '../api/config';
import { usersAPI } from '../api/users';

const { width } = Dimensions.get('window');

const Communication = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState('Chat');
    const [chatList, setChatList] = useState<any[]>([]);
    const [communityList, setCommunityList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newChatModal, setNewChatModal] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [chatsRes, commRes] = await Promise.all([
                chatAPI.getChats(),
                chatAPI.getCommunities(),
            ]);
            setChatList(chatsRes.data.chats || []);
            setCommunityList(commRes.data.communities || []);
        } catch (err) {
            console.error('Communication fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getTimeAgo = (date: string) => {
        if (!date) return '';
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return 'just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return 'last week';
    };

    const handleUserSearch = useCallback(async (query: string) => {
        setUserSearch(query);
        if (!query.trim()) { setSearchResults([]); return; }
        setSearchLoading(true);
        try {
            const res = await usersAPI.search(query);
            setSearchResults(res.data.users || []);
        } catch (err) {
            console.error('User search error:', err);
        } finally {
            setSearchLoading(false);
        }
    }, []);

    const handleStartChat = async (selectedUser: any) => {
        setNewChatModal(false);
        setUserSearch('');
        setSearchResults([]);
        navigation.navigate('ChatScreen', { chatId: null, user: selectedUser, newChat: true });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <Text style={styles.headerLogo}>ecospace</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <Bell color="#000" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <Settings color="#000" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar Container */}
            <View style={styles.searchSection}>
                <View style={styles.searchBox}>
                    <Search color="#BBB" size={24} />
                    <TextInput 
                        placeholder="Search chats..."
                        placeholderTextColor="#BBB"
                        style={styles.searchField}
                    />
                </View>
            </View>

            {/* Tabs Wrapper */}
            <View style={styles.tabsWrapper}>
                <TouchableOpacity 
                    onPress={() => setActiveTab('Chat')}
                    style={[styles.tabButton, activeTab === 'Chat' && styles.activeTabButton]}
                >
                    <Text style={[styles.tabLabel, activeTab === 'Chat' && styles.activeTabLabel]}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab('Community')}
                    style={[styles.tabButton, activeTab === 'Community' && styles.activeTabButton]}
                >
                    <Text style={[styles.tabLabel, activeTab === 'Community' && styles.activeTabLabel]}>Community</Text>
                </TouchableOpacity>
            </View>

            {/* Content Container */}
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#4F9A42" />
                </View>
            ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                {activeTab === 'Chat' ? (
                    chatList.length === 0 ? (
                        <View style={{ alignItems: 'center', marginTop: 60 }}>
                            <Text style={{ color: '#999', fontSize: 16 }}>No chats yet. Start a conversation!</Text>
                        </View>
                    ) : (
                    chatList.map((chat) => (
                        <TouchableOpacity key={chat._id} style={styles.chatItem} onPress={() => navigation.navigate('ChatScreen', { chatId: chat._id, user: chat.user })}>
                            <View style={styles.avatarWrapper}>
                                <Image 
                                    source={{ uri: chat.user?.avatar ? getUploadUrl(chat.user.avatar) : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' }} 
                                    style={styles.chatAvatar} 
                                />
                                <View style={styles.statusDot} />
                            </View>
                            <View style={styles.chatBody}>
                                <View style={styles.chatHeader}>
                                    <Text style={styles.senderName}>{chat.user?.name || 'User'}</Text>
                                    <Text style={styles.chatTime}>{getTimeAgo(chat.lastMessageAt)}</Text>
                                </View>
                                <View style={styles.chatFooter}>
                                    <View style={styles.messagePreview}>
                                        {chat.unread === 0 && <CheckCheck size={16} color="#5584EE" style={{ marginRight: 4 }} />}
                                        <Text numberOfLines={1} style={[styles.messageText, chat.unread > 0 && styles.unreadText]}>
                                            {chat.lastMessage || 'Start a conversation'}
                                        </Text>
                                    </View>
                                    {chat.unread > 0 && (
                                        <View style={styles.unreadBadge}>
                                            <Text style={styles.unreadCount}>{chat.unread}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                    )
                ) : (
                    communityList.length === 0 ? (
                        <View style={{ alignItems: 'center', marginTop: 60 }}>
                            <Text style={{ color: '#999', fontSize: 16 }}>No communities found. Join one!</Text>
                        </View>
                    ) : (
                    communityList.map((group) => (
                        <TouchableOpacity key={group._id} style={styles.chatItem}>
                            <Image 
                                source={{ uri: group.image ? getUploadUrl(group.image) : 'https://images.unsplash.com/photo-1416870230247-d0a91adb1c67?w=200' }} 
                                style={styles.chatAvatar} 
                            />
                            <View style={styles.chatBody}>
                                <View style={styles.chatHeader}>
                                    <Text style={styles.senderName}>{group.name}</Text>
                                    <Text style={styles.chatTime}>{getTimeAgo(group.lastMessageAt)}</Text>
                                </View>
                                <View style={styles.chatFooter}>
                                    <View style={styles.participantStack}>
                                        <Text numberOfLines={1} style={styles.groupMessage}>
                                            {group.lastMessage || `${group.memberCount} members`}
                                        </Text>
                                    </View>
                                    {group.unread > 0 && (
                                        <View style={styles.unreadBadge}>
                                            <Text style={styles.unreadCount}>{group.unread}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                    )
                )}
            </ScrollView>
            )}

            {/* FAB */}
            {activeTab === 'Chat' && (
                <TouchableOpacity style={styles.fab} onPress={() => setNewChatModal(true)}>
                    <SquarePen color="#FFF" size={28} strokeWidth={2.5} />
                </TouchableOpacity>
            )}

            {/* New Chat Modal */}
            <Modal visible={newChatModal} animationType="slide" transparent={true}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, height: '70%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>New Chat</Text>
                            <TouchableOpacity onPress={() => { setNewChatModal(false); setUserSearch(''); setSearchResults([]); }}>
                                <X size={26} color="#999" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 20, paddingHorizontal: 14, marginBottom: 16 }}>
                            <Search size={18} color="#AAA" />
                            <TextInput
                                style={{ flex: 1, marginLeft: 10, fontSize: 16, height: 44, color: '#141414' }}
                                placeholder="Search for a user..."
                                value={userSearch}
                                onChangeText={handleUserSearch}
                                autoFocus
                            />
                        </View>
                        {searchLoading ? (
                            <ActivityIndicator color="#4F9A42" />
                        ) : searchResults.length === 0 && userSearch.trim() ? (
                            <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>No users found</Text>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {searchResults.map(u => (
                                    <TouchableOpacity key={u._id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }} onPress={() => handleStartChat(u)}>
                                        <Image source={{ uri: u.avatar ? getUploadUrl(u.avatar) : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=60' }} style={{ width: 46, height: 46, borderRadius: 23, marginRight: 14 }} />
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#141414' }}>{u.name}</Text>
                                            {u.bio ? <Text style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{u.bio}</Text> : null}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBE6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFBE6',
    },
    headerLogo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 2,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    coinIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#FBC02D',
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinDot: {
        width: 1.5,
        height: 6,
        backgroundColor: '#FFF',
        borderRadius: 1,
    },
    coinText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    headerIconButton: {
        marginLeft: 15,
    },
    searchSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 55,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    searchField: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: '#000',
    },
    tabsWrapper: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
    },
    activeTabButton: {
        borderBottomWidth: 3,
        borderBottomColor: '#4F9A42',
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
    },
    activeTabLabel: {
        color: '#4F9A42',
    },
    listContainer: {
        paddingTop: 10,
        paddingBottom: 100,
    },
    chatItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 18,
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'relative',
    },
    chatAvatar: {
        width: 58,
        height: 58,
        borderRadius: 29,
    },
    statusDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4F9A42',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    chatBody: {
        flex: 1,
        marginLeft: 15,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    senderName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },
    chatTime: {
        fontSize: 13,
        color: '#999',
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    messagePreview: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    messageText: {
        fontSize: 15,
        color: '#666',
        flexShrink: 1,
    },
    unreadText: {
        color: '#141414',
        fontWeight: '500',
    },
    unreadBadge: {
        backgroundColor: '#4F9A42',
        minWidth: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        marginLeft: 10,
    },
    unreadCount: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
    participantStack: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarStack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    miniAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    countBadge: {
        backgroundColor: '#FBC02D',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
    },
    countText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    groupMessage: {
        fontSize: 15,
        color: '#666',
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 100,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4F9A42',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});

export default Communication;

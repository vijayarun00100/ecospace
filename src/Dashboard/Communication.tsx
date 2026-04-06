import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Search, SquarePen, Check, CheckCheck, Settings, Image as ImageIcon, Mic } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Communication = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState('Chat');

    const chatList = [
        { 
            id: 1, 
            name: 'John Britto', 
            message: 'Recycled bag.jpg', 
            time: '10:56 am', 
            unread: 0, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            hasAttachment: true,
            seen: true
        },
        { 
            id: 2, 
            name: 'Yogesh', 
            message: 'Sustainability has become such...', 
            time: '6:16 am', 
            unread: 0, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            seen: true
        },
        { 
            id: 3, 
            name: 'Akshaya', 
            message: 'Ok', 
            time: '12:04 am', 
            unread: 1, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' 
        },
        { 
            id: 4, 
            name: 'Nithish', 
            message: 'Hey, there', 
            time: 'Yesterday', 
            unread: 3, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' 
        },
        { 
            id: 5, 
            name: 'Sri Nisha', 
            message: 'You inspiring stories from the i...', 
            time: 'Yesterday', 
            unread: 0, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
            seen: true
        },
        { 
            id: 6, 
            name: 'Kishore', 
            message: 'In this two-fold segment, we ha...', 
            time: 'Yesterday', 
            unread: 0, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
            seen: true
        },
        { 
            id: 7, 
            name: 'Priya', 
            message: 'Sapling.jpg', 
            time: 'Yesterday', 
            unread: 0, 
            status: 'offline',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
            hasAttachment: true,
            seen: true
        },
        { 
            id: 8, 
            name: 'Naveen', 
            message: 'You did an amazing job buddy!', 
            time: 'Yesterday', 
            unread: 0, 
            status: 'online',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
            seen: true
        },
    ];

    const communityList = [
        {
            id: 1,
            name: 'Green Gardening',
            message: 'Jessie sent a mes...',
            time: '10:56 am',
            unread: 1,
            image: 'https://images.unsplash.com/photo-1416870230247-d0a91adb1c67?w=200',
            participants: 20
        },
        {
            id: 2,
            name: 'Energy Savers',
            message: 'Santhosh sent a...',
            time: '8:45 pm',
            unread: 23,
            image: 'https://images.unsplash.com/photo-1500417148159-68083bd7333a?w=200',
            participants: 47
        },
        {
            id: 3,
            name: 'Recycling Warriers',
            message: 'Rakesh sent a me...',
            time: '9:23 am',
            unread: 1,
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200',
            participants: 10
        },
        {
            id: 4,
            name: 'Ecopreneur',
            message: 'Sridhar sent a stic...',
            time: '7:16 am',
            unread: 56,
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
            participants: 5
        },
        {
            id: 5,
            name: 'Sustain Products',
            message: 'Narayanan sent a...',
            time: '10:09 am',
            unread: 1,
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200',
            participants: 14
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <Text style={styles.headerLogo}>ecospace</Text>
                <View style={styles.headerRight}>
                    <View style={styles.coinBadge}>
                        <View style={styles.coinIcon}>
                           <View style={styles.coinDot} />
                           <View style={[styles.coinDot, { marginLeft: 1.5 }]} />
                        </View>
                        <Text style={styles.coinText}>1040</Text>
                    </View>
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
                        placeholder=""
                        style={styles.searchField}
                    />
                    <TouchableOpacity>
                        <Mic color="#BBB" size={24} />
                    </TouchableOpacity>
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
                {activeTab === 'Chat' ? (
                    chatList.map((chat) => (
                        <TouchableOpacity key={chat.id} style={styles.chatItem}>
                            <View style={styles.avatarWrapper}>
                                <Image source={{ uri: chat.image }} style={styles.chatAvatar} />
                                {chat.status === 'online' && <View style={styles.statusDot} />}
                            </View>
                            <View style={styles.chatBody}>
                                <View style={styles.chatHeader}>
                                    <Text style={styles.senderName}>{chat.name}</Text>
                                    <Text style={styles.chatTime}>{chat.time}</Text>
                                </View>
                                <View style={styles.chatFooter}>
                                    <View style={styles.messagePreview}>
                                        {chat.seen && <CheckCheck size={16} color="#5584EE" style={{ marginRight: 4 }} />}
                                        {chat.hasAttachment && <ImageIcon size={14} color="#BBB" style={{ marginRight: 4 }} />}
                                        <Text 
                                            numberOfLines={1} 
                                            style={[styles.messageText, chat.unread > 0 && styles.unreadText]}
                                        >
                                            {chat.message}
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
                ) : (
                    communityList.map((group) => (
                        <TouchableOpacity key={group.id} style={styles.chatItem}>
                            <Image source={{ uri: group.image }} style={styles.chatAvatar} />
                            <View style={styles.chatBody}>
                                <View style={styles.chatHeader}>
                                    <Text style={styles.senderName}>{group.name}</Text>
                                    <Text style={styles.chatTime}>{group.time}</Text>
                                </View>
                                <View style={styles.chatFooter}>
                                    <View style={styles.participantStack}>
                                        <View style={styles.avatarStack}>
                                            {[1,2,3].map((i) => (
                                                <Image 
                                                    key={i} 
                                                    source={{ uri: `https://i.pravatar.cc/100?u=${group.id + i}` }} 
                                                    style={[styles.miniAvatar, { marginLeft: i === 1 ? 0 : -10 }]} 
                                                />
                                            ))}
                                            <View style={[styles.miniAvatar, styles.countBadge]}>
                                                <Text style={styles.countText}>+{group.participants}</Text>
                                            </View>
                                        </View>
                                        <Text numberOfLines={1} style={styles.groupMessage}>{group.message}</Text>
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
                )}
            </ScrollView>

            {/* FAB */}
            {activeTab === 'Chat' && (
                <TouchableOpacity style={styles.fab}>
                    <SquarePen color="#FFF" size={28} strokeWidth={2.5} />
                </TouchableOpacity>
            )}
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

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search as SearchIcon, Mic, Check, Leaf, Recycle } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { searchAPI } from '../api/search';
import { usersAPI } from '../api/users';
import { getUploadUrl } from '../api/config';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface UserData {
    _id: string;
    name: string;
    avatar: string;
    bio: string;
    carbonSaved: number;
    plasticSaved: number;
    followers: string[];
}

const Search = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { user: currentUser } = useAuth();
    const [query, setQuery] = useState(route.params?.query || '');
    const [results, setResults] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [followingIds, setFollowingIds] = useState<string[]>([]);

    const performSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const res = await searchAPI.search(searchQuery, 'users');
            setResults(res.data.users || []);
            
            // Sync following state from results
            const following = (res.data.users || [])
                .filter((u: UserData) => u.followers.includes(currentUser?._id || ''))
                .map((u: UserData) => u._id);
            setFollowingIds(following);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    }, [currentUser?._id]);

    useEffect(() => {
        if (query) {
            performSearch(query);
        }
    }, [performSearch]);

    const toggleFollow = async (userId: string) => {
        try {
            const res = await usersAPI.follow(userId);
            if (res.data.following) {
                setFollowingIds(prev => [...prev, userId]);
            } else {
                setFollowingIds(prev => prev.filter(id => id !== userId));
            }
        } catch (err) {
            console.error("Follow error:", err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft color="#4F9A42" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Search</Text>
                </View>
                <Image
                    source={{ uri: getUploadUrl(currentUser?.avatar || '') }}
                    style={styles.headerAvatar}
                />
            </View>

            {/* Search Input */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchWrapper}>
                    <SearchIcon color="#BBB" size={24} />
                    <TextInput
                        placeholder="search"
                        style={styles.searchInput}
                        placeholderTextColor="#BBB"
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={() => performSearch(query)}
                    />
                    {loading ? (
                        <ActivityIndicator size="small" color="#4F9A42" />
                    ) : (
                        <TouchableOpacity onPress={() => performSearch(query)}>
                            <SearchIcon color="#4F9A42" size={24} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* User List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {results.length === 0 && !loading && query.length > 0 && (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#999' }}>No users found for "{query}"</Text>
                    </View>
                )}
                {results.map((user, index) => (
                    <View key={user._id}>
                        <TouchableOpacity 
                            style={styles.userCard}
                            onPress={() => navigation.navigate('Profile', { userId: user._id })}
                        >
                            <Image source={{ uri: getUploadUrl(user.avatar) }} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <View style={styles.userInfoHeader}>
                                    <View style={styles.userNameRow}>
                                        <Text style={styles.userName}>{user.name || 'Anonymous'}</Text>
                                        <View style={styles.verifiedBadge}>
                                            <Check color="#FFF" size={8} strokeWidth={4} />
                                        </View>
                                    </View>
                                    {user._id !== currentUser?._id && (
                                        <TouchableOpacity 
                                            onPress={() => toggleFollow(user._id)}
                                            style={[
                                                styles.followBtn, 
                                                followingIds.includes(user._id) ? styles.followingBtn : styles.followBtnFilled
                                            ]}
                                        >
                                            <Text style={[
                                                styles.followText,
                                                followingIds.includes(user._id) ? styles.followingText : styles.followTextWhite
                                            ]}>
                                                {followingIds.includes(user._id) ? 'Following' : 'Follow'}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                
                                <View style={styles.ecoStats}>
                                    <View style={styles.ecoItem}>
                                        <View style={styles.ecoIconCircle}>
                                            <Leaf color="#827717" size={12} />
                                        </View>
                                        <View style={styles.ecoTextContainer}>
                                            <Text style={styles.ecoValue}>{user.carbonSaved}kg</Text>
                                            <Text style={styles.ecoLabel}>Carbon Saved</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ecoItem}>
                                        <View style={styles.ecoIconCircle}>
                                            <Recycle color="#827717" size={12} />
                                        </View>
                                        <View style={styles.ecoTextContainer}>
                                            <Text style={styles.ecoValue}>{user.plasticSaved}kg</Text>
                                            <Text style={styles.ecoLabel}>Plastics Saved</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {index < results.length - 1 && <View style={styles.divider} />}
                    </View>
                ))}
            </ScrollView>
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
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#4F9A42',
        marginLeft: 15,
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchBarContainer: {
        paddingHorizontal: 20,
        marginTop: 5,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 55,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        color: '#000',
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: 40,
    },
    userCard: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
    userImage: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    userInfo: {
        flex: 1,
        marginLeft: 15,
    },
    userInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    userNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    verifiedBadge: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#5584EE',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    ecoStats: {
        flexDirection: 'row',
        marginTop: 10,
    },
    ecoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
    },
    ecoIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFF9C4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    ecoTextContainer: {
        flexDirection: 'column',
    },
    ecoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    ecoLabel: {
        fontSize: 10,
        color: '#666',
    },
    followBtn: {
        paddingVertical: 8,
        paddingHorizontal: 22,
        borderRadius: 20,
        minWidth: 100,
        alignItems: 'center',
    },
    followBtnFilled: {
        backgroundColor: '#5584EE',
    },
    followingBtn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#5584EE',
    },
    followText: {
        fontSize: 14,
        fontWeight: '600',
    },
    followTextWhite: {
        color: '#FFF',
    },
    followingText: {
        color: '#5584EE',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginHorizontal: 20,
    },
});

export default Search;

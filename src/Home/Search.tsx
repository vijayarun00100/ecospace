import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search as SearchIcon, Mic, Check, Leaf, Recycle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Search = () => {
    const navigation = useNavigation<any>();
    const [following, setFollowing] = useState<number[]>([2, 4]); // Mock IDs for "Following"

    const users = [
        { id: 1, name: 'cizichris', carbon: '4kg', plastic: '2kg', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
        { id: 2, name: 'Pranesh', carbon: '2kg', plastic: '5kg', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
        { id: 3, name: 'Shruthi', carbon: '4kg', plastic: '2kg', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
        { id: 4, name: 'Juhi Kale', carbon: '3kg', plastic: '1.5kg', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200' },
        { id: 5, name: 'Kishore', carbon: '5kg', plastic: '7kg', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    ];

    const toggleFollow = (id: number) => {
        if (following.includes(id)) {
            setFollowing(following.filter(fid => fid !== id));
        } else {
            setFollowing([...following, id]);
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
                    source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }}
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
                    />
                    <TouchableOpacity>
                        <Mic color="#BBB" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* User List */}
            <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
                {users.map((user, index) => (
                    <View key={user.id}>
                        <View style={styles.userCard}>
                            <Image source={{ uri: user.image }} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <View style={styles.userInfoHeader}>
                                    <View style={styles.userNameRow}>
                                        <Text style={styles.userName}>{user.name}</Text>
                                        <View style={styles.verifiedBadge}>
                                            <Check color="#FFF" size={8} strokeWidth={4} />
                                        </View>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => toggleFollow(user.id)}
                                        style={[
                                            styles.followBtn, 
                                            following.includes(user.id) ? styles.followingBtn : styles.followBtnFilled
                                        ]}
                                    >
                                        <Text style={[
                                            styles.followText,
                                            following.includes(user.id) ? styles.followingText : styles.followTextWhite
                                        ]}>
                                            {following.includes(user.id) ? 'Following' : 'Follow'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={styles.ecoStats}>
                                    <View style={styles.ecoItem}>
                                        <View style={styles.ecoIconCircle}>
                                            <Leaf color="#827717" size={12} />
                                        </View>
                                        <View style={styles.ecoTextContainer}>
                                            <Text style={styles.ecoValue}>{user.carbon}</Text>
                                            <Text style={styles.ecoLabel}>Carbon Saved</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ecoItem}>
                                        <View style={styles.ecoIconCircle}>
                                            <Recycle color="#827717" size={12} />
                                        </View>
                                        <View style={styles.ecoTextContainer}>
                                            <Text style={styles.ecoValue}>{user.plastic}</Text>
                                            <Text style={styles.ecoLabel}>Plastics Saved</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {index < users.length - 1 && <View style={styles.divider} />}
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

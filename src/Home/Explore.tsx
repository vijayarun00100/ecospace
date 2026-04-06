import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Search as SearchIcon, Mic, Clock, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Explore = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState('For You');

    const tabs = ['Recent', 'Popular', 'For You', 'Featured'];
    const chips = ['Eco plants', 'Ecology', 'Eco friendly', 'Ecolab'];
    const previousSearches = [
        'Eco friendly',
        'Water bottle',
        'How to Plant saplings at home',
        'What are some eco-friendly things?',
        'What are five eco-friendly habits?',
        'What are the 5 types of eco?',
        'What is Eco Fullform?',
        'What is a friendly environment?',
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft color="#4F9A42" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Explore</Text>
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
                        placeholder="Eco fr"
                        style={styles.searchInput}
                        placeholderTextColor="#000"
                    />
                    <TouchableOpacity>
                        <Mic color="#BBB" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.tabUnderline} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* What are you looking for? */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>What are you looking for?</Text>
                </View>

                <View style={styles.chipsContainer}>
                    {chips.map((chip) => (
                        <TouchableOpacity key={chip} style={styles.chip}>
                            <Text style={styles.chipText}>{chip}</Text>
                            <X size={14} color="#666" style={{ marginLeft: 6 }} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Previous searches */}
                <View style={[styles.sectionHeader, { marginTop: 25 }]}>
                    <Text style={styles.sectionTitle}>Previous searches</Text>
                </View>

                <View style={styles.historyList}>
                    {previousSearches.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles.historyItem}>
                                <View style={styles.historyItemLeft}>
                                    <Clock color="#999" size={18} />
                                    <Text style={styles.historyText}>{item}</Text>
                                </View>
                                <TouchableOpacity style={styles.removeItem}>
                                    <X size={18} color="#999" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            {index < previousSearches.length - 1 && <View style={styles.historyDivider} />}
                        </View>
                    ))}
                </View>
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
    tabsWrapper: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    tabsScroll: {
        paddingHorizontal: 15,
    },
    tabItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    activeTabItem: {
        borderBottomWidth: 3,
        borderBottomColor: '#4F9A42',
        marginBottom: -1,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#999',
    },
    activeTabText: {
        color: '#4F9A42',
    },
    tabUnderline: {
        // Shared bottom border already in tabsWrapper
    },
    scrollContent: {
        paddingBottom: 40,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        marginTop: 15,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    chipText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    historyList: {
        marginTop: 10,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    historyItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    historyText: {
        marginLeft: 15,
        fontSize: 15,
        color: '#141414',
        fontWeight: '400',
    },
    removeItem: {
        padding: 5,
    },
    historyDivider: {
        height: 1,
        backgroundColor: '#EEE',
        marginHorizontal: 20,
    },
});

export default Explore;

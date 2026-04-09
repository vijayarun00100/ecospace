import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Bell, MessageCircleMore, Search, Mic, Settings } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface PageHeaderProps {
    showSearchBar?: boolean;
    searchPlaceholder?: string;
    onSearchPress?: () => void;
    showIcons?: boolean;
    showSettings?: boolean;
    headerStyle?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
    showSearchBar = true, 
    searchPlaceholder = "search", 
    onSearchPress,
    showIcons = true,
    showSettings = false,
    headerStyle
}) => {
    const navigation = useNavigation<any>();

    return (
        <View style={[styles.container, headerStyle]}>
            <View style={styles.topRow}>
                <Text style={styles.logo}>ecospace</Text>
                
                {showIcons && (
                    <View style={styles.iconGroup}>
                        <TouchableOpacity style={styles.coinBadge}>
                            <View style={styles.coinDot} />
                            <Text style={styles.coinText}>1040</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.iconButton}>
                            <Bell size={26} color="#141414" />
                        </TouchableOpacity>
                        
                        {showSettings ? (
                            <TouchableOpacity style={styles.iconButton}>
                                <Settings size={26} color="#141414" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity 
                                style={styles.iconButton} 
                                onPress={() => navigation.navigate('Communication')}
                            >
                                <MessageCircleMore size={26} color="#141414" />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

            {showSearchBar && (
                <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={onSearchPress || (() => navigation.navigate('Search'))}
                    style={styles.searchBar}
                >
                    <Search size={22} color="#BBB" />
                    <Text style={styles.searchText}>{searchPlaceholder}</Text>
                    <Mic size={22} color="#BBB" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFBE6',
        paddingBottom: 10,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    logo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#141414',
        letterSpacing: 2,
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#141414',
        marginRight: 12,
    },
    coinDot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#FBC02D',
        marginRight: 6,
    },
    coinText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#141414',
    },
    iconButton: {
        marginLeft: 12,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 20,
        marginTop: 5,
        borderWidth: 1.5,
        borderColor: '#EEE',
    },
    searchText: {
        fontSize: 16,
        color: '#BBB',
        marginLeft: 10,
    },
});

export default PageHeader;

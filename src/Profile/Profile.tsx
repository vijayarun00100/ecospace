import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Platform, ActivityIndicator, RefreshControl, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Search, EllipsisVertical, Grid, FileText, ShoppingBag, Check, MessageCircle, UserPlus, UserMinus, LogOut, Bookmark } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usersAPI } from '../api/users';
import { getUploadUrl } from '../api/config';
import { useAuth } from '../context/AuthContext';

// Asset imports
import CarbonSave from '../assets/Carbon_save.svg';
import PlasticSave from '../assets/Plastic_Save.svg';
import BgBackground from '../assets/bg2.png';

const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { userId } = route.params || {};
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState('Posts');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [content, setContent] = useState<any[]>([]);
  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      let profileRes;
      if (userId) {
        profileRes = await usersAPI.getById(userId);
        setIsMe(false);
      } else {
        profileRes = await usersAPI.getMe();
        setIsMe(true);
      }

      const userData = profileRes.data.user;
      setProfile(userData);
      setStats(profileRes.data.stats);
      
      // Determine if I'm following this user (if not me)
      if (userId) {
          const meRes = await usersAPI.getMe();
          const me = meRes.data.user;
          setIsFollowing(me.following?.some((id: any) => id === userId || id._id === userId));
      }

      // Fetch initial content (Posts)
      fetchTabContent(userId || userData._id, 'Posts');
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  const fetchTabContent = async (uid: string, tab: string) => {
      try {
          if (tab === 'Posts') {
              const res = await usersAPI.getUserPosts(uid);
              setContent(res.data.posts || []);
          } else if (tab === 'Articles') {
              const res = await usersAPI.getUserArticles(uid);
              setContent(res.data.articles || []);
          } else if (tab === 'Products') {
              const res = await usersAPI.getUserProducts(uid);
              setContent(res.data.products || []);
          } else if (tab === 'Bookmarks') {
              const res = await usersAPI.getBookmarks();
              setContent(res.data.all || []);
          } else {
              setContent([]);
          }
      } catch (err) {
          console.error(`Fetch ${tab} error:`, err);
      }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleTabChange = (tab: string) => {
      setActiveTab(tab);
      if (profile) {
          fetchTabContent(profile._id, tab);
      }
  };

  const handleFollow = async () => {
      if (!profile || isMe) return;
      try {
          const res = await usersAPI.follow(profile._id);
          setIsFollowing(res.data.following);
          // Update local follower count
          setStats((prev: any) => ({
              ...prev,
              followers: res.data.following ? prev.followers + 1 : prev.followers - 1
          }));
      } catch (err) {
          Alert.alert("Error", "Could not update follow status.");
      }
  };

  const handleLogout = () => {
      setMenuVisible(false);
      Alert.alert(
          "Logout",
          "Are you sure you want to log out of EcoSpace?",
          [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", style: "destructive", onPress: async () => await logout() }
          ]
      );
  };

  const handleShowBookmarks = () => {
      setMenuVisible(false);
      handleTabChange('Bookmarks');
  };

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
        <ActivityIndicator size="large" color="#4F9A42" />
      </View>
    );
  }

  if (!profile) {
      return (
          <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>User not found</Text>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                  <Text style={{ color: '#4F9A42' }}>Go Back</Text>
              </TouchableOpacity>
          </SafeAreaView>
      );
  }

  const displayStats = [
    { label: 'Posts', value: stats?.posts || 0 },
    { label: 'Articles', value: stats?.articles || 0 },
    { label: 'Followers', value: stats?.followers || 0 },
    { label: 'Following', value: stats?.following || 0 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Background Illustration */}
      <View style={styles.headerBgContainer}>
        <Image 
          source={BgBackground} 
          style={styles.headerBgImage} 
          resizeMode="cover"
        />
      </View>

      {/* Header Controls */}
      <View style={styles.headerControls}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft color="#141414" size={28} />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell color="#141414" size={26} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => isMe ? navigation.navigate('Chat') : navigation.navigate('ChatScreen', { receiverId: profile._id, receiverName: profile.name })}
          >
             <View style={styles.chatIconWrapper}>
                <MessageCircle color="#141414" size={26} />
                <View style={styles.chatDot} />
             </View>
          </TouchableOpacity>
          {isMe && (
            <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
                <EllipsisVertical color="#141414" size={26} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
      >
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: profile.avatar ? getUploadUrl(profile.avatar) : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }}
                style={styles.avatar}
              />
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{profile.name}</Text>
            {profile.isVerified && (
                <View style={styles.verifiedBadgeContainer}>
                <Check color="#FFF" size={10} strokeWidth={4} />
                </View>
            )}
          </View>
          <Text style={styles.userBio}>{profile.bio || 'EcoSpace Enthusiast'}</Text>
        </View>

        {/* Stats Row with Light Blue BG */}
        <View style={styles.statsRowBackground}>
          <View style={styles.statsRow}>
            {displayStats.map((item, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievement Cards */}
        <View style={styles.cardsRow}>
          <View style={[styles.statusCard, { backgroundColor: '#FFF9C4' }]}>
             <Text style={styles.cardValueTop}>{profile.carbonSaved || 0} Kg</Text>
             <View style={styles.cardMain}>
                <View style={styles.cardIconCircle}>
                    <CarbonSave width={32} height={32} />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Carbon</Text>
                    <Text style={styles.cardTitle}>Saved</Text>
                </View>
             </View>
          </View>
          <View style={[styles.statusCard, { backgroundColor: '#FFF9C4' }]}>
            <Text style={styles.cardValueTop}>{profile.plasticSaved || 0} Kg</Text>
            <View style={styles.cardMain}>
                <View style={styles.cardIconCircle}>
                    <PlasticSave width={32} height={32} />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Plastics</Text>
                    <Text style={styles.cardTitle}>Saved</Text>
                </View>
             </View>
          </View>
        </View>

        {/* Action Buttons - Outlined Style */}
        <View style={styles.actionButtons}>
          {isMe ? (
              <TouchableOpacity style={styles.outlinedBtn} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.outlinedBtnText}>Edit Profile</Text>
              </TouchableOpacity>
          ) : (
                <TouchableOpacity 
                    style={[styles.outlinedBtn, isFollowing && { backgroundColor: '#5584EE' }]} 
                    onPress={handleFollow}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {isFollowing ? <UserMinus size={18} color="#FFF" /> : <UserPlus size={18} color="#141414" />}
                        <Text style={[styles.outlinedBtnText, isFollowing && { color: '#FFF', marginLeft: 8 }]}>
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </Text>
                    </View>
                </TouchableOpacity>
          )}
          {!isMe && (
            <TouchableOpacity 
                style={styles.outlinedBtn} 
                onPress={() => navigation.navigate('ChatScreen', { receiverId: profile._id, receiverName: profile.name })}
            >
                <Text style={styles.outlinedBtnText}>Message</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.outlinedBtn}>
            <Text style={styles.outlinedBtnText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsWrapper}>
            <View style={styles.tabsContainer}>
            {['Posts', 'Articles', 'Products', ...(isMe ? ['Bookmarks'] : [])].map((tab) => (
                <TouchableOpacity
                key={tab}
                onPress={() => handleTabChange(tab)}
                style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                >
                <View style={styles.tabIconLabel}>
                    {tab === 'Posts' && <Grid size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    {tab === 'Articles' && <FileText size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    {tab === 'Products' && <ShoppingBag size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    {tab === 'Bookmarks' && <Bookmark size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                </View>
                {activeTab === tab && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
            ))}
            </View>
        </View>

        {/* Content Grid */}
        <View style={styles.contentGrid}>
          {content.length === 0 ? (
              <View style={{ width: '100%', padding: 40, alignItems: 'center' }}>
                  <Text style={{ color: '#BBB' }}>No {activeTab.toLowerCase()} yet.</Text>
              </View>
          ) : (
              content.map((item, index) => (
                    <TouchableOpacity 
                        key={item._id || index} 
                        style={styles.gridItem}
                        onPress={() => {
                            if (activeTab === 'Posts') {
                                navigation.navigate('PostDetail', { postId: item._id });
                            } else if (activeTab === 'Articles') {
                                navigation.navigate('TopArticle', { articleId: item._id });
                            } else if (activeTab === 'Products') {
                                navigation.navigate('Product', { productId: item._id });
                            } else if (activeTab === 'Bookmarks') {
                                if (item.contentType === 'Article') {
                                    navigation.navigate('TopArticle', { articleId: item._id });
                                } else if (item.contentType === 'Post') {
                                    navigation.navigate('PostDetail', { postId: item._id });
                                }
                            }
                        }}
                    >
                    <Image 
                        source={{ 
                            uri: (activeTab === 'Articles' || (activeTab === 'Bookmarks' && item.contentType === 'Article') ? getUploadUrl(item.image || item.images?.[0]) : getUploadUrl(item.images?.[0])) || 
                                 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' 
                        }} 
                        style={styles.gridImage} 
                        resizeMode="cover"
                    />
                    </TouchableOpacity>
              ))
          )}
        </View>
      </ScrollView>

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem} onPress={handleShowBookmarks}>
              <View style={styles.menuItemIcon}>
                <Bookmark size={20} color="#141414" />
              </View>
              <Text style={styles.menuText}>Bookmarks</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemIcon}>
                <LogOut size={20} color="#E91E63" />
              </View>
              <Text style={[styles.menuText, { color: '#E91E63' }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBE6',
  },
  headerBgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    opacity: 0.1,
  },
  headerBgImage: {
    width: '100%',
    height: '100%',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  chatIconWrapper: {
      position: 'relative',
  },
  chatDot: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FF3B30',
      borderWidth: 2,
      borderColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 0,
  },
  avatarContainer: {
      width: 160,
      height: 160,
      justifyContent: 'center',
      alignItems: 'center',
  },
  avatarGlow: {
      position: 'absolute',
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: '#FFF9C4',
      opacity: 0.5,
  },
  avatarBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  verifiedBadgeContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#5584EE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  userBio: {
    fontSize: 18,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  },
  statsRowBackground: {
    backgroundColor: '#D4E4FF', 
    marginTop: 25,
    paddingVertical: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontWeight: '600',
  },
  cardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 15,
  },
  statusCard: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardValueTop: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#BDB148',
      marginBottom: 10,
  },
  cardMain: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTextContainer: {
      flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#BDB148',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 25,
    gap: 15,
  },
  outlinedBtn: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#5584EE',
  },
  outlinedBtnText: {
    color: '#141414',
    fontSize: 17,
    fontWeight: '600',
  },
  tabsWrapper: {
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
      marginTop: 20,
      marginBottom:20
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
  },
  activeTabItem: {
      backgroundColor: 'rgba(20, 20, 20, 0.02)',
  },
  tabIconLabel: {
      alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#BBB',
    marginTop: 6,
  },
  activeTabText: {
    color: '#141414',
  },
  tabIndicator: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 3,
      backgroundColor: '#141414',
  },
  contentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 1,
    marginBottom:20,
  },
  gridItem: {
    width: width / 3 - 1,
    height: (width / 3) * (5 / 4),
    margin: 1,
    marginLeft:3
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  // Modal & Menu Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: width * 0.7,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,

  },
  menuItemIcon: {
    width: 40,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#141414',
    marginLeft: 10,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EEE',
    marginHorizontal: 15,
  },
});


export default Profile;

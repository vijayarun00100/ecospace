import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Search, EllipsisVertical, Grid, FileText, ShoppingBag, Check, MessageCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// Asset imports
import CarbonSave from '../assets/Carbon_save.svg';
import PlasticSave from '../assets/Plastic_Save.svg';
import BgBackground from '../assets/bg2.png';

const { width } = Dimensions.get('window');

const Profile = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('Posts');

  const stats = [
    { label: 'Posts', value: '31' },
    { label: 'Articles', value: '08' },
    { label: 'Followers', value: '257' },
    { label: 'Following', value: '183' },
  ];

  const gridImages = [
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400',
    'https://images.unsplash.com/photo-1501854140801-50d01674ba3e?w=400',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400',
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
          <TouchableOpacity style={styles.iconButton}>
             <View style={styles.chatIconWrapper}>
                <MessageCircle color="#141414" size={26} />
                <View style={styles.chatDot} />
             </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <EllipsisVertical color="#141414" size={26} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatarBorder}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }}
                style={styles.avatar}
              />
            </View>
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>Christopher</Text>
            <View style={styles.verifiedBadgeContainer}>
              <Check color="#FFF" size={10} strokeWidth={4} />
            </View>
          </View>
          <Text style={styles.userBio}>Nature Activist</Text>
        </View>

        {/* Stats Row with Light Blue BG */}
        <View style={styles.statsRowBackground}>
          <View style={styles.statsRow}>
            {stats.map((item, index) => (
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
             <Text style={styles.cardValueTop}>2 Kg</Text>
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
            <Text style={styles.cardValueTop}>5 Kg</Text>
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
          <TouchableOpacity style={styles.outlinedBtn}>
            <Text style={styles.outlinedBtnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlinedBtn}>
            <Text style={styles.outlinedBtnText}>Share Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsWrapper}>
            <View style={styles.tabsContainer}>
            {['Posts', 'Articles', 'Products'].map((tab) => (
                <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                >
                <View style={styles.tabIconLabel}>
                    {tab === 'Posts' && <Grid size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    {tab === 'Articles' && <FileText size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    {tab === 'Products' && <ShoppingBag size={24} color={activeTab === tab ? '#141414' : '#BBB'} />}
                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                </View>
                {activeTab === tab && <View style={styles.tabIndicator} />}
                </TouchableOpacity>
            ))}
            </View>
        </View>

        {/* Content Grid */}
        <View style={styles.contentGrid}>
          {gridImages.map((uri, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <Image source={{ uri }} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    paddingVertical: 18,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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
  },
  gridItem: {
    width: width / 3 - 2,
    height: width / 3 - 2,
    margin: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default Profile;

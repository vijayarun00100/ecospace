import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Camera, User, FileText, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { usersAPI } from '../api/users';
import { getUploadUrl } from '../api/config';
import { useAuth } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const EditProfile = () => {
  const navigation = useNavigation<any>();
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: false,
        compressImageQuality: 0.7,
      });
      setAvatar(image);
    } catch (err) {
      console.log('Image picker error:', err);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Name cannot be empty' });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);

      if (avatar) {
        formData.append('avatar', {
          uri: Platform.OS === 'android' ? avatar.path : avatar.path.replace('file://', ''),
          type: avatar.mime,
          name: 'avatar.jpg',
        } as any);
      }

      const res = await usersAPI.updateProfile(formData);
      updateUser(res.data.user);
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated successfully'
      });
      navigation.goBack();
    } catch (err: any) {
      console.error('Update profile error:', err);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: err.response?.data?.error || 'Could not update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#141414" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading} style={styles.saveButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#4F9A42" />
          ) : (
            <Check color="#4F9A42" size={28} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handlePickImage} style={styles.avatarWrapper}>
            <Image
              source={{ uri: avatar ? avatar.path : (user?.avatar ? getUploadUrl(user.avatar) : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400') }}
              style={styles.avatar}
            />
            <View style={styles.cameraOverlay}>
              <Camera color="#FFF" size={20} />
            </View>
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputLabelRow}>
                <User size={18} color="#666" />
                <Text style={styles.label}>Full Name</Text>
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#BBB"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputLabelRow}>
                <FileText size={18} color="#666" />
                <Text style={styles.label}>Bio</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself..."
              placeholderTextColor="#BBB"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#141414',
  },
  saveButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4F9A42',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFBE6',
  },
  changePhotoText: {
    marginTop: 12,
    fontSize: 14,
    color: '#4F9A42',
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#141414',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
});

export default EditProfile;

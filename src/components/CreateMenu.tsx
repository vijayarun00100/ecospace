import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Image as ImageIcon, FileText, Newspaper, X } from 'lucide-react-native';

interface CreateMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (type: 'post' | 'article' | 'news') => void;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ isVisible, onClose, onSelect }) => {
  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.menuContainer}>
          <View style={styles.handle} />
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.option} 
              onPress={() => {
                onSelect('post');
                onClose();
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#4F9A42' }]}>
                <ImageIcon color="#FFF" size={24} />
              </View>
              <Text style={styles.optionText}>New Post</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option} 
              onPress={() => {
                onSelect('article');
                onClose();
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#5584EE' }]}>
                <FileText color="#FFF" size={24} />
              </View>
              <Text style={styles.optionText}>New Article</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option} 
              onPress={() => {
                onSelect('news');
                onClose();
              }}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FCCD2A' }]}>
                <Newspaper color="#FFF" size={24} />
              </View>
              <Text style={styles.optionText}>New News</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="#666" size={24} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 40,
    paddingTop: 10,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#CCC',
    borderRadius: 3,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  option: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    marginTop: 30,
    padding: 10,
  },
});

export default CreateMenu;

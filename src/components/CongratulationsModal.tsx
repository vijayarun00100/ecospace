import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { Star } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface CongratulationsModalProps {
    isVisible: boolean;
    onClose: () => void;
    onCollect: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({ isVisible, onClose, onCollect }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.8);
        }
    }, [isVisible]);

    const Confetti = () => {
        const dots = Array.from({ length: 40 });
        return (
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
                {dots.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.confettiDot,
                            {
                                top: Math.random() * height,
                                left: Math.random() * width,
                                backgroundColor: ['#FBC02D', '#4F9A42', '#5584EE', '#FF5252'][Math.floor(Math.random() * 4)],
                                transform: [{ scale: Math.random() * 0.8 + 0.5 }],
                                opacity: 0.6,
                            }
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <Modal transparent visible={isVisible} animationType="none">
            <View style={styles.overlay}>
                <Animated.View style={[styles.modalContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                    <Confetti />
                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Star color="#FBC02D" size={60} fill="#FBC02D" />
                        </View>
                        <Text style={styles.title}>Congratulations!</Text>
                        <Text style={styles.rewardText}>900 Stars</Text>
                        <TouchableOpacity style={styles.collectBtn} onPress={onCollect}>
                            <Text style={styles.collectText}>Collect</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.85,
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        overflow: 'hidden', // Contain confetti
    },
    content: {
        alignItems: 'center',
        zIndex: 1,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF9C4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#FBC02D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F9A42',
        marginBottom: 10,
    },
    rewardText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#FBC02D',
        marginBottom: 30,
    },
    collectBtn: {
        backgroundColor: '#5584EE',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#5584EE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    collectText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    confettiDot: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

export default CongratulationsModal;

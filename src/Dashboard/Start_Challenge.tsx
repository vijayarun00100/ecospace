import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Gift, ChevronRight, FileUp, CheckCircle } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { challengesAPI } from "../api/challenges";
import { pick } from '@react-native-documents/picker';

function Start_Challenge() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { challengeId } = route.params || {};

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [challenge, setChallenge] = useState<any>(null);
    const [file, setFile] = useState<any>(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            if (!challengeId) {
                setLoading(false);
                return;
            }
            try {
                const res = await challengesAPI.getById(challengeId);
                setChallenge(res.data.challenge);
            } catch (err) {
                console.error("Fetch challenge error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchChallenge();
    }, [challengeId]);

    const handlePickFile = async () => {
        try {
            const result = await pick({
                type: ['image/*', 'video/*'],
            });
            if (result && result.length > 0) {
                setFile(result[0]);
            }
        } catch (err) {
            console.log("Picker error:", err);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            Alert.alert("Error", "Please upload proof of completion.");
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('proof', {
                uri: file.uri,
                name: file.name || 'proof.jpg',
                type: file.type || 'image/jpeg',
            } as any);

            const res = await challengesAPI.submit(challengeId, formData);
            Alert.alert("Success!", res.data.message || "Challenge submitted successfully!");
            navigation.navigate('History');
        } catch (err: any) {
            console.error("Submission error:", err);
            Alert.alert("Error", err.response?.data?.error || "Could not submit challenge.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft width={35} height={35} color={"#4F9A42"} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "700", fontSize: 24, color: "#4F9A42", marginLeft: 10 }}>Submit Proof</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                    <View style={{ padding: 25, backgroundColor: "white", borderRadius: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10, color: "#936700" }}>
                            {challenge?.title || "Ditch the plastic"}
                        </Text>
                        <Text style={{ color: "#666", fontSize: 16, lineHeight: 22 }}>
                            {challenge?.description || "Go a full day without using any single-use plastics."}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: "#FFD166", padding: 12, marginTop: -15, zIndex: -1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderStyle: "dashed", borderColor: "#AF8800", borderWidth: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16, fontWeight: "700", color: "#7E6200" }}>Reward: {challenge?.reward || 50} coins</Text>
                            <Gift size={20} color="#7E6200" />
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 40 }}>
                    <Text style={{ fontWeight: "800", fontSize: 20, color: '#333', marginBottom: 15 }}>Conditions</Text>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <CheckCircle size={20} color="#4F9A42" style={{ marginRight: 10, marginTop: 2 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "700", fontSize: 17, color: '#333' }}>Photo Evidence</Text>
                                <Text style={{ color: "#666", fontSize: 14, marginTop: 4 }}>
                                    Include timestamps or before-and-after photos where applicable.
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckCircle size={20} color="#4F9A42" style={{ marginRight: 10, marginTop: 2 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "700", fontSize: 17, color: '#333' }}>Verification</Text>
                                <Text style={{ color: "#666", fontSize: 14, marginTop: 4 }}>
                                    Submissions will be verified by moderators. Use clear images of compost bins, reusable bags, etc.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 30, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={handlePickFile}
                        style={{
                            width: '100%',
                            height: 120,
                            borderWidth: 2,
                            borderColor: file ? '#4F9A42' : '#CCC',
                            borderStyle: 'dashed',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: file ? '#E8F5E9' : '#F5F5F5'
                        }}
                    >
                        {file ? (
                            <View style={{ alignItems: 'center' }}>
                                <CheckCircle size={30} color="#4F9A42" />
                                <Text style={{ marginTop: 10, color: '#4F9A42', fontWeight: '600' }}>{file.name || 'File selected'}</Text>
                            </View>
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <FileUp size={30} color="#999" />
                                <Text style={{ marginTop: 10, color: '#999' }}>Click to upload proof</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={submitting}
                    style={{
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                        backgroundColor: "#5584EE",
                        marginHorizontal: 50,
                        marginTop: 40,
                        opacity: submitting ? 0.7 : 1,
                        shadowColor: '#5584EE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
                    }}
                >
                    {submitting ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                            Submit Proof
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Start_Challenge;
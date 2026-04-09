import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Gift, ChevronRight, Users, Clock } from "lucide-react-native";
import Ongoing from "../assets/Ongoing.svg";
import LinearGradient from 'react-native-linear-gradient';
import Accepted from '../assets/Accepted.svg';
import Task from "../assets/Task.svg";
import NoPlastic from "../assets/NoPlastic.png";
import Svg, { Path } from 'react-native-svg';
import { challengesAPI } from "../api/challenges";
import { getUploadUrl } from "../api/config";
import { useNavigation, useRoute } from "@react-navigation/native";

function Challenge() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { category, challengeId } = route.params || {};

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [challenges, setChallenges] = useState<any[]>([]);
    const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

    const fetchData = useCallback(async () => {
        try {
            if (challengeId) {
                const res = await challengesAPI.getById(challengeId);
                setSelectedChallenge(res.data.challenge);
            } else {
                const res = await challengesAPI.getAll(category);
                setChallenges(res.data.challenges || []);
                // If only one, or if we want to show the first by default in detail mode
                if (res.data.challenges?.length > 0 && !category) {
                    // setSelectedChallenge(res.data.challenges[0]);
                }
            }
        } catch (err) {
            console.error("Challenge fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [category, challengeId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const handleAccept = async (id: string) => {
        try {
            await challengesAPI.accept(id);
            Alert.alert("Success", "Challenge accepted! Good luck.");
            navigation.navigate('Start_Challenge', { challengeId: id });
        } catch (err: any) {
            if (err.response?.status === 400) {
                // Already accepted
                navigation.navigate('Start_Challenge', { challengeId: id });
            } else {
                Alert.alert("Error", err.response?.data?.error || "Could not accept challenge.");
            }
        }
    };

    if (loading && !refreshing) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    // List View
    if (!selectedChallenge && challenges.length > 0 && !challengeId) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft width={35} height={35} color={"#4F9A42"} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "700", fontSize: 24, color: "#4F9A42", marginLeft: 10 }}>
                        {category ? `${category} Challenges` : 'Challenges'}
                    </Text>
                </View>
                <ScrollView 
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
                >
                    {challenges.map((item) => (
                        <TouchableOpacity 
                            key={item._id}
                            onPress={() => setSelectedChallenge(item)}
                            style={{ backgroundColor: 'white', borderRadius: 20, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#936700' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }} numberOfLines={2}>{item.description}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Users size={16} color="#4F9A42" />
                                        <Text style={{ marginLeft: 5, fontSize: 13, color: '#4F9A42' }}>{item.acceptedCount} participating</Text>
                                        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#CCC', marginHorizontal: 8 }} />
                                        <Gift size={16} color="#FFD54F" />
                                        <Text style={{ marginLeft: 5, fontSize: 13, color: '#936700' }}>{item.reward} coins</Text>
                                    </View>
                                </View>
                                <ChevronRight color="#CCC" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Detail View
    const challenge = selectedChallenge || challenges[0];
    if (!challenge) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft width={35} height={35} color={"#4F9A42"} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "700", fontSize: 24, color: "#4F9A42", marginLeft: 10 }}>No Challenges</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#666' }}>No challenges found for this category.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                <TouchableOpacity onPress={() => {
                    if (selectedChallenge && !challengeId) {
                        setSelectedChallenge(null);
                    } else {
                        navigation.goBack();
                    }
                }}>
                    <ChevronLeft width={35} height={35} color={"#4F9A42"} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "700", fontSize: 24, color: "#4F9A42", marginLeft: 10 }}>Challenge Details</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                    <View style={{ padding: 20, backgroundColor: "white", borderRadius: 20, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ marginRight: 20, flex: 1 }}>
                            <Text style={{ flexWrap: "wrap", fontSize: 20, fontWeight: "800", marginBottom: 8, color: "#936700" }}>
                                {challenge.title}
                            </Text>
                            <Text style={{ color: "#666", fontWeight: "500", fontSize: 15 }}>
                                {challenge.description}
                            </Text>
                        </View>
                        <View style={{ width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFBE6" }}>
                            <Gift width={35} height={35} color="#FFD54F" />
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#FFD166", padding: 12, marginTop: -15, zIndex: -1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderStyle: "dashed", borderColor: "#AF8800", borderWidth: 1 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 16, fontWeight: "700", color: "#7E6200" }}>Win {challenge.reward} coins & exclusive gifts</Text>
                            <Gift size={20} color="#7E6200" />
                        </View>
                    </View>
                </View>

                <LinearGradient
                    colors={['#4F9A42', '#98E38B']}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                    style={{
                        marginTop: 25,
                        marginHorizontal: 30,
                        borderRadius: 30,
                        padding: 1.5,
                    }}
                >
                    <View style={{ backgroundColor: "#D4F2CF", padding: 12, borderRadius: 28 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Accepted width={24} height={24} style={{ marginRight: 8 }} />
                                <Text style={{ fontSize: 15, color: "black" }}>
                                    Accepted: <Text style={{ fontWeight: "700", fontSize: 16 }}>{challenge.acceptedCount}</Text>
                                </Text>
                            </View>
                            <View style={{ width: 1, height: 20, backgroundColor: '#4F9A42', opacity: 0.3 }} />
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Clock size={18} color="#4F9A42" style={{ marginRight: 8 }} />
                                <Text style={{ fontSize: 15, color: "black" }}>
                                    <Text style={{ fontWeight: "700", fontSize: 16 }}>48</Text> hrs left
                                </Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: 20 }}>
                    <View style={{ flex: 1, marginRight: 10, backgroundColor: "white", padding: 15, borderRadius: 20 }}>
                        <Task width={35} height={35} style={{ marginBottom: 10 }} />
                        <Text style={{ fontSize: 32, fontWeight: "700" }}>{challenge.participants?.filter((p: any) => p.status === 'completed').length || 0}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#666" }}>Completed</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "white", padding: 15, borderRadius: 20 }}>
                        <Ongoing width={35} height={35} style={{ marginBottom: 10 }} />
                        <Text style={{ fontSize: 32, fontWeight: "700" }}>{challenge.participants?.filter((p: any) => p.status === 'accepted').length || 0}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#666" }}>Ongoing</Text>
                    </View>
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 25 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                        <Text style={{ fontSize: 22, color: "#4F9A42", fontWeight: "700" }}>Participants</Text>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ marginRight: 5, fontSize: 15, color: '#666' }}>see all</Text>
                            <ChevronRight size={18} color="#666" />
                        </TouchableOpacity>
                    </View>

                    {challenge.participants?.slice(0, 3).map((participant: any, index: number) => (
                        <View key={index} style={{ padding: 12, backgroundColor: "white", marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={{ uri: getUploadUrl(participant.user?.avatar) }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                        marginRight: 15,
                                    }}
                                />
                                <View>
                                    <Text style={{ fontWeight: "700", fontSize: 18 }}>{participant.user?.name || 'Anonymous'}</Text>
                                    <Text style={{ color: "#8B8B8B", fontSize: 13 }}>{participant.status === 'completed' ? 'Completed' : 'Accepted'}</Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: participant.status === 'completed' ? '#D4F2CF' : '#EEF2FF', padding: 8, borderRadius: 12 }}>
                                {participant.status === 'completed' ? <Task width={24} height={24} /> : <Ongoing width={24} height={24} />}
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 20, padding: 20, backgroundColor: 'white', borderRadius: 20, borderColor: "#EEE", borderWidth: 1 }}>
                    <TouchableOpacity style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                        <Text style={{ fontWeight: "800", fontSize: 18 }}>Conditions & Rules</Text>
                        <ChevronRight color="#CCC" />
                    </TouchableOpacity>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ color: '#666', lineHeight: 20 }}>• Submit photo/video proof of your actions.</Text>
                        <Text style={{ color: '#666', lineHeight: 20 }}>• Submissions must be from the last 24 hours.</Text>
                        <Text style={{ color: '#666', lineHeight: 20 }}>• Rewards are credited after verification.</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => handleAccept(challenge._id)}
                    style={{
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                        backgroundColor: "#5584EE",
                        marginHorizontal: 50,
                        marginTop: 40,
                        marginBottom: 30,
                        shadowColor: '#5584EE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
                    }}
                >
                    <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
                        Start reducing !
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Challenge;
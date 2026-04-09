import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Easing, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import LinearGradient from 'react-native-linear-gradient';
import DashBoardHeader from "../components/DashBoardHeader";
import Svg, { Circle } from "react-native-svg";
import { dashboardAPI } from "../api/dashboard";

// SVGs
import Task from "../assets/Task.svg";
import PendingTask from "../assets/PendingTask.svg";
import Completed from "../assets/Completed.svg";
import Todo from "../assets/Todo.svg";
import Green_Commuter from "../assets/Green_Commuter.svg";
import PlasticFree from "../assets/PlasticFree.svg";
import EnergySaver from "../assets/EnergySaver.svg";
import WasteWarrior from "../assets/WasteWarrior.svg";
import GreenThumb from "../assets/GreenThumb.svg";
import EcoInfluencer from "../assets/EcoInfluencer.svg";
import ClimateChampion from "../assets/ClimateChampion.svg";

const IconMap: { [key: string]: any } = {
    PlasticFree,
    Green_Commuter,
    EnergySaver,
    WasteWarrior,
    GreenThumb,
    EcoInfluencer,
    ClimateChampion
};

function EcoStarter() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchData = useCallback(async () => {
        try {
            const res = await dashboardAPI.get();
            setData(res.data);
        } catch (err) {
            console.error("Dashboard data fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading && !refreshing) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    const progress = data?.progress || 0;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);
    
    const postProgress = data?.postGoal?.progress || 0;
    const TopIcon = IconMap[data?.level?.replace(' ', '')] || Green_Commuter;

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView 
                contentContainerStyle={{ paddingBottom: 80 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
            >
                <DashBoardHeader title={"DashBoard"} />
                <View style={{ marginHorizontal: 30 }}>
                    <View style={{
                        marginTop: 5,
                        borderRadius: 20,
                        height: 150,
                        marginBottom: 10,
                        overflow: 'hidden',
                    }}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Challenge')}>
                            <LinearGradient
                                colors={['#4E9EE9', '#4075EE']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={{ flex: 1, padding: 20 }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <View style={{ flex: 1, flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <TopIcon style={{ marginRight: 10 }} width={30} height={30} />
                                            <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>{data?.level || 'Eco Starter'}</Text>
                                        </View>
                                        <Text style={{ color: "white", marginTop: 10, fontSize: 16, fontWeight: "500" }}>
                                            Don't forget, every small action leads to a big change!
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Svg width={100} height={100}>
                                            <Circle
                                                cx="50"
                                                cy="50"
                                                r={radius}
                                                stroke="#AFC6FF"
                                                strokeWidth="10"
                                                fill="none"
                                            />
                                            <Circle
                                                cx="50"
                                                cy="50"
                                                r={radius}
                                                stroke="#FFD54F"
                                                strokeWidth="10"
                                                fill="none"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={offset}
                                                strokeLinecap="round"
                                                rotation="-90"
                                                origin="50,50"
                                            />
                                        </Svg>
                                        <Text
                                            style={{
                                                position: "absolute",
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                        >
                                            {Math.round(progress * 100)}%
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View >

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 10, backgroundColor: "#FFD166", height: 130, borderRadius: 20 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Task width={30} height={30} style={{ marginRight: 10 }} />
                                    <Text style={{ fontSize: 18, fontWeight: "600", color: "#7E6200" }}>Active</Text>
                                </View>
                                <Text style={{ fontSize: 32, fontWeight: "700", marginTop: 5 }}>{data?.pendingTasks || 0}</Text>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#4F4F4F" }}>Challenges</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "#FFD166", height: 130, borderRadius: 20 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <PendingTask width={30} height={30} style={{ marginRight: 10 }} />
                                    <Text style={{ fontSize: 18, fontWeight: "600", color: "#7E6200" }}>Total</Text>
                                </View>
                                <Text style={{ fontSize: 32, fontWeight: "700", marginTop: 5 }}>{data?.completedTasks || 0}</Text>
                                <Text style={{ fontSize: 14, fontWeight: "500", color: "#4F4F4F" }}>Completed</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                            <Text style={{ color: "#4F9A42", fontSize: 20, fontWeight: "700", marginRight: 10 }}>Post Progress</Text>
                            <Green_Commuter style={{}} width={24} height={24} />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#EEE', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <Completed style={{ marginRight: 15 }} width={40} height={40} />
                                <View style={{ flex: 1, flexDirection: "column" }}>
                                    <Text style={{ fontWeight: '600', color: '#444' }}>Like {data?.postGoal?.target || 10} posts from other users.</Text>
                                    <View style={{ height: 8, width: "100%", backgroundColor: "#E0E0E0", borderRadius: 10, marginTop: 10 }}>
                                        <View
                                            style={{
                                                height: "100%",
                                                width: `${postProgress * 100}%`,
                                                backgroundColor: "#4E7CF0",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                    <Text style={{ marginTop: 5, fontSize: 12, color: '#666' }}>{data?.postGoal?.current || 0} / {data?.postGoal?.target || 10} completed</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20, flexDirection: "column", paddingBottom: 20 }}>
                        <Text style={{ color: "#4F9A42", fontSize: 20, fontWeight: "700", marginBottom: 15 }}>Achievements</Text>
                        {data?.categories?.map((cat: any, index: number) => {
                            const Icon = IconMap[cat.icon] || PlasticFree;
                            return (
                                <View key={index} style={{ borderBottomWidth: 1, padding: 12, justifyContent: "space-between", borderColor: "#EEE", flexDirection: "row", alignItems: 'center' }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Icon width={35} height={35} style={{ marginRight: 15 }} />
                                        <Text style={{ fontSize: 16, fontWeight: "600", color: '#333' }}>{cat.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Challenge', { category: cat.name })}
                                        style={{ flexDirection: "row", alignItems: "center" }}
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: "400", marginRight: 6, color: '#666' }}>See all</Text>
                                        <ChevronRight color="#666" size={20} />
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default EcoStarter;
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, LockOpen, TrendingUp, Gift } from "lucide-react-native";
import Bag from "../assets/bag.svg";
import Coin from "../assets/coin.svg";
import { dashboardAPI } from "../api/dashboard";
import { useNavigation } from "@react-navigation/native";

function History() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await dashboardAPI.getCoinHistory();
            setHistory(res.data.history || []);
        } catch (err) {
            console.error("Coin history fetch error:", err);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft width={35} height={35} color={"#4F9A42"} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "700", fontSize: 24, color: "#4F9A42", marginLeft: 10 }}>Coin History</Text>
            </View>
            <ScrollView 
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {history.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        <Text style={{ color: '#666', fontSize: 16 }}>No transaction history found.</Text>
                    </View>
                ) : (
                    history.map((item, index) => (
                        <View key={item._id || index} style={{ marginHorizontal: 20, marginBottom: 15 }}>
                            <View style={{ padding: 18, backgroundColor: item.type === 'earned' ? "#E8F5E9" : "#FFF5BF", borderTopLeftRadius: 20, borderTopRightRadius: 20, flexDirection: "row" , alignItems:"center"}}>
                                <View style={{ width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", backgroundColor: "white", shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
                                    {item.type === 'earned' ? <TrendingUp color="#4F9A42" /> : <Bag width={35} height={35} />}
                                </View>
                                <View style={{marginLeft:15 , flex:1}}>
                                    <Text style={{ flexWrap:"wrap", fontSize: 16, fontWeight: "600", color: '#333' }}>
                                        {item.description}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                            <View style={{backgroundColor: item.type === 'earned' ? "#C8E6C9" : "#FFF0A1" , padding:12 , borderBottomLeftRadius:20 , borderBottomRightRadius:20, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)' }}>
                                <View style={{flexDirection:"row" , alignItems:"center" ,justifyContent:"space-between" , paddingHorizontal: 5}}>
                                    <View style={{flexDirection:"row" , alignItems:"center"}}>
                                        <Coin width={24} height={24} style={{marginRight:8}}/>
                                        <Text style={{fontSize:22, fontWeight: "700", color: item.type === 'earned' ? '#1B5E20' : '#827717'}}>
                                            {item.amount} <Text style={{fontSize:16, fontWeight: "600"}}>Coins</Text>
                                        </Text>
                                    </View>
                                    <View style={{ borderRadius:15 , borderWidth:1 , paddingHorizontal:12 , paddingVertical:5 ,flexDirection:"row" , alignItems:"center" , borderColor: item.type === 'earned' ? "#4CAF50" : "#AF8800", backgroundColor: 'rgba(255,255,255,0.3)' }}>
                                        {item.type === 'earned' ? <CheckCircle size={14} color="#1B5E20" style={{marginRight:6}} /> : <LockOpen size={14} color="#827717" style={{marginRight:6}} />}
                                        <Text style={{ fontSize: 13, fontWeight: '600', color: item.type === 'earned' ? '#1B5E20' : '#827717', textTransform: 'capitalize' }}>
                                            {item.type}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const CheckCircle = ({ size, color, style }: any) => (
    <View style={style}>
        <Gift size={size} color={color} />
    </View>
);

export default History;
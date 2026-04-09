import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { authAPI } from "../api/auth";
import { useAuth } from "../context/AuthContext";

import Upcycling from "../assets/Upcycling.svg";
import Gardining from "../assets/Gardining.svg";
import Composing from "../assets/Composing.svg";
import NaturalSoaps from "../assets/NaturalSoaps.svg";
import Solar from "../assets/Solar.svg";
import Organic from "../assets/Organic.svg";
import Tree from "../assets/Tree.svg";
import Energy from "../assets/Energy.svg";
import RecycledPaper from "../assets/RecycledPaper.svg";
import Biodegradable from "../assets/Biodegradable.svg";
import Bamboo from "../assets/Bamboo.svg";

function Interest({ navigation, route }: any) {
    const { name, gender } = route.params || {};
    const { updateUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const list = ["Upcycling", "Gardining", "Composing", "Natural Soaps", "Solar", "Organic", "Tree", "Energy", "Recycled Paper", "Biodegradable", "Bamboo"];

    const icons: any = {
        "Upcycling": Upcycling,
        "Gardining": Gardining,
        "Composing": Composing,
        "Natural Soaps": NaturalSoaps,
        "Solar": Solar,
        "Organic": Organic,
        "Tree": Tree,
        "Energy": Energy,
        "Recycled Paper": RecycledPaper,
        "Biodegradable": Biodegradable,
        "Bamboo": Bamboo
    };

    const [selected, setSelected] = useState<string[]>([]);

    const toggleInterest = (item: string) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };

    const handleContinue = async () => {
        if (selected.length < 2) {
            Alert.alert("Error", "Please select at least two interests to proceed.");
            return;
        }

        try {
            setLoading(true);
            const res = await authAPI.saveDetails({
                name,
                interests: selected,
                // We can add gender to user model if we want, for now let's just save name and interests
                // bio covers common text info
            });
            
            updateUser(res.data.user);
            navigation.navigate('Welcome');
        } catch (err: any) {
            Alert.alert("Error", err.response?.data?.error || "Failed to save details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "space-between", paddingHorizontal: 20 }}>

            <View style={{
                paddingBottom: 40
            }}>

                <View style={{ marginTop: 50 }}>
                    <Text style={{ color: "#4F9A42", fontWeight: "600", fontSize: 40 }}>
                        Let’s select {"\n"}your Interests.
                    </Text>

                    <Text style={{ color: "#313131", fontWeight: "500", fontSize: 19, marginTop: 20 }}>
                        Please select two or more to proceed.
                    </Text>
                </View>

                <View style={{
                    flexWrap: "wrap",
                    marginTop: 30,
                    flexDirection: "row",
                    borderColor: "#141414",
                    borderTopWidth: 2,
                    paddingTop: 20
                }}>

                    {list.map((item, index) => {

                        const Icon = icons[item];
                        const isSelected = selected.includes(item);

                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    onPress={() => toggleInterest(item)}
                                    style={{
                                        borderWidth: 2,
                                        borderColor: isSelected ? "#4F9A42" : "#BDAE7D",
                                        backgroundColor: isSelected ? "#4F9A42" : "#FFF8D6",
                                        marginTop: 10,
                                        paddingHorizontal: 10,
                                        paddingVertical: 7,
                                        borderRadius: 50,
                                        marginLeft: 20,
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }}
                                >

                                    <View style={{
                                        width: 30,
                                        height: 30,
                                        marginRight: 10,
                                        borderRadius: 100,
                                        backgroundColor: "#FFF4BA",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <Icon width={18} height={18} />
                                    </View>

                                    <Text style={{ color: isSelected ? "white" : "#141414" }}>
                                        {item}
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        )
                    })}

                </View>
            </View>


            <View>
                <TouchableOpacity
                    disabled={selected.length < 2 || loading}
                    style={{
                        marginHorizontal: 20,
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                        backgroundColor: "#5584EE",
                        marginBottom: 20,
                        opacity: selected.length >= 2 ? 1 : 0.4
                    }}
                    onPress={handleContinue}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{
                            color: "white",
                            fontWeight: "500",
                            letterSpacing: 2,
                            fontSize: 18,
                        }}>
                            Continue
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

export default Interest;
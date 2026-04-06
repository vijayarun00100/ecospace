import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowDown, Trash2, TruckElectric, ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react-native';
import WB1 from "../assets/Products/Bottle/WB1.png";
import Rating from "../components/Rating";
import { useNavigation } from "@react-navigation/native";

function Cart() {
    const navigation = useNavigation<any>();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: "space-between", flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 30, marginTop: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <ChevronLeft size={30} color={"#4F9A42"} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: 700, color: "#4F9A42" }}>Your Cart</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Shop')}
                                style={{ alignItems: "center", flexDirection: "row", borderWidth: 1, borderColor: "#5584EE", borderRadius: 10, padding: 5 }}
                            >
                                <Plus size={30} color={"#5584EE"} style={{ marginRight: 10 }} />
                                <Text style={{ fontSize: 16, fontWeight: 600, marginRight: 10, color: "#5584EE" }}>Add more</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: 30, borderRadius: 10, marginTop: 30, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#D4F2CF", padding: 20 }}>
                            <Text style={{ color: "#646464", fontSize: 17 }}>All offers & Coupons</Text>
                            <ChevronRight color={"#646464"} />
                        </View>
                        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ width: 100, height: 100 }}>
                                        <Image
                                            source={WB1}
                                            resizeMode="cover"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 10
                                            }}
                                        />
                                    </View>
                                    <View style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 5,
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                        marginTop: 8,
                                        borderRadius: 5,
                                        flexDirection: "row",
                                        width: 100
                                    }}>
                                        <Text style={{ marginRight: 5 }}>Qty. 1</Text>
                                        <ChevronDown />
                                    </View>
                                </View>
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={{
                                            fontFamily: "Metropolis-Regular",
                                            fontWeight: "600",
                                            fontSize: 16,
                                            lineHeight: 22
                                        }}
                                    >
                                        Eco Friendly Insulated Green Bottle & Sipper
                                    </Text>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 6
                                    }}>
                                        <Rating />
                                        <Text style={{
                                            color: "#5584EE",
                                            fontSize: 14,
                                            marginLeft: 8
                                        }}>
                                            <Text style={{ fontWeight: "600" }}>6,875 </Text>
                                            ratings
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 10,
                                        flexWrap: "wrap"
                                    }}>
                                        <ArrowDown size={18} color="#4F9A42" />
                                        <Text style={{
                                            color: "#4F9A42",
                                            fontSize: 16,
                                            fontWeight: "700",
                                            marginLeft: 4,
                                            marginRight: 10
                                        }}>
                                            53%
                                        </Text>
                                        <Text style={{
                                            textDecorationLine: "line-through",
                                            fontSize: 15,
                                            color: "#8B8B8B",
                                            marginRight: 8
                                        }}>
                                            ₹1092
                                        </Text>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: "800"
                                        }}>
                                            ₹575
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: "row",
                                gap: 10
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        padding: 13,
                                        borderRadius: 5,
                                        borderColor: "#CACACA",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Trash2 size={20} color="red" style={{ marginRight: 8 }} />
                                    <Text style={{
                                        fontFamily: "Metropolis-Regular",
                                        fontSize: 13,
                                        fontWeight: "600"
                                    }}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        padding: 13,
                                        borderRadius: 5,
                                        borderColor: "#CACACA",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <TruckElectric size={20} color="green" style={{ marginRight: 8 }} />
                                    <Text style={{
                                        fontFamily: "Metropolis-Regular",
                                        fontSize: 13,
                                        fontWeight: "600"
                                    }}>
                                        Buy now
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        borderTopWidth: 1,
                        borderColor: "#eee",
                        paddingBottom: 0,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "#fff",
                            paddingVertical: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderColor: "#ccc",
                        }}
                    >
                        <Text style={{
                            textDecorationLine: "line-through",
                            fontSize: 15,
                            color: "#8B8B8B",
                            marginRight: 8
                        }}>
                            ₹1092
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "800"
                        }}>
                            ₹575
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Payment')}
                        style={{
                            flex: 1,
                            backgroundColor: "#5584EE",
                            paddingVertical: 15,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 20 }}>
                            Place Order
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Cart;
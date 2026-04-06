import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, ShoppingCart } from "lucide-react-native";
type RowProps = {
    label: string;
    value: string;
};

const Row = ({ label, value }: RowProps) => (
    <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
    }}>
        <Text style={{ color: "#777" }}>{label}</Text>
        <Text style={{ fontWeight: "500" }}>{value}</Text>
    </View>
);

const Payment = () => {
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    marginTop: 20
                }}>
                    <View style={{flexDirection:"row"}}>
                        <ChevronLeft size={24} color="#4F9A42" style={{marginRight:10}}/>
                        <Text style={{ fontSize: 18, fontWeight: "600", color: "#4F9A42" }}>
                            Payment Confirmation
                        </Text>
                    </View>
                    <ShoppingCart size={22} color="#000" />
                </View>

                <View style={{
                    backgroundColor: "#fff",
                    margin: 20,
                    borderRadius: 10,
                    padding: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 500
                }}>

                    <View style={{
                        width: 290,
                        height: 290,
                        borderRadius: 160,
                        backgroundColor: "#A0EB93",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            width: 160,
                            height: 160,
                            borderRadius: 80,
                            backgroundColor: "#78C36B",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: "#4F9A42",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ color: "#fff", fontSize: 40 }}>✓</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "700",
                        marginTop: 20
                    }}>
                        Payment Successful!
                    </Text>
                    <Text style={{
                        textAlign: "center",
                        color: "#777",
                        marginTop: 5
                    }}>
                        The order confirmation has been sent to{"\n"}
                        cizchin503@gmail.com
                    </Text>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15
                    }}>
                        <Image
                            source={require("../assets/Products/Bottle/WB1.png")}
                            style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontWeight: "600" }}>
                                Green Bottle & Sipper
                            </Text>
                            <Text style={{ color: "#777", fontSize: 12 }}>
                                Capacity: 1 litre
                            </Text>
                        </View>
                        <Text style={{ fontWeight: "600" }}>$713.00</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#999", marginVertical: 10 }} />
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15
                    }}>
                        <Image
                            source={require("../assets/Products/Bottle/WB2.png")}
                            style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontWeight: "600" }}>
                                Green Bottle & Sipper
                            </Text>
                            <Text style={{ color: "#777", fontSize: 12 }}>
                                Capacity: 400 ml
                            </Text>
                        </View>
                        <Text style={{ fontWeight: "600" }}>$575.00</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#999", marginVertical: 10 }} />
                    <View style={{ gap: 8 }}>
                        <Row label="Transaction Date" value="Tuesday, Jan 2024" />
                        <Row label="Payment Method" value="UPI (Google Pay)" />
                        <Row label="Shopping Method" value="Shiprocket (3-4days)" />
                        <Row label="Subtotal" value="$1,288.00" />
                        <Row label="Tax" value="$10" />
                        <Row label="Shipping" value="Free" />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 15,
                        borderTopWidth: 1,
                        borderColor: "#999",
                        paddingTop: 10
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "700" }}>Total</Text>
                        <Text style={{ fontSize: 16, fontWeight: "700" }}>$1,298</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ padding: 20 }}>
                <TouchableOpacity style={{
                    backgroundColor: "#5C7AEA",
                    paddingVertical: 15,
                    borderRadius: 10,
                    alignItems: "center"
                }}>
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                        Continue Shopping
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};



export default Payment;
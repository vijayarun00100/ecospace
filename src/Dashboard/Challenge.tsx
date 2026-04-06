import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Gift, ChevronRight } from "lucide-react-native";
import Ongoing from "../assets/Ongoing.svg";
import LinearGradient from 'react-native-linear-gradient';
import Accepted from '../assets/Accepted.svg';
import Task from "../assets/Task.svg";
import NoPlastic from "../assets/NoPlastic.png";
import Svg, { Path } from 'react-native-svg';
const dp = require("../assets/Hari.png");
function History() {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <ChevronLeft width={40} height={40} color={"#4F9A42"} style={{ marginRight: 4 }} />
                <Text style={{ fontWeight: 700, fontSize: 24, color: "#4F9A42", marginRight: 10 }}>Challenge</Text>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                    <View style={{ padding: 20, backgroundColor: "white", borderRadius: 20, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ marginRight: 20, flex: 1 }}>
                            <Text style={{ flexWrap: "wrap", fontSize: 16, fontWeight: "800", marginBottom: 12, color: "#936700" }}>
                                Ditch the plastic
                            </Text>
                            <Text style={{ color: "#936700", fontWeight: 500 }}>
                                Go a full day without using any single-use plastics.
                            </Text>
                        </View>
                        <View style={{ width: 70, height: 70, padding: 10, borderRadius: 50, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                            <Gift width={50} height={50} style={{}} />
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#FFD166", padding: 10, borderRadius: 20, borderStyle: "dotted", borderColor: "#AF8800", borderWidth: 2 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginRight: 6, marginLeft: 8 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontSize: 16, fontWeight: 900, color: "#7E6200" }}>Win exclusive gifts</Text>
                            </View>
                            <View>
                                <Gift />
                            </View>
                        </View>
                    </View>
                </View>
                <LinearGradient
                    colors={['#4F9A42', '#98E38B']}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                    style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                        borderRadius: 30,
                        padding: 2,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#D4F2CF",
                            padding: 10,
                            borderRadius: 29,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginHorizontal: 8,
                            }}
                        >
                            <Accepted width={30} height={30} style={{ marginRight: 8 }} />
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    color: "black",
                                    flexShrink: 1,
                                    marginRight: 8,
                                }}
                            >
                                Accepted:{" "}
                                <Text style={{ fontWeight: "700", fontSize: 18 }}>5000</Text> people
                            </Text>


                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    color: "black",
                                    flexShrink: 1,
                                }}
                            >
                                <Text style={{ fontWeight: "700", fontSize: 18 }}>24</Text> hrs left
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                <View style={{ flexDirection: "row", marginHorizontal: 30, marginTop: 20 }}>
                    <View style={{ flex: 1, marginRight: 10, backgroundColor: "white", height: 150, borderRadius: 20 }}>
                        <View style={{ padding: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Task width={40} height={40} style={{ marginRight: 10 }} />
                            </View>
                            <Text style={{ fontSize: 40 }}>1</Text>
                            <Text style={{ fontSize: 18, fontWeight: 500, color: "#4F4F4F" }}>Completed</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "white", height: 150, borderRadius: 20 }}>
                        <View style={{ padding: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Ongoing width={40} height={40} style={{ marginRight: 10 }} />
                            </View>
                            <Text style={{ fontSize: 40 }}>9</Text>
                            <Text style={{ fontSize: 18, fontWeight: 500, color: "#4F4F4F" }}>ongoing</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 30, marginTop: 10, flex: 1 }}>
                    <View
                        style={{
                            backgroundColor: "#CDDBFA",
                            padding: 10,
                            borderRadius: 29,
                            borderColor: "#4075EE",
                            borderWidth: 1
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginHorizontal: 8,
                            }}
                        >
                            <Image
                                source={NoPlastic}
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 8,
                                    resizeMode: "contain",
                                }}
                            />

                            <Text style={{ fontSize: 16, color: "black" }}>
                                Accepted:{" "}
                                <Text style={{ fontWeight: "700", fontSize: 18 }}>5000</Text> users plastic use by
                            </Text>
                        </View>
                    </View>


                    <View style={{ alignItems: "flex-start", marginTop: -8 }}>
                        <Svg width={100} height={50}>
                            <Path
                                d="M 0 0 A 50 50 0 0 0 100 0 L 100 0 L 0 0 Z"
                                fill="#82CD75"
                            />
                        </Svg>
                        <View
                            style={{
                                position: "absolute",
                                top: 2,
                                alignItems: "center",
                                marginLeft: 20
                            }}
                        >
                            <Text style={{ fontSize: 32, fontWeight: "700", color: "white" }}>
                                4
                                <Text style={{ fontSize: 18 }}> kgs</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <View
                            style={{
                                width: 60,
                                height: 60,
                                backgroundColor: "#82CD75",
                                borderRadius: 60,
                                marginTop: -60
                            }}
                        />
                        <View
                            style={{
                                position: "absolute",
                                top: 2,
                                alignItems: "center",
                                marginTop: -55,
                                marginRight: 3
                            }}
                        >
                            <Text style={{ fontSize: 30, fontWeight: "700", color: "white" }}>
                                4
                                <Text style={{ fontSize: 18 }}> kgs</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 30 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginTop: 40, alignItems: "center", marginBottom: 10 }}>
                        <View style={{}}>
                            <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 24, color: "#4F9A42", fontWeight: 700 }}>Participants</Text>
                        </View>
                        <View style={{ flexDirection: "row", }}>
                            <Text style={{ marginRight: 10, fontSize: 16 }}>see all</Text>
                            <ChevronRight />
                        </View>
                    </View>
                    <View style={{ padding: 12, backgroundColor: "white", marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ alignItems: "center", marginLeft: 20 }}>
                                <Image
                                    source={dp}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 60,
                                        marginRight: 20,
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontWeight: 600, fontSize: 21 }}>Kailash</Text>
                                <Text style={{ color: "#8B8B8B" }}>2hrs ago</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: "#8B8B8B", borderRightWidth: 1, height: "70%" }} />
                        <View>
                            <Task width={40} height={40} style={{ marginRight: 10 }} />
                        </View>
                    </View>

                    <View style={{ padding: 12, backgroundColor: "white", marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ alignItems: "center", marginLeft: 20 }}>
                                <Image
                                    source={dp}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 60,
                                        marginRight: 20,
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontWeight: 600, fontSize: 21 }}>Kailash</Text>
                                <Text style={{ color: "#8B8B8B" }}>2hrs ago</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: "#8B8B8B", borderRightWidth: 1, height: "70%" }} />
                        <View>
                            <Task width={40} height={40} style={{ marginRight: 10 }} />
                        </View>
                    </View>
                    <View style={{ padding: 12, backgroundColor: "white", marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 20 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ alignItems: "center", marginLeft: 20 }}>
                                <Image
                                    source={dp}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 60,
                                        marginRight: 20,
                                    }}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={{ fontWeight: 600, fontSize: 21 }}>Kailash</Text>
                                <Text style={{ color: "#8B8B8B" }}>2hrs ago</Text>
                            </View>
                        </View>
                        <View style={{ borderColor: "#8B8B8B", borderRightWidth: 1, height: "70%" }} />
                        <View>
                            <Task width={40} height={40} style={{ marginRight: 10 }} />
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: 20, padding: 20, borderWidth: 1, borderRadius: 20, borderColor: "#D5CBAC" }}>
                    <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", }}>
                        <View>
                            <Text style={{ fontFamily: "Metropolis-Regular", fontWeight: 900, fontSize: 20 }}>Conditions</Text>
                        </View>
                        <View>
                            < ChevronRight />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                        backgroundColor: "#5584EE",
                        marginHorizontal:80,
                        marginTop:50
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: 18
                        }}
                    >
                        Start reducing !
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default History;
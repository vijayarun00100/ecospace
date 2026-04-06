import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Gift, ChevronRight, FileUp } from "lucide-react-native";
import Ongoing from "../assets/Ongoing.svg";
import LinearGradient from 'react-native-linear-gradient';
import Accepted from '../assets/Accepted.svg';
import Task from "../assets/Task.svg";
import NoPlastic from "../assets/NoPlastic.png";
import Svg, { Path } from 'react-native-svg';
const dp = require("../assets/Hari.png");
import { pick } from '@react-native-documents/picker';

const pickFile = async () => {
  try {
    const result = await pick({
      type: ['*/*'], // or ['image/*', 'application/pdf']
    });

    console.log(result);
    return result[0]; // usually array
  } catch (err) {
    console.log(err);
  }
};


function Start_Challenge() {
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
                <View style={{ marginHorizontal: 30, marginTop: 40 }}>
                    <View>
                        <Text style={{ fontWeight: 800, fontSize: 20, fontFamily: "Metropolis-Regular" }}>Conditions</Text>
                    </View>
                    <View style={{ marginRight: 30 }}>
                        <Text style={{ marginTop: 10, fontWeight: 500, fontSize: 20, fontFamily: "Metropolis-Regular" }}>
                            1. Photo Evidence
                        </Text>
                        <View>
                            <Text style={{ marginTop: 20, fontWeight: 500, fontSize: 15, fontFamily: "Metropolis-Regular", color: "#6D6D6D" }}>
                                Include timestamps or before-and-after photos where applicable.
                            </Text>
                            <Text style={{ marginTop: 20, fontWeight: 500, fontSize: 15, fontFamily: "Metropolis-Regular", color: "#6D6D6D" }}>
                                Ensure photos highlight eco-friendly actions clearly (e.g., compost bins, reusable bags, bike rides).
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginRight: 30, marginTop: 20 }}>
                        <Text style={{ marginTop: 10, fontWeight: 500, fontSize: 20, fontFamily: "Metropolis-Regular", }}>
                            2. Verification
                        </Text>
                        <View>
                            <Text style={{ marginTop: 20, fontWeight: 500, fontSize: 15, fontFamily: "Metropolis-Regular", color: "#6D6D6D" }}>
                                Submissions will be verified by app moderators or through community peer review.                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={pickFile}
                    style={{
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                        backgroundColor: "#5584EE",
                        marginHorizontal: 80,
                        marginTop: 50,
                        flexDirection: "row"
                    }}
                >
                    <FileUp color={"white"} style={{ marginRight: 10, }} />
                    <Text
                        style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: 18
                        }}
                    >
                        Upload
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Start_Challenge;
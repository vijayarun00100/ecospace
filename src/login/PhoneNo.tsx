import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { authAPI } from "../api/auth";

function PhoneNo({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }
        try {
            setLoading(true);
            await authAPI.sendOtp(email.trim());
            navigation.navigate('Otp', { email: email.trim() });
        } catch (err: any) {
            Alert.alert("Error", err.response?.data?.error || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                <View>
                    <BackButton />
                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={{
                            color: "#141414",
                            fontSize: 20,
                            fontWeight: "700",
                            marginBottom: 10
                        }}>Enter your Email Address</Text>
                        <Text style={{
                            color: "#141414",
                            fontSize: 16,
                            fontWeight: "400",
                            marginBottom: 40
                        }}>We will send an OTP Verification to you
                        </Text>
                        <View style={{
                            borderWidth: 2,
                            borderColor: "#8B8B8B",
                            borderRadius: 50,
                            width: "100%",
                            height: 50,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            paddingHorizontal: 20,
                            flexDirection: "row"
                        }}>
                            <TextInput
                                placeholder="Enter your email address"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={{
                                    color: "#141414",
                                    fontSize: 16,
                                    fontWeight: "400",
                                    flex: 1,
                                }}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 30,
                        marginBottom: 10,
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                        backgroundColor: loading ? "#8BB4F7" : "#5584EE",
                    }}
                    onPress={handleNext}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{
                            color: "white",
                            fontWeight: "500",
                            letterSpacing: 2,
                            fontSize: 18,
                        }}>Next</Text>
                    )}
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default PhoneNo;
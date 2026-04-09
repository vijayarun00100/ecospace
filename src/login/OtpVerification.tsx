import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import { authAPI } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function OtpVerification({ navigation, route }: any) {
    const email = route?.params?.email || "";
    const { login } = useAuth();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 4) {
            Alert.alert("Error", "Please enter the 4-digit OTP");
            return;
        }
        try {
            setLoading(true);
            const res = await authAPI.verifyOtp(email, otpString);
            await login(res.data.token, res.data.user);

            if (res.data.user.onboardingDone) {
                navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
            } else {
                navigation.navigate("Details");
            }
        } catch (err: any) {
            Alert.alert("Error", err.response?.data?.error || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await authAPI.sendOtp(email);
            Alert.alert("Success", "OTP resent to your email");
        } catch (err: any) {
            Alert.alert("Error", err.response?.data?.error || "Failed to resend OTP");
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
                        }}>Enter Verification Code</Text>
                        <Text style={{
                            color: "#141414",
                            fontSize: 16,
                            fontWeight: "400",
                            marginBottom: 40
                        }}>We sent an OTP to {email}</Text>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 15,
                        }}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => { if (ref) inputs.current[index] = ref; }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderWidth: 2,
                                        borderColor: digit ? "#5584EE" : "#8B8B8B",
                                        borderRadius: 15,
                                        fontSize: 24,
                                        fontWeight: "700",
                                        textAlign: "center",
                                        color: "#141414",
                                    }}
                                    value={digit}
                                    onChangeText={(text) => handleChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                />
                            ))}
                        </View>

                        <TouchableOpacity onPress={handleResend} style={{ marginTop: 30, alignItems: "center" }}>
                            <Text style={{ color: "#5584EE", fontSize: 16 }}>Resend OTP</Text>
                        </TouchableOpacity>
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
                    onPress={handleVerify}
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
                        }}>Verify</Text>
                    )}
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default OtpVerification;
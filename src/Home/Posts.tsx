import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Animated, Easing, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostSearchBar from "../components/PostSearchBar";
import LinearGradient from 'react-native-linear-gradient';
import { Truck, ThumbsUp, ThumbsDown, MessageCircleMore, Send, Bookmark, Heart } from 'lucide-react-native';
import CongratulationsModal from "../components/CongratulationsModal";

const Tip = require("../assets/Tip.png");
const Card = require("../assets/Card.png");
const Dp = require("../assets/Hari.png");

function Posts({ navigation }: any) {
    const [showCongrats, setShowCongrats] = useState(false);
    const caption ="Planting trees and greenery is a simple yet impactful way to improve the environment and create a healthier future for everyone.";
    const LIMIT = 50;   
    const [Message , setMessage] = useState(caption);
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0.7);
    const translateX = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [barWidth, setBarWidth] = useState(0);
    const [Like , setLike] = useState(0);
    const [Dislike , setDisLike] = useState(0);
    const [Mark , setMark] = useState(false);
    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 750,
            useNativeDriver: false,
        }).start();
        Animated.timing(translateX , {
            toValue: progress,
            duration: 1000,
            easing : Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    } ,[progress,barWidth])
    return(
        <SafeAreaView style={{flex:1}}>
            <PostSearchBar />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <TouchableOpacity
                        onPress={() => setShowCongrats(true)}
                        activeOpacity={0.9}
                        style={{
                            marginTop: 5,
                            borderRadius: 20,
                            height: 150,
                            margin: 20,
                            overflow: 'hidden',
                        }}>
                        <LinearGradient
                            colors={['#4E9EE9', '#4075EE']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={{ flex: 1, padding: 20 }}
                        >
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>

                                <View style={{ flex: 1 }}>
                                    <Text style={{
                                        color: '#FFD166',
                                        fontSize: 20,
                                        fontWeight: '700',
                                        marginBottom: 8
                                    }}>
                                        Eco-friendly DIY products
                                    </Text>
                                    <Text style={{
                                        color: '#FFFFFF',
                                        fontSize: 16,
                                        opacity: 0.9
                                    }}>
                                        Just 3 more to complete your goal
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
                                        Posts
                                    </Text>
                                    <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '400' }}>
                                        7/10
                                    </Text>
                                </View>

                            </View>

                            <View
                                onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
                                style={{
                                    height: 10,
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    borderRadius: 5,
                                    marginTop: "auto",
                                    justifyContent: "center",
                                }}
                            >

                                <Animated.View
                                    style={{
                                        width: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, barWidth],
                                        }),
                                        height: "100%",
                                        backgroundColor: "#FFF",
                                        borderRadius: 5,
                                        position: "absolute",
                                    }}
                                />
                                <Animated.View
                                    style={{
                                        position: "absolute",
                                        transform: [
                                            {
                                                translateX: translateX.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, barWidth - 20], // adjust based on width
                                                }),
                                            },
                                        ],
                                    }}
                                >
                                    <Truck color="#008000" size={45} fontWeight={900} />
                                </Animated.View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ borderWidth: 2, borderColor: "#4F9A42", marginHorizontal: 20, height: 120, borderRadius: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20 }}>
                        <View style={{}}>
                            <Image source={Tip} width={100} height={100} style={{ borderRadius: 10 }} />
                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20, flex: 1 }}>
                            <View>
                                <Text style={{ color: "#4F9A42", fontWeight: 600, fontSize: 26 }}>Tip of the day !</Text>
                            </View>
                            <View style={{}}>
                                <Text>Avoid Single-Use Plastics</Text>
                                <Text>Switching to a reusable water bottle saves you money.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 12, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: "100%", height: 500 }}>
                            <ImageBackground source={Card} resizeMode="cover" imageStyle={{ borderRadius: 20 }} style={{ width: "100%", height: "100%" }}>
                                <LinearGradient
                                    colors={['#52525206', '#000000BC']}
                                    start={{ x: 0.5, y: 1 }}
                                    end={{ x: 0.5, y: 0 }}
                                    style={{ padding: 30, borderRadius: 20, height: "1%" }}
                                />
                                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, marginTop: 10, position: "absolute" }}>
                                    <View style={{ height: 48, width: 48, borderRadius: 30, }}>
                                        <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={{ color: "white", fontWeight: 600, fontSize: 24 }}>Harish</Text>
                                        <Text style={{ color: "#DEDEDE", fontWeight: 700, fontSize: 13 }}>1d ago</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "space-between", width: "100%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                    <Heart width={30} height={30} style={{ marginRight: 5 }} />
                                    <Text>{Like}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                    <ThumbsDown width={30} height={30} style={{ marginRight: 5 }} />
                                    <Text>{Like}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                    <MessageCircleMore width={30} height={30} style={{ marginRight: 5 }} />
                                    <Text>{Like}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
                                    <Send width={30} height={30} style={{ marginRight: 5 }} />
                                    <Text>{Like}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { setMark(!Mark) }}>
                                    <Bookmark width={30} height={30} color={Mark ? "#2E7D32" : "#000"} fill={Mark ? "#2E7D32" : "none"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", width: "100%", marginTop: 10 }}>
                            <Text>Liked by</Text>
                        </View>
                        <View style={{ marginTop: 10, width: "100%" }}>
                            <Text style={{ fontSize: 14, color: "#333" }}>
                                {open ? Message : Message.slice(0, LIMIT)}
                                <Text
                                    onPress={() => setOpen(!open)}
                                    style={{ color: "green", fontWeight: "500" }}
                                >
                                    {open ? " less" : "...more"}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <CongratulationsModal
                isVisible={showCongrats}
                onClose={() => setShowCongrats(false)}
                onCollect={() => setShowCongrats(false)}
            />
        </SafeAreaView>
    )
}

export default Posts;
import react, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground, Animated, Easing } from "react-native";
import { Truck, ThumbsUp, ThumbsDown, MessageCircleMore, Send, Bookmark, Heart, Scroll } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import PostSearchBar from "../components/PostSearchBar";

function Trending() {
    const caption = "Planting trees and greenery is a simple yet impactful way to improve the environment and create a healthier future for everyone.";
    const LIMIT = 50;
    const Dp = require("../assets/Hari.png");
    const Card = require("../assets/Card.png");
    const [Message, setMessage] = useState(caption);
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0.7);
    const translateX = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [barWidth, setBarWidth] = useState(0);
    const [Like, setLike] = useState(0);
    const [Dislike, setDisLike] = useState(0);
    const [Mark, setMark] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PostSearchBar />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
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
            </ScrollView>
        </SafeAreaView>
    );
}

export default Trending;
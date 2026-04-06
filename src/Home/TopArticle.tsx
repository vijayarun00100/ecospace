import rect, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Share2, Bookmark, Heart, ThumbsDown, ArrowRight } from "lucide-react-native";
import BlogContent from "../components/BlogContent";
function TopArticle() {
    const Dp = require("../assets/Hari.png");
    const Recycling = require("../assets/Recycling.png");
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 10, }} edges={['top', 'left', 'right']}>
            <View style={{ flexDirection: "column", marginHorizontal: 30 }}>
                <View style={{}}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <TouchableOpacity>
                            <ChevronLeft width={30} height={30} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={{ marginRight: 30 }}>
                                <Share2 width={30} height={30} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Bookmark width={30} height={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 8, alignItems: "center" }}>
                    <View style={{ height: 150, width: 200, borderRadius: 30, alignItems: "center", justifyContent: "center", }}>
                        <View style={{ width: 100, height: 100 }}>
                            <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: 600, fontSize: 20, letterSpacing: 1 }}>Hari</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={{
                            marginHorizontal: 20,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50,
                            backgroundColor: "#5584EE",
                            width: 120,
                            marginBottom: 15
                        }}>
                            <Text style={{
                                color: "white",
                                fontWeight: "500",
                                letterSpacing: 2,
                                fontSize: 18,
                            }}>
                                Follow
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} style={{}}>
                <View style={{ backgroundColor: "white", flex: 4, borderTopRightRadius: 60, borderTopLeftRadius: 60, borderBottomRightRadius: 30, borderBottomLeftRadius: 30 }}>
                    <View style={{
                        backgroundColor: "#D9D9D9",
                        width: 60,
                        height: 5,
                        marginTop: 10,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }} />
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20, }}>
                        <View style={{ flexDirection: "row", borderRadius: 30, alignItems: "center", padding: 7, paddingHorizontal: 9, backgroundColor: "#F2F2F2", }}>
                            <View style={{ height: 38, width: 38, borderRadius: 30, marginRight: 20, }}>
                                <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                            </View>
                            <View style={{}}>
                                <Text style={{ fontWeight: 600, fontSize: 16, color: "#4F4F4F" }}>Recycling</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 15, marginHorizontal: 20, alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ fontWeight: 600, fontSize: 28, letterSpacing: 1, color: "#4F9A42", textAlign: "center" }}>8 Steps to help you Recycling things at home</Text>
                            <View style={{ flexDirection: "row", marginTop: 12, alignItems: "center" }}>
                                <Text style={{ marginRight: 20, color: "#8B8B8B" }}>Trending No. 1</Text>
                                <Text style={{ color: "#8B8B8B" }}>2 days ago</Text>
                            </View>
                        </View>
                    </View>
                    <BlogContent text="Whilst recycled materials are valuable commodities in the worldwide market and are financially important; recycling is good for the environment too. It makes best use of our limited natural resources.  Recycling is a real success story and we should be proud of what we have achieved as a nation – but there is still much more we can do." image={Dp} />
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, marginHorizontal: 30 }}>
                    <TouchableOpacity style={{ marginRight: 15, padding: 12, borderRadius: 90, backgroundColor: "#5584EE" }}>
                        <Heart width={30} height={30} color={"#FFFFFF"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 12, borderRadius: 90, backgroundColor: "#5584EE", }}>
                        <ThumbsDown width={30} height={30} color={"#FFFFFF"} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, marginHorizontal: 30, flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ borderWidth: 2, paddingVertical: 10, paddingHorizontal: 13, margin: 10, borderRadius: 12, borderColor: "#AD9A5C", backgroundColor: "#FFF8D6" }}>
                        <Text>Eco Cycle</Text>
                    </View>
                    <View style={{ borderWidth: 2, paddingVertical: 10, paddingHorizontal: 13, margin: 10, borderRadius: 12, borderColor: "#AD9A5C", backgroundColor: "#FFF8D6" }}>
                        <Text>Metal Waste</Text>
                    </View>
                    <View style={{ borderWidth: 2, paddingVertical: 10, paddingHorizontal: 13, margin: 10, borderRadius: 12, borderColor: "#AD9A5C", backgroundColor: "#FFF8D6" }}>
                        <Text>Up Cycle</Text>
                    </View>
                    <View style={{ borderWidth: 2, paddingVertical: 10, paddingHorizontal: 13, margin: 10, borderRadius: 12, borderColor: "#AD9A5C", backgroundColor: "#FFF8D6" }}>
                        <Text>Green Guard</Text>
                    </View>
                    <View style={{ borderWidth: 2, margin: 10, paddingVertical: 10, paddingHorizontal: 13, borderRadius: 12, borderColor: "#AD9A5C", backgroundColor: "#FFF8D6" }}>
                        <Text>Paper</Text>
                    </View>
                    <View style={{ borderWidth: 2, margin: 10, paddingVertical: 10, paddingHorizontal: 13, borderRadius: 12, borderColor: "#AD9A5C", backgroundColor: "#FFF8D6" }}>
                        <Text>Zero Waste</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, marginHorizontal: 30 }}>
                    <Text style={{ color: "#4F9A42", fontWeight: 600, fontSize: 20, letterSpacing: 2 }}>You might also enjoy!</Text>
                </View>
                <View style={{ marginHorizontal: 30 }}>
                    <View style={{
                        borderBottomWidth: 2,
                        borderColor: "#939393",
                        width: 330,
                        height: 120,
                        justifyContent: "center",
                        padding: 2,
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 80, height: 80 }}>
                                <Image
                                    source={Dp}
                                    resizeMode="cover"
                                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                                />
                            </View>
                            <View style={{
                                marginLeft: 10,
                                flex: 1,
                                flexShrink: 1
                            }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                    Gardening
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{ color: "#555" }}
                                >
                                    Follows natural growing cycles and relies exclusively on biological processes.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 2,
                        borderColor: "#939393",
                        width: 330,
                        height: 120,
                        justifyContent: "center",
                        padding: 2,
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 80, height: 80 }}>
                                <Image
                                    source={Dp}
                                    resizeMode="cover"
                                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                                />
                            </View>
                            <View style={{
                                marginLeft: 10,
                                flex: 1,
                                flexShrink: 1
                            }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                    Gardening
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{ color: "#555" }}
                                >
                                    Follows natural growing cycles and relies exclusively on biological processes.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        borderBottomWidth: 2,
                        borderColor: "#939393",
                        width: 330,
                        height: 120,
                        justifyContent: "center",
                        padding: 2,
                        marginBottom:20
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 80, height: 80 }}>
                                <Image
                                    source={Dp}
                                    resizeMode="cover"
                                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                                />
                            </View>
                            <View style={{
                                marginLeft: 10,
                                flex: 1,
                                flexShrink: 1
                            }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                    Gardening
                                </Text>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={{ color: "#555" }}
                                >
                                    Follows natural growing cycles and relies exclusively on biological processes.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TopArticle;
import react, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, Recycle } from "lucide-react-native";
import PostSearchBar from "../components/PostSearchBar";

const Recycling = require("../assets/Recycling.png");
const Dp = require("../assets/Hari.png");
// const text = ""
function Article({navigation} : any) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PostSearchBar />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={{ flexDirection: "column", marginHorizontal: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "#4F9A42", fontWeight: 600, fontSize: 20, letterSpacing: 1 }}>Top Articles</Text>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('TopArticle')}
                            style={{ borderRadius: 30, backgroundColor: "#5584EE", alignItems: "center", justifyContent: "center", width: 27, height: 27 }}
                        >
                            <ArrowRight color={"white"} width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: 10, marginRight: 10, flexDirection: "column", backgroundColor: "#FFFFFF", width: 210, height: 270, borderRadius: 20, alignItems: "center" }}>
                                <View style={{ marginHorizontal: 10, marginVertical: 10, width: 180, height: 120, }}>
                                    <Image source={Recycling} style={{ borderRadius: 10, width: "100%", height: "100%" }} resizeMode="cover" />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%", marginLeft: 10, }}>
                                    <View style={{ height: 38, width: 38, borderRadius: 30, marginRight: 10 }}>
                                        <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={{ color: "black", fontWeight: 600, fontSize: 18 }}>Harish</Text>
                                        <Text style={{ color: "#DEDEDE", fontWeight: 700, fontSize: 13 }}>1d ago</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 10 }}>
                                    <Text style={{ color: "#636363" }}>Recycling is the process of converting waste materials into new materials and objects.</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, marginRight: 10, flexDirection: "column", backgroundColor: "#FFFFFF", width: 210, height: 270, borderRadius: 20, alignItems: "center" }}>
                                <View style={{ marginHorizontal: 10, marginVertical: 10, width: 180, height: 120, }}>
                                    <Image source={Recycling} style={{ borderRadius: 10, width: "100%", height: "100%" }} resizeMode="cover" />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "flex-start", width: "100%", marginLeft: 10, }}>
                                    <View style={{ height: 38, width: 38, borderRadius: 30, marginRight: 10 }}>
                                        <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={{ color: "black", fontWeight: 600, fontSize: 18 }}>Harish</Text>
                                        <Text style={{ color: "#DEDEDE", fontWeight: 700, fontSize: 13 }}>1d ago</Text>
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 10 }}>
                                    <Text style={{ color: "#636363" }}>Recycling is the process of converting waste materials into new materials and objects.</Text>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: "column" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                            <Text style={{ color: "#4F9A42", fontWeight: 600, fontSize: 20, letterSpacing: 2 }}>Explore</Text>
                            <TouchableOpacity style={{ borderRadius: 30, backgroundColor: "#5584EE", alignItems: "center", justifyContent: "center", width: 27, height: 27 }}>
                                <ArrowRight color={"white"} width={24} height={24} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal style={{}}>
                            <View style={{ marginTop: 20, flexDirection: "row", paddingBottom: 10 }}>
                                <View style={{ height: 100, width: 100, borderRadius: 30, marginRight: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    <Text>Plantation</Text>
                                </View>
                                <View style={{ height: 100, width: 100, borderRadius: 30, marginRight: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    <Text>Eco Chnarge</Text>
                                </View>
                                <View style={{ height: 100, width: 100, borderRadius: 30, marginRight: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    <Text>Solarize</Text>
                                </View>
                                <View style={{ height: 100, width: 100, borderRadius: 30, marginRight: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Image source={Dp} resizeMode="contain" style={{ width: "100%", height: "100%", borderRadius: 90 }} />
                                    <Text>Sustain</Text>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                            <Text style={{ color: "#4F9A42", fontWeight: 600, fontSize: 20, letterSpacing: 2 }}>Latest News</Text>
                        </View>
                        <ScrollView>
                            <View style={{}}>
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
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>);
}

export default Article;
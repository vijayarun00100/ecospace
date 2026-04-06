import { View, Text, Image, ScrollView, TouchableOpacity, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BadgeCheck, ThumbsUp, ThumbsDown, EllipsisVertical, ChevronLeft, ChevronDown, ChevronRight, Search, Mic, ShoppingCart, Heart, Share2, ArrowDown, SquarePen, CircleQuestionMark } from "lucide-react-native";
import Rating from "../components/Rating";
import WB1 from "../assets/Products/Bottle/WB1.png";
import Carbon_save from "../assets/Carbon_save.svg";
import Plastic_save from "../assets/Plastic_Save.svg";
import RatingBar from "../components/RatingBar.tsx";
import { useNavigation } from "@react-navigation/native";

function ProductScreen() {
    const navigation = useNavigation<any>();
    const [selectedColor, setSelectedColor] = useState('');
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView edges={['top']} style={{ backgroundColor: "#D4F2CF" }} />
            <View
                style={{
                    backgroundColor: "#D4F2CF",
                    paddingHorizontal: 30,
                    paddingVertical: 12
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft size={28} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row" }}>
                        <Search size={26} style={{ marginRight: 15 }} />
                        <Mic size={26} style={{ marginRight: 15 }} />
                        <ShoppingCart size={26} />
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>

                <View style={{ alignItems: "center", backgroundColor: "fff" }}>
                    <Image
                        source={WB1}
                        resizeMode="stretch"
                        style={{
                            width: "100%",
                            height: 400,
                        }}
                    />
                    <View style={{ position: "absolute", flexDirection: "column", top: 30, right: 30 }}>
                        <TouchableOpacity>
                            <Heart size={30} color={"white"} style={{ marginBottom: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Share2 size={30} color={"white"} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ marginHorizontal: 30, marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "#333" }}>
                        Eco Friendly Insulated Green Bottle & Sipper |
                    </Text>

                    <Text style={{ marginTop: 5, color: "#888", fontWeight: 500 }}>
                        400 ml | Water Bottle for Office and Gym | Made with Rice Husk | Water Bottle for kids and adults
                    </Text>

                    <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Rating />
                        <Text style={{ color: "#5584EE", fontSize: 17 }}>
                            <Text style={{ fontSize: 20 }}>6,875 </Text>ratings
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 10,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                            <View
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderWidth: 1,
                                    borderRadius: 18,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#D4F2CF", marginRight: 4
                                }}
                            >
                                <Carbon_save width={18} height={18} />
                            </View>

                            <Text style={{ fontSize: 14, color: "#555", flexWrap: "wrap" }}>
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
                                    100g
                                </Text>{" "}
                                Carbon Saved
                            </Text>
                        </View>


                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                            <View
                                style={{
                                    width: 36,
                                    height: 36,
                                    borderWidth: 1,
                                    borderRadius: 18,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#D4F2CF", marginRight: 4
                                }}
                            >
                                <Plastic_save width={20} height={20} />
                            </View>

                            <Text style={{ fontSize: 14, color: "#555", flexWrap: "wrap" }}>
                                <Text style={{ fontSize: 18, fontWeight: "700", color: "#000" }}>
                                    150g
                                </Text>{" "}
                                Plastic Saved
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 16 }}>Color</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => setSelectedColor("pink")}
                                style={{
                                    width: 50, height: 50, borderRadius: 25, marginTop: 10, backgroundColor: "#FFDDC8", marginRight: 10, borderWidth: selectedColor === "pink" ? 2 : 0,
                                    borderColor: "black",
                                }}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedColor("yellow")} style={{
                                width: 50, height: 50, borderRadius: 25, marginTop: 10, backgroundColor: "#FFF3B6", marginRight: 10, borderWidth: selectedColor === "yellow" ? 2 : 0,
                                borderColor: "black",
                            }}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedColor("blue")} style={{
                                width: 50, height: 50, borderRadius: 25, marginTop: 10, backgroundColor: "#BCDFFF", marginRight: 10, borderWidth: selectedColor === "blue" ? 2 : 0,
                                borderColor: "black",
                            }}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedColor("purple")} style={{
                                width: 50, height: 50, borderRadius: 25, marginTop: 10, backgroundColor: "#D7BFFF", borderWidth: selectedColor === "purple" ? 2 : 0,
                                borderColor: "black",
                            }}></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView horizontal
                    style={{
                        flexDirection: "row",
                        marginHorizontal: 30,
                        marginTop: 10,
                    }}
                >
                    {[
                        { label: "500 litre", img: WB1 },
                        { label: "1 litre", img: WB1 },
                        { label: "1.5 litre", img: WB1 },
                    ].map((item, index) => (
                        <View
                            key={index}
                            style={{
                                marginRight: 12,
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: 100,
                                    height: 120,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    source={item.img}
                                    resizeMode="cover"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </View>
                            <View
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 12,
                                    backgroundColor: "#D4F2CF",
                                    marginTop: 8,
                                    borderRadius: 10,
                                    width: 100,
                                    alignItems: "center",
                                }}
                            >
                                <Text>{item.label}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={{ marginHorizontal: 30, marginTop: 20, flexDirection: "row", alignItems: "center" }}>
                    <ArrowDown size={35} color={"#4F9A42"} style={{ marginRight: 5 }} />
                    <Text style={{ color: "#4F9A42", fontSize: 30, fontWeight: 800, marginRight: 25 }}>53%</Text>
                    <Text style={{
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'dotted',
                        fontSize: 26,
                        fontWeight: 800,
                        color: "#8B8B8B",
                        marginRight: 10
                    }}>1092</Text>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: 800,
                    }}>₹575</Text>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 30, justifyContent: "center" }}>
                    <View style={{ width: "80%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginTop: 30, padding: 10, backgroundColor: "#CDDBFA", justifyContent: "center" }}>
                        <Text style={{ color: "#223E7C" }}>Buy 3 units, save 3% more</Text>
                    </View>
                    <TouchableOpacity style={{ borderWidth: 1, padding: 10, alignItems: "center", justifyContent: "center", marginTop: 30, borderTopRightRadius: 10, borderBottomRightRadius: 10, borderColor: "#5584EE", flexDirection: "row", }}>
                        <Text>Qty:1</Text>
                        <ChevronDown />
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: 2 , marginBottom:10 }}>
                    <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 15, fontWeight: 300 }}>Free delivery by <Text style={{ fontWeight: 900 }}>Tomorrow</Text></Text>
                </View>
                <View style={{ width: "100%", borderWidth: 2, marginTop: 5, borderColor: "#DEDEDE", height: 0 }} />
                <View style={{ marginTop: 10, marginHorizontal: 30 }}>
                    <Text style={{ color: "#4F4F4F", fontFamily: "Metropolis-Regular", fontWeight: 900, fontSize: 18 }}>Benifits</Text>
                    <Text style={{ marginTop: 10, fontFamily: "Metropolis-Regular", fontSize: 15, fontWeight: 500 }}>Contemporary | Environmental Friendly | Earth Friendly | Climate Friendly </Text>
                </View>
                <View style={{ width: "100%", borderWidth: 1, marginTop: 10, borderColor: "#DEDEDE", height: 0 }} />
                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: "space-between", marginHorizontal: 30 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text style={{ fontSize: 18, fontWeight: 500 }}>All Offers & Coupons</Text>
                    </View>
                    <View>
                        <ChevronRight width={30} height={30} />
                    </View>
                </View>
                <View style={{ width: "100%", borderWidth: 1, marginTop: 10, borderColor: "#DEDEDE", height: 0 }} />
                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center", justifyContent: "space-between", marginHorizontal: 30 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text style={{ fontWeight: 500, fontSize: 18 }}>Product Details</Text>
                    </View>
                    <View>
                        <ChevronRight width={30} height={30} />
                    </View>
                </View>
                <View style={{ width: "100%", borderWidth: 1, marginTop: 10, borderColor: "#DEDEDE", height: 0 }} />
                <View style={{ marginHorizontal: 30, marginTop: 20 }}>
                    <Text style={{ color: "#988133", fontFamily: "Metropolis-Regular", fontSize: 24, fontWeight: 800 }}>
                        Ratings & Reviews
                    </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center", marginHorizontal: 30 }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 15 }}>
                            Very Good
                        </Text>

                        <Rating />

                        <Text
                            style={{
                                fontWeight: "500",
                                fontFamily: "Metropolis-Regular",
                                fontSize: 16,
                                marginTop: 15,
                            }}
                        >
                            Based on 3,456 ratings
                        </Text>
                    </View>

                    <View
                        style={{
                            width: 1.5,
                            height: "80%",
                            backgroundColor: "#988133",
                            marginHorizontal: 15,
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <RatingBar />
                    </View>
                </View>
                <View style={{ width: "100%", borderWidth: 1, marginTop: 10, borderColor: "#DEDEDE", height: 0 }} />
                <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center", marginHorizontal: 30, marginBottom: 10 }}>
                    <TouchableOpacity style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <SquarePen />
                        <Text style={{ marginLeft: 12 }}>Write a review</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            width: 1.5,
                            height: "100%",
                            backgroundColor: "#988133",
                            marginHorizontal: 15,
                        }}
                    />
                    <TouchableOpacity style={{ flex: 1, flexDirection: "row" }}>
                        <CircleQuestionMark />
                        <Text style={{ marginLeft: 12 }}>Ask a Question</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", borderWidth: 1, marginTop: 10, borderColor: "#DEDEDE", height: 0 }} />
                <View style={{ marginTop: 20, marginHorizontal: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 18, fontWeight: 600 }}>Vijay</Text>
                        <EllipsisVertical />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 20, fontWeight: 900, marginTop: 20 }}>Best Quality</Text>
                        <Text style={{ marginTop: 10, fontSize: 16 }}>Received the order on time and it's very good quality but after return policy completed only 1 bottle is changing the color like as rust rest of the bottles are good.</Text>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ marginRight: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <ThumbsUp style={{ marginRight: 10 }} />
                                <Text>69</Text>
                            </View>
                            <View style={{ marginRight: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <ThumbsDown style={{ marginRight: 10 }} />
                                <Text>20</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <BadgeCheck />
                        <Text style={{ marginLeft: 10 }}>Verified Purchase  . </Text>
                        <Text> 3 months </Text>
                    </View>
                </View>
                <View style={{ width: "100%", borderWidth: 1, marginTop: 10, borderColor: "#DEDEDE", height: 0 }} />
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
                    onPress={() => navigation.navigate('Cart')}
                    style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        paddingVertical: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 1,
                        borderColor: "#eee",
                    }}
                >
                    <Text style={{ fontWeight: "700", fontSize: 18 }}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: "#5584EE",
                        paddingVertical: 20,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
                        Buy now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ProductScreen;
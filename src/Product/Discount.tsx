import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart, MoveRight } from "lucide-react-native";

import Fs1 from "../assets/Products/Fs1.png";
import Fs2 from "../assets/Products/Fs2.png";
import Fs3 from "../assets/Products/Fs3.png";

const products = [
    { name: "Utensils", discount: 10, image: Fs3 },
    { name: "Bottle", discount: 40, image: Fs1 },
    { name: "Bag", discount: 45, image: Fs2 },
];

import { useNavigation } from "@react-navigation/native";

function Discount() {
    const navigation = useNavigation<any>();
    return (
        <View style={{ marginTop: 10 }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 30,
                    marginBottom:5,
                }}
            >
                <Text style={{ fontFamily:"Metropolis-Regular" ,fontSize: 20, fontWeight: "900" , color:"#347928" }}>
                    Deals for you
                </Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Shop')}
                    style={{ backgroundColor:"#BDAE7D" , width:30 , height:30 , borderRadius:30 , alignItems:"center" , justifyContent:"center"}}
                >
                    <MoveRight width={20} height={20} color={"white"}/>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
            >
                {products.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('Product')}
                        activeOpacity={0.9}
                        style={{
                            width: 160,
                            height: 190,
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            marginLeft: index === 0 ? 20 : 10,
                            marginRight: 10,
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{ width: "100%", height: "100%", borderRadius: 10 }}
                            resizeMode="cover"
                        />
                        <View
                            style={{
                                position: "absolute",
                                backgroundColor: "#5584EE",
                                padding: 5,
                                borderTopLeftRadius: 10,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>
                                {item.discount}%
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: "#EBEBEB",
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Heart size={18} color="#727272" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default Discount;
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../components/ProductSearchBar";
import { ChevronDown } from "lucide-react-native";

import WB1 from "../assets/Products/Bottle/WB1.png";
import WB2 from "../assets/Products/Bottle/WB2.png";
import WB3 from "../assets/Products/Bottle/WB3.png";
import WB4 from "../assets/Products/Bottle/WB4.png";
import WB5 from "../assets/Products/Bottle/WB5.png";
import WB6 from "../assets/Products/Bottle/WB6.png";

import { useNavigation } from "@react-navigation/native";

function Shop() {
    const navigation = useNavigation<any>();

    const bottles = [
        { name: "Hydra Wooden Smart Bottle", image: WB1, price: 899, capacity: 2 },
        { name: "Borosil Eco Copper Bottle", image: WB2, price: 925, capacity: 2 },
        { name: "Pexpo Echo Delux Hot & Cold", image: WB3, price: 799, capacity: 1 },
        { name: "Borosil Eco Vacuum Bottle", image: WB4, price: 850, capacity: 1 },
        { name: "Alexa Gold Steel Bottle", image: WB5, price: 999, capacity: 2 },
        { name: "Pexpo Echo Vacuum Flask", image: WB6, price: 700, capacity: 1 },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Searchbar />

            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginHorizontal: 30 }}
                >
                    {["Sort By", "Discount", "Price", "Customer Ratings"].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderWidth: 1,
                                padding: 6,
                                borderRadius: 70,
                                marginRight: 10
                            }}
                        >
                            <Text style={{ marginRight: 5 }}>{item}</Text>
                            <ChevronDown size={16} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text
                    style={{
                        fontFamily: "Metropolis-Regular",
                        fontWeight: "800",
                        fontSize: 24,
                        marginHorizontal: 30,
                        marginTop: 20,
                        color: "#4F9A42",
                        marginBottom: 20
                    }}
                >
                    Water Bottles
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginHorizontal: 30,
                        justifyContent: "space-between"
                    }}
                >
                    {bottles.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Product')}
                            style={{
                                width: "50%",
                                marginBottom: 20,
                                alignItems: "center",
                                borderRadius: 15,
                                padding: 10
                            }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="stretch"
                                style={{ width: "100%", height: 180 }}
                            />

                            <Text
                                numberOfLines={1}
                                style={{ color: "#646464", textAlign: "center", marginTop: 8, fontFamily: "Metropolis-Regular", fontWeight: 700 }}
                            >
                                {item.name}
                            </Text>
                            <Text style={{ marginTop: 5, alignSelf: "flex-start", color: "#B1B1B1" }}>
                                {item.capacity} litre
                            </Text>
                            <View style={{alignSelf:"flex-start" , justifyContent:"space-between" , flexDirection:"row" ,width:"100%" }}>
                                <Text style={{ fontWeight: "700", color:"#646464", marginTop: 5, alignSelf: "flex-start" }}>
                                    Rs: {item.price}
                                </Text>
                                <TouchableOpacity style={{padding:5 , borderRadius:10 , borderWidth:1 , alignItems:"center", borderColor:"#5584EE"}}>
                                    <Text style={{color:"#5584EE"}}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Shop;
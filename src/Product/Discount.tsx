import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { Heart, MoveRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { productsAPI } from "../api/products";
import { getUploadUrl } from "../api/config";

function Discount() {
    const navigation = useNavigation<any>();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                // Fetch products sorted by discount or filtered for discounts
                const res = await productsAPI.getAll({ sort: 'discount' });
                // Filter to only show products with a real discount
                const deals = res.data.products.filter((p: any) => p.discount > 0);
                setProducts(deals.slice(0, 10)); // Top 10 deals
            } catch (err) {
                console.error("Error fetching deals:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    if (loading) {
        return (
            <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="#4F9A42" />
            </View>
        );
    }

    if (products.length === 0) return null;

    return (
        <View style={{ marginTop: 25 }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 30,
                    marginBottom: 5,
                }}
            >
                <Text style={{ fontFamily: "Metropolis-Regular", fontSize: 20, fontWeight: "900", color: "#347928" }}>
                    Deals for you
                </Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Shop', { sort: 'discount' })}
                    style={{ backgroundColor: "#BDAE7D", width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" }}
                >
                    <MoveRight width={20} height={20} color={"white"} />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 15 }}
                contentContainerStyle={{ paddingLeft: 25, paddingRight: 10 }}
            >
                {products.map((item, index) => (
                    <TouchableOpacity
                        key={item._id || index}
                        onPress={() => navigation.navigate('Product', { productId: item._id })}
                        activeOpacity={0.9}
                        style={{
                            width: 170,
                            height: 220,
                            backgroundColor: "#fff",
                            borderRadius: 15,
                            marginRight: 15,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 5,
                            elevation: 3,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            source={{ uri: getUploadUrl(item.images?.[0]) || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' }}
                            style={{ width: "100%", height: 160 }}
                            resizeMode="cover"
                        />
                        <View
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                backgroundColor: "#FF4D4D",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderBottomRightRadius: 15,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "900", fontSize: 13 }}>
                                {item.discount}% OFF
                            </Text>
                        </View>
                        
                        <View style={{ padding: 10 }}>
                            <Text numberOfLines={1} style={{ fontWeight: '700', fontSize: 14, color: '#333' }}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <Text style={{ fontWeight: '900', color: '#4F9A42', fontSize: 16 }}>₹{item.price}</Text>
                                <Text style={{ textDecorationLine: 'line-through', color: '#BBB', fontSize: 12, marginLeft: 8 }}>₹{item.originalPrice || Math.round(item.price / (1 - item.discount/100))}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                width: 34,
                                height: 34,
                                borderRadius: 17,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Heart size={18} color={item.isWishlisted ? "#FF4D4D" : "#888"} fill={item.isWishlisted ? "#FF4D4D" : "transparent"} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default Discount;
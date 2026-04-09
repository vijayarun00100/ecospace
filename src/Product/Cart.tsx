import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowDown, Trash2, TruckElectric, ChevronDown, ChevronLeft, ChevronRight, Plus, ShoppingBag } from 'lucide-react-native';
import Rating from "../components/Rating";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { getUploadUrl } from "../api/config";

function Cart() {
    const navigation = useNavigation<any>();
    const { items, subtotal, total, itemCount, isLoading, removeItem, updateQuantity } = useCart();

    const handleRemove = (itemId: string) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item from your cart?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => removeItem(itemId) }
            ]
        );
    };

    if (isLoading && items.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
            <View style={{ justifyContent: "space-between", flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <ChevronLeft size={30} color={"#4F9A42"} style={{ marginRight: 15 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 24, fontWeight: '800', color: "#4F9A42" }}>Your Cart</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Shop')}
                                style={{ alignItems: "center", flexDirection: "row", backgroundColor: '#E8F5E9', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 }}
                            >
                                <Plus size={20} color={"#4F9A42"} style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 14, fontWeight: '700', color: "#4F9A42" }}>Add more</Text>
                            </TouchableOpacity>
                        </View>

                        {items.length === 0 ? (
                            <View style={{ alignItems: 'center', marginTop: 100, paddingHorizontal: 40 }}>
                                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                    <ShoppingBag size={50} color="#CCC" />
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>Your cart is empty</Text>
                                <Text style={{ textAlign: 'center', color: '#888', marginTop: 10, lineHeight: 20 }}>Looks like you haven't added anything to your cart yet. Start shopping to find eco-friendly products!</Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('Shop')}
                                    style={{ marginTop: 30, backgroundColor: '#4F9A42', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 }}
                                >
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Start Shopping</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <>
                                <TouchableOpacity style={{ marginHorizontal: 20, borderRadius: 15, marginTop: 25, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#D4F2CF", padding: 20, alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: "#2E7D32", fontSize: 17, fontWeight: '700' }}>Apply Coupons & Offers</Text>
                                    </View>
                                    <ChevronRight color={"#2E7D32"} size={24} />
                                </TouchableOpacity>

                                <View style={{ marginTop: 20 }}>
                                    {items.map((item: any) => {
                                        const product = item.product;
                                        if (!product) return null;
                                        
                                        const discountPercent = product.discount || 0;
                                        const originalPrice = product.originalPrice || Math.round(product.price / (1 - discountPercent / 100));

                                        return (
                                            <View key={item._id} style={{ marginHorizontal: 20, marginTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View style={{ alignItems: "center" }}>
                                                        <View style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: '#F9F9F9', overflow: 'hidden' }}>
                                                            <Image
                                                                source={{ uri: getUploadUrl(product.images?.[0]) || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' }}
                                                                resizeMode="contain"
                                                                style={{ width: "100%", height: "100%" }}
                                                            />
                                                        </View>
                                                        <View style={{
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            padding: 5,
                                                            borderWidth: 1,
                                                            borderColor: "#DDD",
                                                            marginTop: 12,
                                                            borderRadius: 8,
                                                            flexDirection: "row",
                                                            width: 100,
                                                            backgroundColor: '#FFF'
                                                        }}>
                                                            <TouchableOpacity onPress={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>
                                                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 5 }}>-</Text>
                                                            </TouchableOpacity>
                                                            <Text style={{ fontWeight: "700" }}>{item.quantity}</Text>
                                                            <TouchableOpacity onPress={() => updateQuantity(item._id, item.quantity + 1)}>
                                                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingHorizontal: 5 }}>+</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1, marginLeft: 15 }}>
                                                        <Text
                                                            numberOfLines={2}
                                                            style={{
                                                                fontWeight: "700",
                                                                fontSize: 17,
                                                                color: '#333',
                                                                lineHeight: 22
                                                            }}
                                                        >
                                                            {product.name}
                                                        </Text>
                                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                                            <Rating rating={product.rating} size={14} />
                                                            <Text style={{ color: "#5584EE", fontSize: 13, marginLeft: 8, fontWeight: '600' }}>
                                                                {product.ratingsCount} reviews
                                                            </Text>
                                                        </View>
                                                        
                                                        {item.color || item.size ? (
                                                            <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                                                {item.color && <Text style={{ fontSize: 12, color: '#888', marginRight: 10 }}>Color: <Text style={{ color: '#555', fontWeight: '600' }}>{item.color}</Text></Text>}
                                                                {item.size && <Text style={{ fontSize: 12, color: '#888' }}>Size: <Text style={{ color: '#555', fontWeight: '600' }}>{item.size}</Text></Text>}
                                                            </View>
                                                        ) : null}

                                                        <View style={{
                                                            flexDirection: "row",
                                                            alignItems: "center",
                                                            marginTop: 12
                                                        }}>
                                                            {discountPercent > 0 && (
                                                                <>
                                                                    <ArrowDown size={14} color="#4F9A42" />
                                                                    <Text style={{ color: "#4F9A42", fontSize: 15, fontWeight: "700", marginLeft: 2, marginRight: 8 }}>{discountPercent}%</Text>
                                                                    <Text style={{ textDecorationLine: "line-through", fontSize: 14, color: "#AAA", marginRight: 8 }}>₹{originalPrice}</Text>
                                                                </>
                                                            )}
                                                            <Text style={{ fontSize: 20, fontWeight: "800", color: '#1A1A1A' }}>₹{product.price * item.quantity}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: 15, flexDirection: "row", gap: 12 }}>
                                                    <TouchableOpacity
                                                        onPress={() => handleRemove(item._id)}
                                                        style={{
                                                            flex: 1,
                                                            borderWidth: 1,
                                                            paddingVertical: 12,
                                                            borderRadius: 10,
                                                            borderColor: "#F5F5F5",
                                                            backgroundColor: '#FFF5F5',
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Trash2 size={18} color="#FF4D4D" style={{ marginRight: 8 }} />
                                                        <Text style={{ color: "#FF4D4D", fontSize: 14, fontWeight: "700" }}>Remove</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('Product', { productId: product._id })}
                                                        style={{
                                                            flex: 1,
                                                            borderWidth: 1,
                                                            paddingVertical: 12,
                                                            borderRadius: 10,
                                                            borderColor: "#F5F5F5",
                                                            backgroundColor: '#F0F8EE',
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <TruckElectric size={18} color="#4F9A42" style={{ marginRight: 8 }} />
                                                        <Text style={{ color: "#4F9A42", fontSize: 14, fontWeight: "700" }}>Details</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>
                
                {items.length > 0 && (
                    <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: "#fff",
                            borderTopWidth: 1,
                            borderColor: "#eee",
                            paddingBottom: Platform.OS === 'ios' ? 25 : 5,
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: -4 },
                            shadowOpacity: 0.05,
                            shadowRadius: 10,
                            elevation: 10
                        }}
                    >
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, color: "#888", fontWeight: '600' }}>Subtotal ({itemCount} items)</Text>
                            <Text style={{ fontSize: 24, fontWeight: "900", color: '#1A1A1A' }}>₹{total}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Payment')}
                            style={{
                                flex: 1.2,
                                backgroundColor: "#4F9A42",
                                paddingVertical: 18,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 18 }}>
                                Place Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

export default Cart;
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../components/ProductSearchBar";
import { ChevronDown, ShoppingCart } from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { productsAPI } from "../api/products";
import { getUploadUrl } from "../api/config";
import { useCart } from "../context/CartContext";

function Shop() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { category, q, certification } = route.params || {};
    const { addToCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');

    const fetchProducts = useCallback(async (pageNum = 1, isRefreshing = false) => {
        try {
            const res = await productsAPI.getAll({
                category,
                q,
                certification,
                page: pageNum,
                sort: sortBy === 'Price' ? 'price_asc' : 'createdAt'
            });
            if (isRefreshing || pageNum === 1) {
                setProducts(res.data.products || []);
            } else {
                setProducts(prev => [...prev, ...(res.data.products || [])]);
            }
            setTotalPages(res.data.totalPages);
            setPage(pageNum);
        } catch (err) {
            console.error("Product fetch error:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [category, q, certification, sortBy]);

    useEffect(() => {
        setLoading(true);
        fetchProducts(1);
    }, [fetchProducts]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts(1, true);
    };

    const handleAddToCart = async (item: any) => {
        try {
            await addToCart(item._id, 1);
            Alert.alert("Success", `${item.name} added to cart!`);
        } catch (err) {
            Alert.alert("Error", "Could not add item to cart.");
        }
    };

    if (loading && !refreshing && page === 1) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
            <Searchbar initialValue={q} />

            <ScrollView 
                contentContainerStyle={{ paddingBottom: 80 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, paddingHorizontal: 20 }}
                    contentContainerStyle={{ paddingRight: 40 }}
                >
                    {["Latest", "Discount", "Price (Low)", "Price (High)", "Ratings"].map((item, index) => {
                        const isSelected = 
                            (item === "Latest" && sortBy === "createdAt") ||
                            (item === "Discount" && sortBy === "discount") ||
                            (item === "Price (Low)" && sortBy === "price_asc") ||
                            (item === "Price (High)" && sortBy === "price_desc") ||
                            (item === "Ratings" && sortBy === "rating");

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    let newSort = 'createdAt';
                                    if (item === 'Discount') newSort = 'discount';
                                    if (item === 'Price (Low)') newSort = 'price_asc';
                                    if (item === 'Price (High)') newSort = 'price_desc';
                                    if (item === 'Ratings') newSort = 'rating';
                                    setSortBy(newSort);
                                }}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    padding: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 70,
                                    marginRight: 10,
                                    borderColor: isSelected ? "#4F9A42" : "#EEE",
                                    backgroundColor: isSelected ? "#E8F5E9" : "#FFF"
                                }}
                            >
                                <Text style={{ fontSize: 13, fontWeight: '600', color: isSelected ? "#4F9A42" : "#666" }}>{item}</Text>
                                <ChevronDown size={14} color={isSelected ? "#4F9A42" : "#666"} style={{ marginLeft: 6 }} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, marginTop: 20, marginBottom: 10 }}>
                    <Text
                        style={{
                            fontFamily: "Metropolis-Regular",
                            fontWeight: "800",
                            fontSize: 24,
                            color: "#4F9A42",
                            flex: 1
                        }}
                    >
                        {category || q || certification || "Our Products"}
                    </Text>
                    <Text style={{ color: '#888', fontSize: 13 }}>{products.length} found</Text>
                </View>

                {products.length === 0 ? (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: '#999' }}>No products found in this category.</Text>
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginHorizontal: 20,
                            justifyContent: "space-between"
                        }}
                    >
                        {products.map((item, index) => (
                            <TouchableOpacity
                                key={item._id || index}
                                onPress={() => navigation.navigate('Product', { productId: item._id })}
                                style={{
                                    width: "48%",
                                    marginBottom: 20,
                                    alignItems: "center",
                                    borderRadius: 15,
                                    backgroundColor: '#FFF',
                                    padding: 10,
                                    shadowColor: "#000",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 3
                                }}
                            >
                                <Image
                                    source={{ uri: getUploadUrl(item.images?.[0]) || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' }}
                                    resizeMode="contain"
                                    style={{ width: "100%", height: 160 }}
                                />

                                <Text
                                    numberOfLines={1}
                                    style={{ color: "#333", textAlign: "center", marginTop: 10, fontFamily: "Metropolis-Regular", fontWeight: "700", width: '100%' }}
                                >
                                    {item.name}
                                </Text>
                                <Text style={{ marginTop: 4, alignSelf: "flex-start", color: "#888", fontSize: 12 }}>
                                    {item.capacity || 'Eco Choice'}
                                </Text>
                                <View style={{ alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row", width: "100%", marginTop: 8 }}>
                                    <View>
                                        {item.discount > 0 && (
                                            <Text style={{ fontSize: 10, color: '#f44336', textDecorationLine: 'line-through' }}>
                                                Rs: {Math.round(item.price / (1 - item.discount / 100))}
                                            </Text>
                                        )}
                                        <Text style={{ fontWeight: "700", color: "#4F9A42" }}>
                                            Rs: {item.price}
                                        </Text>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={() => handleAddToCart(item)}
                                        style={{ padding: 6, borderRadius: 10, borderWidth: 1, alignItems: "center", borderColor: "#5584EE", backgroundColor: '#F0F4FF' }}
                                    >
                                        <Text style={{ color: "#5584EE", fontSize: 12, fontWeight: 'bold' }}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                
                {page < totalPages && (
                    <TouchableOpacity 
                        onPress={() => fetchProducts(page + 1)}
                        style={{ alignSelf: 'center', padding: 15 }}
                    >
                        <Text style={{ color: '#4F9A42', fontWeight: '600' }}>Load More</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Shop;
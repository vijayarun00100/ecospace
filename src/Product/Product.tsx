import { View, Text, Image, ScrollView, TouchableOpacity, Pressable, Platform, ActivityIndicator, Alert, TextInput, Modal, Share } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BadgeCheck, ThumbsUp, ThumbsDown, EllipsisVertical, ChevronLeft, ChevronDown, ChevronRight, Search, Mic, ShoppingCart, Heart, Share2, ArrowDown, SquarePen, CircleQuestionMark, Check, MessageCircle, Star } from "lucide-react-native";
import Rating from "../components/Rating";
import RatingBar from "../components/RatingBar.tsx";
import { useNavigation, useRoute } from "@react-navigation/native";
import { productsAPI } from "../api/products";
import { getUploadUrl } from "../api/config";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

// Assets
import Carbon_save from "../assets/Carbon_save.svg";
import Plastic_save from "../assets/Plastic_Save.svg";

function ProductScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { productId } = route.params || {};
    const { addToCart } = useCart();
    const { user: currentUser } = useAuth();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);
    const [selectedColor, setSelectedColor] = useState<any>(null);
    const [selectedSize, setSelectedSize] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Review & Question states
    const [submitting, setSubmitting] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewText, setReviewText] = useState("");

    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [questionText, setQuestionText] = useState("");

    const fetchProduct = useCallback(async () => {
        try {
            const res = await productsAPI.getById(productId);
            const p = res.data.product;
            setProduct(p);
            setIsWishlisted(p.isWishlisted);
            if (p.colors?.length > 0) setSelectedColor(p.colors[0]);
            if (p.sizes?.length > 0) setSelectedSize(p.sizes[0]);
        } catch (err) {
            console.error("Product fetch error:", err);
            Alert.alert("Error", "Could not fetch product details.");
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        if (productId) fetchProduct();
    }, [productId, fetchProduct]);

    const handleWishlist = async () => {
        try {
            const res = await productsAPI.toggleWishlist(productId);
            setIsWishlisted(res.data.isWishlisted);
        } catch (err) {
            Alert.alert("Error", "Could not update wishlist.");
        }
    };

    const handleAddToCart = async (shouldNavigate = false) => {
        try {
            await addToCart(productId, quantity, selectedColor?.name, selectedSize?.value);
            if (shouldNavigate) {
                navigation.navigate('Cart');
            } else {
                Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
            }
        } catch (err) {
            Alert.alert("Error", "Could not add to cart.");
        }
    };

    const handleSubmitReview = async () => {
        if (!reviewTitle.trim() || !reviewText.trim()) {
            Alert.alert("Missing Info", "Please provide both title and description.");
            return;
        }
        setSubmitting(true);
        try {
            await productsAPI.addReview(productId, { 
                title: reviewTitle, 
                text: reviewText, 
                rating: reviewRating 
            });
            Alert.alert("Success", "Review submitted successfully!");
            setShowReviewModal(false);
            setReviewTitle("");
            setReviewText("");
            setReviewRating(5);
            fetchProduct();
        } catch (err: any) {
            Alert.alert("Error", err.response?.data?.error || "Could not submit review.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitQuestion = async () => {
        if (!questionText.trim()) {
            Alert.alert("Missing Info", "Please enter your question.");
            return;
        }
        setSubmitting(true);
        try {
            await productsAPI.askQuestion(productId, questionText);
            Alert.alert("Question Sent", "Your question was sent to the seller.");
            setShowQuestionModal(false);
            setQuestionText("");
            fetchProduct();
        } catch (err: any) {
            Alert.alert("Error", err.response?.data?.error || "Could not send question.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleStartChat = () => {
        if (!product?.seller) {
            Alert.alert("Error", "Seller information not available.");
            return;
        }
        // Case where product.seller is just an ID (string) vs populated object
        const sellerId = typeof product.seller === 'string' ? product.seller : product.seller._id;
        const sellerName = product.seller.name || "Seller";

        if (sellerId === currentUser?._id) {
            Alert.alert("Wait", "This is your own product!");
            return;
        }
        navigation.navigate('ChatScreen', { 
            receiverId: sellerId, 
            receiverName: sellerName 
        });
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this eco-friendly product on EcoSpace: ${product.name}\n\n${product.shortDescription || product.description}\n\nAvailable for ₹${product.price}`,
                title: product.name,
            });
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFF' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    if (!product) return null;

    const discountPercentage = product.discount || 0;
    const originalPrice = product.originalPrice || Math.round(product.price / (1 - discountPercentage / 100));

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <SafeAreaView edges={['top']} style={{ backgroundColor: "#D4F2CF" }} />
            <View
                style={{
                    backgroundColor: "#D4F2CF",
                    paddingHorizontal: 20,
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

                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleStartChat}>
                            <MessageCircle size={26} color="#4F9A42" style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                            <Search size={26} style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <ShoppingCart size={26} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", position: 'relative' }}>
                    <Image
                        source={{ uri: getUploadUrl(product.images?.[activeImageIndex]) || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400' }}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: 400,
                            backgroundColor: '#F9F9F9'
                        }}
                    />
                    <View style={{ position: "absolute", top: 20, right: 20 }}>
                        <TouchableOpacity 
                            onPress={handleWishlist}
                            style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: 10, borderRadius: 25, marginBottom: 15, elevation: 4 }}
                        >
                            <Heart size={26} color={isWishlisted ? "#FF4D4D" : "#888"} fill={isWishlisted ? "#FF4D4D" : "transparent"} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={handleShare}
                            style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: 10, borderRadius: 25, elevation: 4 }}
                        >
                            <Share2 size={26} color={"#888"} />
                        </TouchableOpacity>
                    </View>
                    
                    {product.images?.length > 1 && (
                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 15 }}>
                            {product.images.map((_: any, idx: number) => (
                                <View 
                                    key={idx} 
                                    style={{ 
                                        width: 8, height: 8, borderRadius: 4, 
                                        backgroundColor: activeImageIndex === idx ? '#4F9A42' : '#CCC', 
                                        marginHorizontal: 4 
                                    }} 
                                />
                            ))}
                        </View>
                    )}
                </View>

                <View style={{ marginHorizontal: 25, marginTop: 25 }}>
                    <Text style={{ fontSize: 24, fontWeight: "800", color: "#1A1A1A" }}>
                        {product.name}
                    </Text>

                    <Text style={{ marginTop: 8, color: "#666", fontSize: 16, lineHeight: 24 }}>
                        {product.shortDescription || product.description}
                    </Text>

                    <View style={{ marginTop: 15, flexDirection: "row", alignItems: "center" }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
                            <Text style={{ fontWeight: 'bold', color: '#4F9A42', marginRight: 5 }}>{product.rating?.toFixed(1) || 0}</Text>
                            <Rating rating={product.rating || 0} size={16} />
                        </View>
                        <Text style={{ color: "#5584EE", fontSize: 15, marginLeft: 15, fontWeight: '600' }}>
                            {product.ratingsCount || 0} reviews
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 20,
                            backgroundColor: '#F0F8EE',
                            padding: 15,
                            borderRadius: 15
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#FFF", marginRight: 10 }}>
                                <Carbon_save width={20} height={20} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: "800", color: "#2E7D32" }}>{product.carbonSaved}</Text>
                                <Text style={{ fontSize: 12, color: "#666" }}>Carbon Saved</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", flex: 1, borderLeftWidth: 1, borderLeftColor: '#D4E8CF', paddingLeft: 15 }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#FFF", marginRight: 10 }}>
                                <Plastic_save width={22} height={22} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: "800", color: "#2E7D32" }}>{product.plasticSaved}</Text>
                                <Text style={{ fontSize: 12, color: "#666" }}>Plastic Saved</Text>
                            </View>
                        </View>
                    </View>

                    {product.colors?.length > 0 && (
                        <View style={{ marginTop: 25 }}>
                            <Text style={{ fontSize: 17, fontWeight: '700', color: '#333' }}>Available Colors</Text>
                            <View style={{ flexDirection: "row", marginTop: 12 }}>
                                {product.colors.map((color: any, idx: number) => (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => setSelectedColor(color)}
                                        style={{
                                            width: 44, height: 44, borderRadius: 22, backgroundColor: color.hex, marginRight: 15,
                                            borderWidth: selectedColor?.name === color.name ? 3 : 1,
                                            borderColor: selectedColor?.name === color.name ? "#4F9A42" : "#EEE",
                                            justifyContent: 'center', alignItems: 'center'
                                        }}
                                    >
                                        {selectedColor?.name === color.name && <Check size={20} color={['#FFFFFF', '#FFF3B6', '#FFF'].includes(color.hex) ? '#000' : '#FFF'} />}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}

                    {product.sizes?.length > 0 && (
                        <View style={{ marginTop: 25 }}>
                            <Text style={{ fontSize: 17, fontWeight: '700', color: '#333' }}>Select Size / Volume</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                                {product.sizes.map((size: any, idx: number) => (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={() => setSelectedSize(size)}
                                        style={{
                                            paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginRight: 12,
                                            backgroundColor: selectedSize?.value === size.value ? "#4F9A42" : "#F5F5F5",
                                            borderWidth: 1, borderColor: selectedSize?.value === size.value ? "#4F9A42" : "#EEE"
                                        }}
                                    >
                                        <Text style={{ color: selectedSize?.value === size.value ? "#FFF" : "#666", fontWeight: 'bold' }}>{size.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                <View style={{ marginHorizontal: 25, marginTop: 30, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <ArrowDown size={28} color={"#4F9A42"} />
                        <Text style={{ color: "#4F9A42", fontSize: 26, fontWeight: "900", marginLeft: 5 }}>{discountPercentage}%</Text>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ textDecorationLine: 'line-through', fontSize: 18, color: "#AAA" }}>₹{originalPrice}</Text>
                            <Text style={{ fontSize: 32, fontWeight: "900", color: '#1A1A1A' }}>₹{product.price}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 25, padding: 5 }}>
                        <TouchableOpacity 
                            onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ marginHorizontal: 15, fontSize: 18, fontWeight: 'bold' }}>{quantity}</Text>
                        <TouchableOpacity 
                            onPress={() => setQuantity(quantity + 1)}
                            style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginHorizontal: 25, marginTop: 10 }}>
                    <Text style={{ color: "#888", fontSize: 14 }}>Free delivery by <Text style={{ fontWeight: "900", color: '#4F9A42' }}>{product.deliveryDays || 3} Days</Text></Text>
                </View>

                <View style={{ marginTop: 25, paddingHorizontal: 25 }}>
                    <Text style={{ color: "#1A1A1A", fontWeight: "900", fontSize: 19 }}>Key Benefits</Text>
                    <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {(product.benefits || []).map((benefit: string, idx: number) => (
                            <View key={idx} style={{ backgroundColor: '#F2F2F2', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 10, marginBottom: 10 }}>
                                <Text style={{ color: '#555', fontSize: 13 }}>{benefit}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ marginTop: 20, borderTopWidth: 8, borderTopColor: '#F5F5F5', paddingTop: 25 }}>
                    <View style={{ marginHorizontal: 25 }}>
                        <Text style={{ color: "#988133", fontSize: 22, fontWeight: "900" }}>Ratings & Reviews</Text>
                        
                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: "center" }}>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={{ fontWeight: "900", fontSize: 42, color: '#1A1A1A' }}>{product.rating?.toFixed(1) || 0}</Text>
                                <Rating rating={product.rating || 0} />
                                <Text style={{ color: "#888", marginTop: 8 }}>{product.ratingsCount || 0} ratings</Text>
                            </View>
                            <View style={{ width: 1.5, height: 100, backgroundColor: "#EEE", marginHorizontal: 20 }} />
                            <View style={{ flex: 1.5 }}>
                                <RatingBar />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 25, borderTopWidth: 1, borderTopColor: '#EEE', paddingVertical: 15, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            onPress={() => setShowReviewModal(true)}
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#EEE' }}
                        >
                            <SquarePen size={20} color="#5584EE" />
                            <Text style={{ marginLeft: 10, color: '#5584EE', fontWeight: 'bold' }}>Write Review</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => setShowQuestionModal(true)}
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <CircleQuestionMark size={20} color="#5584EE" />
                            <Text style={{ marginLeft: 10, color: '#5584EE', fontWeight: 'bold' }}>Ask Question</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ borderTopWidth: 1, borderTopColor: '#EEE' }}>
                        {product.reviews?.length > 0 ? (
                            product.reviews.map((review: any, idx: number) => (
                                <View key={review._id || idx} style={{ paddingHorizontal: 25, paddingVertical: 25, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>{review.user?.name?.[0] || 'U'}</Text>
                                            </View>
                                            <Text style={{ marginLeft: 12, fontWeight: "700", fontSize: 17 }}>{review.user?.name || 'Anonymous'}</Text>
                                        </View>
                                        <EllipsisVertical size={20} color="#BBB" />
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <Rating rating={review.rating} size={14} />
                                        <Text style={{ fontWeight: "900", fontSize: 19, marginTop: 10, color: '#1A1A1A' }}>{review.title}</Text>
                                        <Text style={{ marginTop: 8, fontSize: 15, color: '#555', lineHeight: 22 }}>{review.text}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
                                            <ThumbsUp size={16} color="#888" />
                                            <Text style={{ marginLeft: 8, color: '#888' }}>{review.likes}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginLeft: 15 }}>
                                            <ThumbsDown size={16} color="#888" />
                                            <Text style={{ marginLeft: 8, color: '#888' }}>{review.dislikes}</Text>
                                        </View>
                                        {review.isVerifiedPurchase && (
                                            <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                                                <BadgeCheck size={18} color="#4F9A42" />
                                                <Text style={{ marginLeft: 6, color: '#4F9A42', fontWeight: 'bold', fontSize: 12 }}>Verified Purchase</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <Text style={{ color: '#BBB' }}>No reviews yet.</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderColor: "#EEE",
                    paddingBottom: Platform.OS === 'ios' ? 25 : 5,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 10
                }}
            >
                <TouchableOpacity
                    onPress={() => handleAddToCart(false)}
                    style={{
                        flex: 1,
                        backgroundColor: "#FFF",
                        paddingVertical: 18,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 2,
                        borderColor: "#4F9A42",
                        marginRight: 10
                    }}
                >
                    <Text style={{ fontWeight: "900", fontSize: 18, color: '#4F9A42' }}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleAddToCart(true)}
                    style={{
                        flex: 1,
                        backgroundColor: "#4F9A42",
                        paddingVertical: 18,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "900", fontSize: 18 }}>
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Review Modal */}
            <Modal visible={showReviewModal} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, maxHeight: '80%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Write a Review</Text>
                            <TouchableOpacity onPress={() => setShowReviewModal(false)}>
                                <Check size={28} color="#4F9A42" />
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={{ marginBottom: 10, color: '#666' }}>Tap stars to rate</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <TouchableOpacity key={s} onPress={() => setReviewRating(s)}>
                                    <Star size={32} fill={s <= reviewRating ? "#FFD700" : "transparent"} color={s <= reviewRating ? "#FFD700" : "#CCC"} style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput 
                            placeholder="Review Title (e.g. Great Product!)"
                            style={{ backgroundColor: '#F5F5F5', borderRadius: 12, padding: 15, marginBottom: 15, fontSize: 16 }}
                            value={reviewTitle}
                            onChangeText={setReviewTitle}
                        />
                        <TextInput 
                            placeholder="Tell us more about your experience..."
                            multiline
                            numberOfLines={4}
                            style={{ backgroundColor: '#F5F5F5', borderRadius: 12, padding: 15, height: 120, fontSize: 16, textAlignVertical: 'top' }}
                            value={reviewText}
                            onChangeText={setReviewText}
                        />

                        <TouchableOpacity 
                            onPress={handleSubmitReview}
                            disabled={submitting}
                            style={{ backgroundColor: '#4F9A42', padding: 18, borderRadius: 15, marginTop: 25, alignItems: 'center' }}
                        >
                            {submitting ? <ActivityIndicator color="#FFF" /> : <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Submit Review</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Question Modal */}
            <Modal visible={showQuestionModal} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
                    <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ask a Question</Text>
                            <TouchableOpacity onPress={() => setShowQuestionModal(false)}>
                                <Check size={28} color="#4F9A42" />
                            </TouchableOpacity>
                        </View>

                        <TextInput 
                            placeholder="What do you want to know about this product?"
                            multiline
                            numberOfLines={4}
                            style={{ backgroundColor: '#F5F5F5', borderRadius: 12, padding: 15, height: 120, fontSize: 16, textAlignVertical: 'top' }}
                            value={questionText}
                            onChangeText={setQuestionText}
                        />

                        <TouchableOpacity 
                            onPress={handleSubmitQuestion}
                            disabled={submitting}
                            style={{ backgroundColor: '#4F9A42', padding: 18, borderRadius: 15, marginTop: 25, alignItems: 'center' }}
                        >
                            {submitting ? <ActivityIndicator color="#FFF" /> : <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>Send Question</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ProductScreen;
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Share2, Bookmark, Heart, ThumbsDown, ArrowRight } from "lucide-react-native";
import BlogContent from "../components/BlogContent";
import { articlesAPI } from "../api/articles";
import { getUploadUrl } from "../api/config";
import { useAuth } from "../context/AuthContext";

interface ArticleData {
    _id: string;
    title: string;
    category: string;
    author: {
        _id: string;
        name: string;
        avatar: string;
    };
    images: string[];
    content: string;
    hashtags: string[];
    likes: string[];
    dislikes: string[];
    bookmarks: string[];
    shares: number;
    createdAt: string;
}

function TopArticle({ navigation, route }: any) {
    const { articleId, article: passedArticle } = route.params || {};
    const { user } = useAuth();
    const [article, setArticle] = useState<ArticleData | null>(passedArticle || null);
    const [related, setRelated] = useState<ArticleData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            let targetId = articleId;

            if (!targetId) {
                // If no ID, get the top one
                const topRes = await articlesAPI.getTop();
                if (topRes.data.articles.length > 0) {
                    targetId = topRes.data.articles[0]._id;
                }
            }

            if (targetId) {
                const [articleRes, relatedRes] = await Promise.all([
                    articlesAPI.getById(targetId),
                    articlesAPI.getAll(1, 4) // Simplified related for now
                ]);
                setArticle(articleRes.data.article);
                setRelated(relatedRes.data.articles.filter((a: any) => a._id !== targetId).slice(0, 3));
            }
        } catch (err) {
            console.error("Error fetching article details:", err);
            // Don't alert if we already have passedArticle
            if (!passedArticle) {
                Alert.alert("Error", "Failed to load article details");
            }
        } finally {
            setLoading(false);
        }
    }, [articleId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleShare = async () => {
        if (!article) return;
        try {
            await Share.share({
                message: `${article.title}\n\nRead more on EcoSpace!`,
            });
            await articlesAPI.share(article._id);
        } catch (error) {
            console.error("Error sharing article:", error);
        }
    };

    const handleLike = async () => {
        if (!article) return;
        try {
            const res = await articlesAPI.like(article._id);
            setArticle({ ...article, likes: res.data.likes, dislikes: res.data.dislikes });
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleDislike = async () => {
        if (!article) return;
        try {
            const res = await articlesAPI.dislike(article._id);
            setArticle({ ...article, likes: res.data.likes, dislikes: res.data.dislikes });
        } catch (err) {
            console.error("Dislike error:", err);
        }
    };

    const handleBookmark = async () => {
        if (!article) return;
        try {
            const res = await articlesAPI.bookmark(article._id);
            setArticle({ ...article, bookmarks: res.data.bookmarks });
        } catch (err) {
            console.error("Bookmark error:", err);
        }
    };

    const getTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        const days = Math.floor(seconds / (24 * 3600));
        if (days === 0) return "Today";
        return `${days}d ago`;
    };

    if (loading && !article) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    if (!article) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Article not found</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#5584EE' }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const isLiked = (article.likes || []).includes(user?._id || "");
    const isDisliked = (article.dislikes || []).includes(user?._id || "");
    const isBookmarked = (article.bookmarks || []).includes(user?._id || "");

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 10, }} edges={['top', 'left', 'right']}>
            <View style={{ flexDirection: "column", marginHorizontal: 30 }}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ChevronLeft width={30} height={30} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={{ marginRight: 30 }} onPress={handleShare}>
                                <Share2 width={30} height={30} color="#444" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBookmark}>
                                <Bookmark width={30} height={30} color={isBookmarked ? "#2E7D32" : "#444"} fill={isBookmarked ? "#2E7D32" : "none"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 8, alignItems: "center" }}>
                    <View style={{ height: 150, width: 220, borderRadius: 30, alignItems: "center", justifyContent: "center", }}>
                        <View style={{ width: 80, height: 80 }}>
                            <Image source={{ uri: getUploadUrl(article.author?.avatar) }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 40, borderWidth: 3, borderColor: '#4F9A42' }} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: "600", fontSize: 20, letterSpacing: 1 }}>{article.author?.name || 'Anonymous'}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{
                            marginHorizontal: 20,
                            height: 36,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 50,
                            backgroundColor: "#5584EE",
                            width: 100,
                            marginBottom: 15
                        }}>
                            <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
                <View style={{ backgroundColor: "white", flex: 4, borderTopRightRadius: 60, borderTopLeftRadius: 60, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }}>
                    <View style={{
                        backgroundColor: "#D9D9D9",
                        width: 60,
                        height: 5,
                        marginTop: 15,
                        borderRadius: 5,
                        alignSelf: "center",
                    }} />
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20, }}>
                        <View style={{ flexDirection: "row", borderRadius: 30, alignItems: "center", padding: 8, paddingHorizontal: 15, backgroundColor: "#F2F2F2", }}>
                            <Text style={{ fontWeight: "700", fontSize: 14, color: "#4F9A42", textTransform: 'uppercase' }}>{article.category}</Text>
                        </View>
                        <View style={{ marginTop: 15, marginHorizontal: 25, alignItems: "center", justifyContent: "center", }}>
                            <Text style={{ fontWeight: "700", fontSize: 26, color: "#222", textAlign: "center", lineHeight: 32 }}>{article.title}</Text>
                            <View style={{ flexDirection: "row", marginTop: 12, alignItems: "center" }}>
                                <Text style={{ marginRight: 20, color: "#8B8B8B", fontWeight: '500' }}>Trending</Text>
                                <Text style={{ color: "#8B8B8B" }}>{getTimeAgo(article.createdAt)}</Text>
                            </View>
                        </View>
                    </View>
                    <BlogContent text={article.content} image={article.images?.[0] ? { uri: getUploadUrl(article.images[0]) } : undefined} />
                </View>
                <View style={{ flexDirection: "row", marginTop: 15, marginHorizontal: 30 }}>
                    <TouchableOpacity onPress={handleLike} style={{ marginRight: 15, padding: 12, borderRadius: 90, backgroundColor: isLiked ? "#E91E63" : "#5584EE" }}>
                        <Heart width={24} height={24} color={"#FFFFFF"} fill={isLiked ? "#FFFFFF" : "none"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDislike} style={{ padding: 12, borderRadius: 90, backgroundColor: isDisliked ? "#FB8C00" : "#5584EE", }}>
                        <ThumbsDown width={24} height={24} color={"#FFFFFF"} fill={isDisliked ? "#FFFFFF" : "none"} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15, marginHorizontal: 30, flexDirection: "row", flexWrap: "wrap" }}>
                    {article.hashtags.map((tag, idx) => (
                        <View key={idx} style={{ borderWidth: 1, paddingVertical: 8, paddingHorizontal: 15, marginRight: 10, marginBottom: 10, borderRadius: 20, borderColor: "#BDAE7D", backgroundColor: "#FFF8D6" }}>
                            <Text style={{ fontSize: 12, color: '#444', fontWeight: '500' }}>#{tag}</Text>
                        </View>
                    ))}
                </View>

                {related.length > 0 && (
                    <>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginHorizontal: 30 }}>
                            <Text style={{ color: "#4F9A42", fontWeight: "600", fontSize: 20, letterSpacing: 1 }}>You might also enjoy!</Text>
                        </View>
                        <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                            {related.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    onPress={() => navigation.push('TopArticle', { articleId: item._id })}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderColor: "#E0E0E0",
                                        paddingVertical: 12,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <Image
                                        source={{ uri: getUploadUrl(item.images[0]) }}
                                        style={{ width: 70, height: 70, borderRadius: 10 }}
                                        resizeMode="cover"
                                    />
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <Text style={{ fontWeight: "600", fontSize: 14, color: '#222' }}>{item.category}</Text>
                                        <Text numberOfLines={2} style={{ color: "#555", fontSize: 13, marginTop: 2 }}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default TopArticle;
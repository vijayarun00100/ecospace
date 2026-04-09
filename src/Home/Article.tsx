import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ImageBackground, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, Recycle } from "lucide-react-native";
import PostSearchBar from "../components/PostSearchBar";
import { articlesAPI, newsAPI } from "../api/articles";
import { getUploadUrl } from "../api/config";

interface ArticleData {
    _id: string;
    title: string;
    category: string;
    author: {
        name: string;
        avatar: string;
    };
    images: string[];
    content: string;
    createdAt: string;
}

interface NewsData {
    _id: string;
    title: string;
    content: string;
    image: string;
    category: string;
}

function Article({ navigation }: any) {
    const [topArticles, setTopArticles] = useState<ArticleData[]>([]);
    const [news, setNews] = useState<NewsData[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const [topRes, newsRes, allArticlesRes] = await Promise.all([
                articlesAPI.getTop(),
                newsAPI.getAll(),
                articlesAPI.getAll(1, 50)
            ]);
            setTopArticles(topRes.data.articles);
            setNews(newsRes.data.news);
            
            // Extract unique categories from articles
            const allCats = allArticlesRes.data.articles.map((a: ArticleData) => a.category);
            const uniqueCats = Array.from(new Set(allCats)) as string[];
            setCategories(uniqueCats.length > 0 ? uniqueCats : ["Plantation", "Solarize", "Recycle", "Sustain"]);

        } catch (err) {
            console.error("Error fetching articles data:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const getTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        const days = Math.floor(seconds / (24 * 3600));
        if (days === 0) return "Today";
        return `${days}d ago`;
    };

    if (loading && !refreshing) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PostSearchBar />
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
            >
                <View style={{ flexDirection: "column", marginHorizontal: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: "#4F9A42", fontWeight: "600", fontSize: 20, letterSpacing: 1 }}>Top Articles</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TopArticle')}
                            style={{ borderRadius: 30, backgroundColor: "#5584EE", alignItems: "center", justifyContent: "center", width: 30, height: 30 }}
                        >
                            <ArrowRight color={"white"} width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            {topArticles.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    onPress={() => navigation.navigate('TopArticle', { articleId: item._id })}
                                    style={{ marginRight: 15, backgroundColor: "#FFFFFF", width: 220, borderRadius: 20, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }}
                                >
                                    <Image
                                        source={{ uri: getUploadUrl(item.images[0]) }}
                                        style={{ width: "100%", height: 130 }}
                                        resizeMode="cover"
                                    />
                                    <View style={{ padding: 12 }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                                            <Image
                                                source={{ uri: getUploadUrl(item.author.avatar) }}
                                                style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
                                            />
                                            <View>
                                                <Text style={{ color: "black", fontWeight: "600", fontSize: 14 }}>{item.author.name}</Text>
                                                <Text style={{ color: "#999", fontSize: 11 }}>{getTimeAgo(item.createdAt)}</Text>
                                            </View>
                                        </View>
                                        <Text numberOfLines={2} style={{ color: "#444", fontSize: 13, lineHeight: 18 }}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>

                    <View style={{ flexDirection: "column", marginTop: 25 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                            <Text style={{ color: "#4F9A42", fontWeight: "600", fontSize: 20, letterSpacing: 2 }}>Explore</Text>
                            <TouchableOpacity style={{ borderRadius: 30, backgroundColor: "#5584EE", alignItems: "center", justifyContent: "center", width: 30, height: 30 }}>
                                <ArrowRight color={"white"} width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ marginTop: 15, flexDirection: "row", paddingBottom: 10 }}>
                                {categories.map((cat, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{ alignItems: "center", marginRight: 20 }}
                                        onPress={() => navigation.navigate('TopArticle', { category: cat })}
                                    >
                                        <View style={{ height: 70, width: 70, borderRadius: 35, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, marginBottom: 8 }}>
                                            <Recycle color="#4F9A42" size={30} />
                                        </View>
                                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#444' }}>{cat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                            <Text style={{ color: "#4F9A42", fontWeight: "600", fontSize: 20, letterSpacing: 2 }}>Latest News</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            {news.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderColor: "#E0E0E0",
                                        paddingVertical: 15,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <Image
                                        source={{ uri: getUploadUrl(item.image) }}
                                        style={{ width: 90, height: 90, borderRadius: 12 }}
                                        resizeMode="cover"
                                    />
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <Text style={{ fontWeight: "700", fontSize: 16, color: '#222', marginBottom: 5 }}>{item.category}</Text>
                                        <Text numberOfLines={1} style={{ fontWeight: "500", fontSize: 15, color: '#333', marginBottom: 3 }}>{item.title}</Text>
                                        <Text numberOfLines={2} style={{ color: "#666", fontSize: 13, lineHeight: 18 }}>{item.content}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Article;
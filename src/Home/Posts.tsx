import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Animated, Easing, ScrollView, ImageBackground, RefreshControl, Alert, ActivityIndicator, Share, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostSearchBar from "../components/PostSearchBar";
import LinearGradient from 'react-native-linear-gradient';
import { Truck, ThumbsUp, ThumbsDown, MessageCircleMore, Send, Bookmark, Heart } from 'lucide-react-native';
import CongratulationsModal from "../components/CongratulationsModal";
import { postsAPI } from "../api/posts";
import { dashboardAPI } from "../api/dashboard";
import { getUploadUrl } from "../api/config";
import { useAuth } from "../context/AuthContext";

const TipIcon = require("../assets/Tip.png");

interface PostData {
    _id: string;
    author: {
        _id: string;
        name: string;
        avatar: string;
    };
    images: string[];
    caption: string;
    likes: string[];
    dislikes: string[];
    comments: any[];
    bookmarks: string[];
    shares: number;
    hashtags: string[];
    createdAt: string;
}

interface DashboardData {
    postGoal: {
        current: number;
        target: number;
        progress: number;
    };
}

function Posts({ navigation }: any) {
    const { user } = useAuth();
    const [showCongrats, setShowCongrats] = useState(false);
    const [posts, setPosts] = useState<PostData[]>([]);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [tip, setTip] = useState<{ title: string; description: string } | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [activePostId, setActivePostId] = useState<string | null>(null);
    const [commentText, setCommentText] = useState("");

    const LIMIT = 50;
    const [expandedPosts, setExpandedPosts] = useState<{ [key: string]: boolean }>({});
    const progressAnim = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const [barWidth, setBarWidth] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            const [postsRes, dashboardRes, tipRes] = await Promise.all([
                postsAPI.getFeed(),
                dashboardAPI.get(),
                dashboardAPI.getTip()
            ]);
            setPosts(postsRes.data.posts);
            setDashboardData(dashboardRes.data);
            setTip(tipRes.data.tip);

            const progress = dashboardRes.data.postGoal.progress;
            Animated.parallel([
                Animated.timing(progressAnim, {
                    toValue: progress,
                    duration: 750,
                    useNativeDriver: false,
                }),
                Animated.timing(translateX, {
                    toValue: progress,
                    duration: 1000,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                })
            ]).start();

        } catch (err) {
            console.error("Error fetching posts data:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [progressAnim, translateX]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const toggleExpand = (postId: string) => {
        setExpandedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleLike = async (postId: string) => {
        try {
            const res = await postsAPI.like(postId);
            setPosts(prev => prev.map(p => {
                if (p._id !== postId) return p;
                let newLikes = [...(p.likes || [])];
                const userId = user?._id || "";
                if (res.data.isLiked && !newLikes.includes(userId)) newLikes.push(userId);
                else if (!res.data.isLiked) newLikes = newLikes.filter(id => id !== userId);
                
                let newDislikes = [...(p.dislikes || [])];
                if (res.data.isLiked) newDislikes = newDislikes.filter(id => id !== userId);

                return { ...p, likes: newLikes, dislikes: newDislikes };
            }));
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleDislike = async (postId: string) => {
        try {
            const res = await postsAPI.dislike(postId);
            setPosts(prev => prev.map(p => {
                if (p._id !== postId) return p;
                let newDislikes = [...(p.dislikes || [])];
                const userId = user?._id || "";
                if (res.data.isDisliked && !newDislikes.includes(userId)) newDislikes.push(userId);
                else if (!res.data.isDisliked) newDislikes = newDislikes.filter(id => id !== userId);
                
                let newLikes = [...(p.likes || [])];
                if (res.data.isDisliked) newLikes = newLikes.filter(id => id !== userId);

                return { ...p, dislikes: newDislikes, likes: newLikes };
            }));
        } catch (err) {
            console.error("Dislike error:", err);
        }
    };

    const handleBookmark = async (postId: string) => {
        try {
            const res = await postsAPI.bookmark(postId);
            setPosts(prev => prev.map(p => {
                if (p._id !== postId) return p;
                let newBookmarks = [...(p.bookmarks || [])];
                const userId = user?._id || "";
                if (res.data.isBookmarked && !newBookmarks.includes(userId)) newBookmarks.push(userId);
                else if (!res.data.isBookmarked) newBookmarks = newBookmarks.filter(id => id !== userId);

                return { ...p, bookmarks: newBookmarks };
            }));
            Alert.alert("Success", res.data.isBookmarked ? "Post bookmarked!" : "Bookmark removed!");
        } catch (err) {
            console.error("Bookmark error:", err);
        }
    };

    const handleShare = async (postId: string) => {
        try {
            const post = posts.find(p => p._id === postId);
            if (post) {
                await Share.share({
                    message: `Check out this post by ${post.author.name} on ecospace! ${post.caption}`
                });
            }
            const res = await postsAPI.share(postId);
            setPosts(prev => prev.map(p => p._id === postId ? { ...p, shares: res.data.shares } : p));
        } catch (err) {
            console.error("Share error:", err);
        }
    };

    const openComments = (postId: string) => {
        setActivePostId(postId);
        setCommentModalVisible(true);
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim() || !activePostId) return;
        try {
            const res = await postsAPI.comment(activePostId, commentText.trim());
            setPosts(prev => prev.map(p => p._id === activePostId ? { ...p, comments: res.data.comments } : p));
            setCommentText("");
        } catch (err) {
            console.error("Comment error:", err);
        }
    };

    const getTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return "just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
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
                <View>
                    {dashboardData && (
                        <TouchableOpacity
                            onPress={() => setShowCongrats(true)}
                            activeOpacity={0.9}
                            style={{
                                marginTop: 5,
                                borderRadius: 20,
                                height: 150,
                                margin: 20,
                                overflow: 'hidden',
                            }}>
                            <LinearGradient
                                colors={['#4E9EE9', '#4075EE']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={{ flex: 1, padding: 20 }}
                            >
                                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#FFD166', fontSize: 20, fontWeight: '700', marginBottom: 8 }}>
                                            Eco-friendly DIY products
                                        </Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 16, opacity: 0.9 }}>
                                            {dashboardData.postGoal.current < dashboardData.postGoal.target
                                                ? `Just ${dashboardData.postGoal.target - dashboardData.postGoal.current} more to complete your goal`
                                                : "Goal completed! Keep it up!"}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>Posts</Text>
                                        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '400' }}>
                                            {dashboardData.postGoal.current}/{dashboardData.postGoal.target}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
                                    style={{
                                        height: 10,
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        borderRadius: 5,
                                        marginTop: "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Animated.View
                                        style={{
                                            width: progressAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, barWidth],
                                            }),
                                            height: "100%",
                                            backgroundColor: "#FFF",
                                            borderRadius: 5,
                                            position: "absolute",
                                        }}
                                    />
                                    <Animated.View
                                        style={{
                                            position: "absolute",
                                            transform: [
                                                {
                                                    translateX: translateX.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [0, barWidth - 20],
                                                    }),
                                                },
                                            ],
                                        }}
                                    >
                                        <Truck color="#008000" size={45} />
                                    </Animated.View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}

                    {tip && (
                        <View style={{ borderWidth: 2, borderColor: "#4F9A42", marginHorizontal: 20, minHeight: 120, borderRadius: 20, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: 15 }}>
                            <View>
                                <Image source={TipIcon} style={{ width: 60, height: 60, borderRadius: 10 }} resizeMode="contain" />
                            </View>
                            <View style={{ flexDirection: "column", marginLeft: 20, flex: 1 }}>
                                <Text style={{ color: "#4F9A42", fontWeight: "600", fontSize: 22 }}>Tip of the day !</Text>
                                <Text style={{ fontWeight: '700', marginTop: 5 }}>{tip.title}</Text>
                                <Text style={{ fontSize: 13, color: '#444' }}>{tip.description}</Text>
                            </View>
                        </View>
                    )}

                    {posts.map((post) => {
                        const isLiked = post.likes && post.likes.includes(user?._id || "");
                        const isDisliked = post.dislikes && post.dislikes.includes(user?._id || "");
                        const isBookmarked = post.bookmarks && post.bookmarks.includes(user?._id || "");
                        const isExpanded = expandedPosts[post._id];

                        return (
                            <View key={post._id} style={{ marginHorizontal: 20, marginTop: 25, flexDirection: "column" }}>
                                <View style={{ width: "100%", height: 400 }}>
                                    <ImageBackground
                                        source={{ uri: getUploadUrl(post.images[0]) }}
                                        resizeMode="cover"
                                        imageStyle={{ borderRadius: 20 }}
                                        style={{ width: "100%", height: "100%" }}
                                    >
                                        <LinearGradient
                                            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.7)']}
                                            style={{ flex: 1, borderRadius: 20, justifyContent: 'space-between', padding: 15 }}
                                        >
                                            <TouchableOpacity 
                                                onPress={() => navigation.navigate('Profile', { userId: post.author._id })}
                                                style={{ flexDirection: "row", alignItems: "center" }}
                                            >
                                                <Image
                                                    source={{ uri: getUploadUrl(post.author.avatar) }}
                                                    style={{ width: 45, height: 45, borderRadius: 25, borderWidth: 2, borderColor: 'white' }}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>{post.author.name}</Text>
                                                    <Text style={{ color: "#DEDEDE", fontSize: 12 }}>{getTimeAgo(post.createdAt)}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </ImageBackground>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => handleLike(post._id)}
                                            style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}
                                        >
                                            <Heart size={28} color={isLiked ? "#E91E63" : "#444"} fill={isLiked ? "#E91E63" : "none"} />
                                            <Text style={{ marginLeft: 5, fontWeight: '600' }}>{post.likes.length}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleDislike(post._id)}
                                            style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}
                                        >
                                            <ThumbsDown size={28} color={isDisliked ? "#FB8C00" : "#444"} fill={isDisliked ? "#FB8C00" : "none"} />
                                            <Text style={{ marginLeft: 5, fontWeight: '600' }}>{post.dislikes ? post.dislikes.length : 0}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => openComments(post._id)} style={{ flexDirection: "row", alignItems: "center", marginRight: 15 }}>
                                            <MessageCircleMore size={28} color="#444" />
                                            <Text style={{ marginLeft: 5, fontWeight: '600' }}>{post.comments ? post.comments.length : 0}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleShare(post._id)}
                                            style={{ flexDirection: "row", alignItems: "center" }}
                                        >
                                            <Send size={28} color="#444" />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => handleBookmark(post._id)}>
                                        <Bookmark size={28} color={isBookmarked ? "#2E7D32" : "#444"} fill={isBookmarked ? "#2E7D32" : "none"} />
                                    </TouchableOpacity>
                                </View>

                                {post.likes && post.likes.length > 0 && (
                                    <View style={{ marginTop: 8 }}>
                                        <Text style={{ fontWeight: '600', fontSize: 13 }}>
                                            Liked by {post.likes.length} others
                                        </Text>
                                    </View>
                                )}

                                <View style={{ marginTop: 5 }}>
                                    <Text style={{ fontSize: 14, color: "#222", lineHeight: 20 }}>
                                        <Text style={{ fontWeight: '700' }}>{post.author.name} </Text>
                                        {isExpanded ? post.caption : post.caption.slice(0, LIMIT)}
                                        {post.caption.length > LIMIT && (
                                            <Text onPress={() => toggleExpand(post._id)} style={{ color: "green", fontWeight: "600" }}>
                                                {isExpanded ? " less" : "...more"}
                                            </Text>
                                        )}
                                    </Text>
                                    {post.hashtags.length > 0 && (
                                        <Text style={{ color: '#0066CC', marginTop: 3 }}>
                                            {post.hashtags.map(h => `#${h} `)}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <CongratulationsModal
                isVisible={showCongrats}
                onClose={() => setShowCongrats(false)}
                onCollect={() => setShowCongrats(false)}
            />

            {/* Comments Modal */}
            <Modal visible={commentModalVisible} animationType="slide" transparent={true}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} activeOpacity={1} onPress={() => setCommentModalVisible(false)} />
                    <View style={{ height: "60%", backgroundColor: "#FFF", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Comments</Text>
                            <TouchableOpacity onPress={() => setCommentModalVisible(false)}>
                                <Text style={{ color: "#888", fontSize: 16 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            {activePostId && posts.find(p => p._id === activePostId)?.comments?.map((c, i) => (
                                <View key={i} style={{ flexDirection: "row", marginBottom: 15 }}>
                                    <Image source={{ uri: c.user?.avatar ? getUploadUrl(c.user.avatar) : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=40' }} style={{ width: 35, height: 35, borderRadius: 17.5 }} />
                                    <View style={{ marginLeft: 10, backgroundColor: "#F0F0F0", padding: 10, borderRadius: 15, flex: 1 }}>
                                        <Text style={{ fontWeight: "700" }}>{c.user?.name || "User"}</Text>
                                        <Text style={{ marginTop: 2 }}>{c.text}</Text>
                                    </View>
                                </View>
                            ))}
                            {activePostId && posts.find(p => p._id === activePostId)?.comments?.length === 0 && (
                                <Text style={{ textAlign: "center", color: "#888", marginTop: 20 }}>No comments yet. Be the first to comment!</Text>
                            )}
                        </ScrollView>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, borderTopWidth: 1, borderColor: "#EEE", paddingTop: 10 }}>
                            <TextInput
                                value={commentText}
                                onChangeText={setCommentText}
                                placeholder="Add a comment..."
                                style={{ flex: 1, backgroundColor: "#F0F0F0", borderRadius: 20, paddingHorizontal: 15, height: 40 }}
                            />
                            <TouchableOpacity onPress={handleCommentSubmit} style={{ marginLeft: 10, backgroundColor: "#4F9A42", borderRadius: 20, paddingHorizontal: 15, height: 40, justifyContent: "center" }}>
                                <Text style={{ color: "#FFF", fontWeight: "600" }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

export default Posts;
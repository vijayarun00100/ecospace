import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Share,
    ImageBackground,
    Alert
} from "react-native";
import Toast from 'react-native-toast-message';

import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Heart, ThumbsDown, MessageCircleMore, Send, Bookmark } from 'lucide-react-native';
import { postsAPI } from "../api/posts";
import { getUploadUrl } from "../api/config";
import { useAuth } from "../context/AuthContext";
import LinearGradient from 'react-native-linear-gradient';

const PostDetail = ({ route, navigation }: any) => {
    const { postId } = route.params;
    const { user } = useAuth();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");

    const fetchPost = useCallback(async () => {
        try {
            const res = await postsAPI.getById(postId);
            setPost(res.data.post);
        } catch (err) {
            console.error("Fetch post detail error:", err);
            Toast.show({
                type: 'error',
                text1: 'Post Error',
                text2: 'Could not load post details.'
            });
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleLike = async () => {
        try {
            const res = await postsAPI.like(postId);
            setPost((prev: any) => {
                let newLikes = [...(prev.likes || [])];
                const userId = user?._id || "";
                if (res.data.isLiked && !newLikes.includes(userId)) newLikes.push(userId);
                else if (!res.data.isLiked) newLikes = newLikes.filter(id => id !== userId);

                let newDislikes = [...(prev.dislikes || [])];
                if (res.data.isLiked) newDislikes = newDislikes.filter(id => id !== userId);

                return { ...prev, likes: newLikes, dislikes: newDislikes };
            });
        } catch (err) {
            console.error("Like error:", err);
        }
    };

    const handleDislike = async () => {
        try {
            const res = await postsAPI.dislike(postId);
            setPost((prev: any) => {
                let newDislikes = [...(prev.dislikes || [])];
                const userId = user?._id || "";
                if (res.data.isDisliked && !newDislikes.includes(userId)) newDislikes.push(userId);
                else if (!res.data.isDisliked) newDislikes = newDislikes.filter(id => id !== userId);

                let newLikes = [...(prev.likes || [])];
                if (res.data.isDisliked) newLikes = newLikes.filter(id => id !== userId);

                return { ...prev, dislikes: newDislikes, likes: newLikes };
            });
        } catch (err) {
            console.error("Dislike error:", err);
        }
    };

    const handleBookmark = async () => {
        try {
            const res = await postsAPI.bookmark(postId);
            setPost((prev: any) => {
                let newBookmarks = [...(prev.bookmarks || [])];
                const userId = user?._id || "";
                if (res.data.isBookmarked && !newBookmarks.includes(userId)) newBookmarks.push(userId);
                else if (!res.data.isBookmarked) newBookmarks = newBookmarks.filter(id => id !== userId);

                return { ...prev, bookmarks: newBookmarks };
            });
            Toast.show({
                type: 'success',
                text1: 'Saved',
                text2: res.data.isBookmarked ? 'Added to your bookmarks' : 'Removed from bookmarks',
                position: 'bottom'
            });
        } catch (err) {
            console.error("Bookmark error:", err);
        }
    };

    const handleShare = async () => {
        try {
            if (post) {
                await Share.share({
                    message: `Check out this post by ${post.author.name} on EcoSpace! ${post.caption}`
                });
                const res = await postsAPI.share(postId);
                setPost((prev: any) => ({ ...prev, shares: res.data.shares }));
            }
        } catch (err) {
            console.error("Share error:", err);
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        try {
            const res = await postsAPI.comment(postId, commentText.trim());
            setPost((prev: any) => ({ ...prev, comments: res.data.comments }));
            setCommentText("");
        } catch (err) {
            console.error("Comment error:", err);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4F9A42" />
            </View>
        );
    }

    if (!post) return null;

    const isLiked = post.likes?.includes(user?._id || "");
    const isDisliked = post.dislikes?.includes(user?._id || "");
    const isBookmarked = post.bookmarks?.includes(user?._id || "");

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft color="#141414" size={28} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Post</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Post Content */}
                    <View style={styles.postCard}>
                        <View style={styles.postMedia}>
                            <ImageBackground
                                source={{ uri: getUploadUrl(post.images[0]) }}
                                style={styles.postImage}
                                imageStyle={{ borderRadius: 20 }}
                            >
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.6)']}
                                    style={styles.gradientOverlay}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Profile', { userId: post.author._id })}
                                        style={styles.authorInfo}
                                    >
                                        <Image
                                            source={{ uri: getUploadUrl(post.author.avatar) }}
                                            style={styles.authorAvatar}
                                        />
                                        <View style={styles.authorText}>
                                            <Text style={styles.authorName}>{post.author.name}</Text>
                                            <Text style={styles.postTime}>
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>
                            </ImageBackground>
                        </View>

                        <View style={styles.actionsBar}>
                            <View style={styles.leftActions}>
                                <TouchableOpacity onPress={handleLike} style={styles.actionItem}>
                                    <Heart size={28} color={isLiked ? "#E91E63" : "#444"} fill={isLiked ? "#E91E63" : "none"} />
                                    <Text style={styles.actionCount}>{post.likes?.length || 0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDislike} style={styles.actionItem}>
                                    <ThumbsDown size={28} color={isDisliked ? "#FB8C00" : "#444"} fill={isDisliked ? "#FB8C00" : "none"} />
                                    <Text style={styles.actionCount}>{post.dislikes?.length || 0}</Text>
                                </TouchableOpacity>
                                <View style={styles.actionItem}>
                                    <MessageCircleMore size={28} color="#444" />
                                    <Text style={styles.actionCount}>{post.comments?.length || 0}</Text>
                                </View>
                                <TouchableOpacity onPress={handleShare} style={styles.actionItem}>
                                    <Send size={28} color="#444" />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={handleBookmark}>
                                <Bookmark size={28} color={isBookmarked ? "#2E7D32" : "#444"} fill={isBookmarked ? "#2E7D32" : "none"} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.captionContainer}>
                            <Text style={styles.captionText}>
                                <Text style={styles.captionAuthor}>{post.author.name} </Text>
                                {post.caption}
                            </Text>
                            {post.hashtags?.length > 0 && (
                                <Text style={styles.hashtags}>
                                    {post.hashtags.map((h: string) => `#${h} `)}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Comments Section */}
                    <View style={styles.commentsSection}>
                        <Text style={styles.sectionTitle}>Comments</Text>
                        {post.comments?.map((comment: any, index: number) => (
                            <View key={index} style={styles.commentItem}>
                                <Image
                                    source={{ uri: comment.user?.avatar ? getUploadUrl(comment.user.avatar) : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=40' }}
                                    style={styles.commentAvatar}
                                />
                                <View style={styles.commentBubble}>
                                    <Text style={styles.commentUser}>{comment.user?.name || "User"}</Text>
                                    <Text style={styles.commentText}>{comment.text}</Text>
                                </View>
                            </View>
                        ))}
                        {post.comments?.length === 0 && (
                            <Text style={styles.noComments}>No comments yet.</Text>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={commentText}
                        onChangeText={setCommentText}
                        placeholder="Add a comment..."
                        style={styles.commentInput}
                        placeholderTextColor={"black"}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleCommentSubmit}
                        style={styles.postButton}
                        disabled={!commentText.trim()}
                    >
                        <Text style={styles.postButtonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBE6',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFBE6'
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        height: 60,
        backgroundColor: '#FFFBE6',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#141414",
    },
    backButton: {
        padding: 5,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    postCard: {
        backgroundColor: "#FFF",
        marginHorizontal: 15,
        borderRadius: 25,
        padding: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    postMedia: {
        width: "100%",
        height: 400,
        borderRadius: 20,
        overflow: "hidden",
    },
    postImage: {
        width: "100%",
        height: "100%",
    },
    gradientOverlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
    },
    authorInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    authorAvatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
    },
    authorText: {
        marginLeft: 10,
    },
    authorName: {
        color: "white",
        fontWeight: "600",
        fontSize: 18,
    },
    postTime: {
        color: "#DEDEDE",
        fontSize: 12,
    },
    actionsBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
        paddingHorizontal: 5,
    },
    leftActions: {
        flexDirection: "row",
        alignItems: 'center',
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    actionCount: {
        marginLeft: 6,
        fontWeight: '600',
        color: "#444",
    },
    captionContainer: {
        marginTop: 15,
        paddingHorizontal: 5,
    },
    captionText: {
        fontSize: 15,
        color: "#222",
        lineHeight: 22,
    },
    captionAuthor: {
        fontWeight: '700',
    },
    hashtags: {
        color: '#0066CC',
        marginTop: 5,
        fontSize: 14,
    },
    commentsSection: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#141414",
        marginBottom: 15,
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 15,
    },
    commentAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    commentBubble: {
        marginLeft: 12,
        backgroundColor: "#F0F0F0",
        padding: 12,
        borderRadius: 18,
        flex: 1,
    },
    commentUser: {
        fontWeight: "700",
        fontSize: 14,
        color: "#141414",
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },
    noComments: {
        textAlign: "center",
        color: "#888",
        marginTop: 10,
        fontStyle: "italic",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    commentInput: {
        flex: 1,
        backgroundColor: "#F0F0F0",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        maxHeight: 100,
        fontSize: 14,
    },
    postButton: {
        marginLeft: 12,
        backgroundColor: "#4F9A42",
        borderRadius: 25,
        paddingHorizontal: 20,
        height: 45,
        justifyContent: "center",
    },
    postButtonText: {
        color: "#FFF",
        fontWeight: "700",
    },
});

export default PostDetail;

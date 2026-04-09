import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, ChevronLeft  , ChevronRight , MapPin , UserRound , Settings, Eye} from "lucide-react-native";
import { postsAPI } from "../api/posts";

function NewPostDetails({ navigation, route }: any) {
    const { selectedImage, selectedImages, isMultiSelect } = route?.params || {};
    const Dp = require("../assets/Hari.png");

    const [text, setText] = useState("");
    const [hashtags, setHashTags] = useState<string[]>([]);
    const [hashtagInput, setHashTagInput] = useState("");

    const extract = (input: string) => {
        return input
            .split("#")
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
    };

    const handleHastagChange = (value: string) => {
        setHashTagInput(value);
        const tags = [...new Set(extract(value))];
        setHashTags(tags);
    };

    const handlePublish = async () => {
        try {
            const formData = new FormData();
            formData.append("caption", text);
            formData.append("hashtags", JSON.stringify(hashtags));
            
            const imagesToUpload = isMultiSelect && selectedImages?.length > 0
                ? selectedImages
                : (selectedImage ? [selectedImage] : []);

            imagesToUpload.forEach((img: any, index: number) => {
                formData.append("images", {
                    uri: img.uri,
                    type: "image/jpeg",
                    name: `image_${index}.jpg`,
                } as any);
            });

            await postsAPI.create(formData);
            navigation.navigate("MainTabs");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 30,
                        paddingBottom: 120
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                        <ChevronLeft width={24} height={24} style={{ marginRight: 20 }} />
                        <Text style={{ fontSize: 22, fontWeight: "600" }}>
                            New post
                        </Text>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        <Image
                            source={isMultiSelect && selectedImages?.length > 0 ? { uri: selectedImages[0].uri } : selectedImage ? { uri: selectedImage.uri } : Dp}
                            resizeMode="cover"
                            style={{ width: "100%", height: 400 }}
                        />
                    </View>

                    <View style={{ borderBottomWidth: 2, borderColor: "#6D6D6D", marginTop: 10 }}>
                        <TextInput
                            placeholder="Add a caption"
                            placeholderTextColor="#6D6D6D"
                            value={text}
                            onChangeText={setText}
                            style={{ color: "#000", fontSize: 16, paddingVertical: 8 }}
                        />
                    </View>

                    <View style={{ marginTop: 50 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            # Hashtags
                        </Text>

                        <View style={{ borderBottomWidth: 2, marginTop:25, borderColor: "#6D6D6D" }}>
                            <TextInput
                                placeholder="Enter #tags"
                                placeholderTextColor="#6D6D6D"
                                value={hashtagInput}
                                onChangeText={handleHastagChange}
                                style={{ color: "#000", fontSize: 14, paddingVertical: 8 }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                            {hashtags.map((tag, index) => (
                                <View
                                    key={index}
                                    style={{
                                        backgroundColor: "#FFF8D6",
                                        padding: 7,
                                        margin: 7,
                                        borderRadius: 8,
                                        borderColor: "#D5CBAC",
                                        borderWidth: 2,
                                        flexDirection: "row",
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ marginRight: 8, color: "#313131" }}>
                                        #{tag}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() =>
                                            setHashTags(prev =>
                                                prev.filter((_, i) => i !== index)
                                            )
                                        }
                                    >
                                        <X width={18} height={18} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{ marginTop: 40, flexDirection: "column", }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MapPin width={30} height={30} style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: 500, fontSize: 20 }}>Add Location</Text>
                            </View>
                            <ChevronRight />
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                            <View style={{ backgroundColor: "#FFF8D6", padding: 7, margin: 7, borderRadius: 8, borderColor: "#D5CBAC", borderWidth: 2, flexDirection: "row" }}>
                                <Text style={{ marginRight: 8, color: "#313131" }}>
                                    Chennai
                                </Text>
                                <X width={20} height={20} />
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <UserRound style={{ marginRight: 20 }} width={30} height={30} />
                                    <Text style={{ fontWeight: 400, fontSize: 18 }}>Audience Visibility</Text>
                                </View>
                                <View>
                                    <ChevronRight width={30} height={30} />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Settings style={{ marginRight: 20 }} width={30} height={30} />
                                    <Text style={{ fontWeight: 400, fontSize: 18 }}>Adavanced Settings</Text>
                                </View>
                                <View>
                                    <ChevronRight width={30} height={30} />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 40, alignItems: "center", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Eye style={{ marginRight: 20 }} width={30} height={30} />
                                    <Text style={{ fontWeight: 400, fontSize: 18 }}>Preview</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        right: 20,
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 50,
                        backgroundColor: "#5584EE"
                    }}
                >
                    <TouchableOpacity onPress={handlePublish} style={{ width: "100%", alignItems: "center" }}>
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "500",
                                letterSpacing: 2,
                                fontSize: 18
                            }}
                        >
                            Publish
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default NewPostDetails;
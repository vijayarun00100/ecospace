import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, X, Clock3, CalendarCheck } from "lucide-react-native";

import InputCard from "../components/InputCard";
import AddContentCard from "../components/AddContentCard";
import AddImage from "../components/AddImage";
import DropdownSelector from "../components/DropDownMenu";

function NewArticle() {
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [selection, setSelection] = useState("");
    const [blogText, setBlogText] = useState("");
    const [category, setCategory] = useState("DIY Tips");
    const [hashtags, setHashTags] = useState<string[]>([]);
    const [hashtagInput, setHashTagInput] = useState("");

    const options = [
        "DIY Tips",
        "Health",
        "Education",
        "Technology",
        "Travel"
    ];

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

    const handlePublish = () => {
        const data = {
            title,
            category,
            contentType: selection,
            blogText,
            hashtags,
            images
        };

        console.log("Publishing:", data);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    style={{ marginHorizontal: 30 }}
                    contentContainerStyle={{ paddingBottom: 120 }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                        <ChevronLeft width={24} height={24} style={{ marginRight: 20 }} />
                        <Text style={{ fontSize: 22, fontWeight: "600" }}>
                            New Article
                        </Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <InputCard
                            title="Title:"
                            placeholder='e.g., "10 Simple Steps to Reduce Waste at Home."'
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                            inputHeight={60}
                        />
                    </View>

                    <View style={{ marginTop: 20 , flexDirection:"row" , alignItems:"flex-start" }}>
                        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 , marginRight:20 }}>
                            Category:
                        </Text>

                        <View style={{ }}>
                            <DropdownSelector
                                options={options}
                                selected={category}
                                onSelect={setCategory}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <AddContentCard
                            title="Add Content:"
                            onTouch={setSelection}
                        />

                        {selection === "Text" && (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: "600" }}>
                                    Leave 2 spaces & start for a new paragraph !!
                                </Text>

                                <View style={{ borderWidth: 1.5, borderColor: "#BDAE7D", borderRadius: 8 }}>
                                    <TextInput
                                        placeholder="Enter blog"
                                        placeholderTextColor="#A9A9A9"
                                        value={blogText}
                                        onChangeText={setBlogText}
                                        multiline
                                        style={{
                                            height: 160,
                                            padding: 10,
                                            textAlignVertical: "top",
                                            fontSize: 17
                                        }}
                                    />
                                </View>
                            </View>
                        )}

                        {selection === "Photos" && (
                            <View style={{ marginTop: 20 }}>
                                <AddImage />
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: 50 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            # Hashtags
                        </Text>

                        <View style={{ borderBottomWidth: 2, marginTop: 25, borderColor: "#6D6D6D" }}>
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

                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "row", borderBottomWidth: 2, padding: 10  ,  alignItems:"center"}}>
                            <Clock3 color = {"green"} style={{ marginRight: 20,}} />
                            <Text>Reading Time:</Text>
                        </View>

                        <View style={{ flexDirection: "row", borderBottomWidth: 2, padding: 10 , alignItems:"center" }}>
                            <CalendarCheck color = {"green"} style={{ marginRight: 20}} />
                            <Text>Schedule Publish</Text>
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity
                    onPress={handlePublish}
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default NewArticle;
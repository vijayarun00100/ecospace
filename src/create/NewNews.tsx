import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    PermissionsAndroid,
    Platform,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, X, Eye, CalendarCheck, ChevronRight, MapPin, FileUp } from "lucide-react-native";
import { newsAPI } from "../api/articles";
import { Linking } from "react-native";
import InputCard from "../components/InputCard";
import AddContentCard from "../components/AddContentCard";
import AddImage from "../components/AddImage";
import DropdownSelector from "../components/DropDownMenu";
import ImagePicker from "react-native-image-crop-picker";
type ContentType = "Text" | "Photos" | "";

function NewNews() {
    const [title, setTitle] = useState("");
    const [sourceLink, setSourceLink] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [selection, setSelection] = useState<ContentType>("");
    const [blogText, setBlogText] = useState("");
    const [category, setCategory] = useState("DIY Tips");
    const [hashtags, setHashTags] = useState<string[]>([]);
    const [hashtagInput, setHashTagInput] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [scheduledAt, setScheduledAt] = useState("");
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

    const handlePublish = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("content", blogText);
            formData.append("sourceLink", sourceLink);
            if (scheduledAt) formData.append("scheduledAt", scheduledAt);
            if (imageUri) {
                formData.append("image", { uri: imageUri, type: "image/jpeg", name: "cover.jpg" } as any);
            }

            await newsAPI.create(formData);
            Alert.alert("Success", "News Published!");
        } catch (error) {
            console.log(error);
        }
    };

    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                if (Platform.Version >= 33) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                } else {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                    );
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const InsertImage = async () => {
        try {
            console.log("Step 1: Opening picker...");
            const image = await ImagePicker.openPicker({
                cropping: false,
                compressImageQuality: 0.7,
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
            });

            console.log("Step 2: Image picked:", JSON.stringify(image));
            console.log("Step 3: image.path =", image.path);

            const filePath = image.path.startsWith("file://")
                ? image.path
                : `file://${image.path}`;

            console.log("Step 4: filePath =", filePath);

            const cropped_image = await ImagePicker.openCropper({
                path: filePath,
                freeStyleCropEnabled: true,
                compressImageQuality: 0.7,
            });

            console.log("Step 5: Cropped image:", JSON.stringify(cropped_image));
            setImageUri(cropped_image.path);

        } catch (error) {
            console.log("CRASH ERROR:", error);
            console.log("ERROR MESSAGE:", error?.message);
            console.log("ERROR CODE:", error?.code);
        }
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
                            New News
                        </Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <InputCard
                            title="Headline:"
                            placeholder='e.g., "Breaking News..."'
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                            inputHeight={60}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 , marginBottom: 10 , marginRight:20 }}>
                            Category:
                        </Text>

                        <View style={{ zIndex: 10 }}>
                            <DropdownSelector
                                options={options}
                                selected={category}
                                onSelect={setCategory}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <AddContentCard
                            title="News Content:"
                            onTouch={setSelection}
                        />

                        {selection === "Text" && (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ marginBottom: 10, fontSize: 15, fontWeight: "600" }}>
                                    Leave 2 spaces & start for a new paragraph !!
                                </Text>

                                <View style={{ borderWidth: 1.5, borderColor: "#BDAE7D", borderRadius: 8 }}>
                                    <TextInput
                                        placeholder="Enter news content"
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

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            Source Link:
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>

                            <TextInput
                                placeholder="Type or paste a URL"
                                placeholderTextColor={"black"}
                                value={sourceLink}
                                onChangeText={setSourceLink}
                                style={{
                                    flex: 1,
                                    height: 50,
                                    borderWidth: 1.5,
                                    borderColor: "#BDAE7D",
                                    borderRadius: 10,
                                    paddingHorizontal: 10
                                }}
                            />

                            <TouchableOpacity
                                style={{
                                    marginLeft: 10,
                                    height: 50,
                                    paddingHorizontal: 15,
                                    borderRadius: 10,
                                    borderColor: "#5584EE",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 2
                                }}
                            >
                                <Text style={{ fontWeight: "600" }}>
                                    Check
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ marginTop: 20, height: imageUri ? 400 : "auto", marginBottom: 20 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>Cover Image:</Text>
                        </View>
                        {imageUri && <TouchableOpacity onPress={() => setImageUri(null)}><X /></TouchableOpacity>}
                        {imageUri ? (
                            <View style={{ marginBottom: 30 }}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={{ width: "100%", height: "100%", }}
                                    resizeMode="cover"
                                />
                            </View>
                        ) : (
                            <View style={{
                                height: 200, marginTop: 10,
                                marginBottom: 10, borderWidth: 1,
                                borderStyle: 'dashed', borderColor: '#BDAE7D',
                                backgroundColor: '#F0ECE1', justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <FileUp />
                                <Text>Drag and drop the file or</Text>

                                <TouchableOpacity onPress={InsertImage}>
                                    <Text>Select Files</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MapPin width={30} height={30} style={{ marginRight: 20 }} />
                                <Text style={{ fontWeight: "500", fontSize: 20 }}>Add Location</Text>
                            </View>
                            <ChevronRight />
                        </View>

                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
                            <View style={{
                                backgroundColor: "#FFF8D6",
                                padding: 7,
                                margin: 7,
                                borderRadius: 8,
                                borderColor: "#D5CBAC",
                                borderWidth: 2,
                                flexDirection: "row"
                            }}>
                                <Text style={{ marginRight: 8, color: "#313131" }}>
                                    Chennai
                                </Text>
                                <X width={20} height={20} />
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
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
                        <View style={{ flexDirection: "row", borderBottomWidth: 2, padding: 10, alignItems: "center" }}>
                            <Eye color="green" style={{ marginRight: 20 }} />
                            <Text>Preview</Text>
                        </View>

                        <View style={{ flexDirection: "row", borderBottomWidth: 2, padding: 10, alignItems: "center" }}>
                            <CalendarCheck color="green" style={{ marginRight: 20 }} />
                            <Text>Schedule Publish</Text>
                            <TextInput value={scheduledAt} onChangeText={setScheduledAt} placeholder="YYYY-MM-DD HH:mm (Optional)" style={{ marginLeft: 10, flex: 1, padding: 0 }} />
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

export default NewNews;
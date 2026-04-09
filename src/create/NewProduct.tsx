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
    Alert,
    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, X, Eye, CalendarCheck, Camera, ChevronRight, MapPin, FileUp } from "lucide-react-native";
import { Linking } from "react-native";
import InputCard from "../components/InputCard";
import AddContentCard from "../components/AddContentCard";
import AddImage from "../components/AddImage";
import DropdownSelector from "../components/DropDownMenu";
import ImagePicker from "react-native-image-crop-picker";
import Carbon_save from "../assets/Carbon_save.svg";
import Plastic_save from "../assets/Plastic_Save.svg";
import Quantity from "../components/Qantity";
import { productsAPI } from "../api/products";



import OEKOTEX from "../assets/OEKO-TEX.svg";
import B_Corporation from "../assets/B_Corporation.svg";
import ECOCERT from "../assets/ECOCERT.svg";
import BPI_Compostable from "../assets/BPI_Compostable.svg";
import Climate_Neutral from "../assets/Climate_Neutral.svg";
import Energy_Star from "../assets/Energy_Star.svg";
import RoHS_Compliant from "../assets/RoHS_Compliant.svg";
import OMRI from "../assets/OMRI.svg";
import COSMOS from "../assets/COSMOS.svg";
import ASTM from "../assets/ASTM.svg";
import FSC from "../assets/FSC.svg";


type ContentType = "Text" | "Photos" | "";

function NewProduct({ navigation }: any) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [benefits, setBenefits] = useState("");
    const [sourceLink, setSourceLink] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [selection, setSelection] = useState(null);
    const [blogText, setBlogText] = useState("");
    const [category, setCategory] = useState("DIY Tips");
    const [hashtags, setHashTags] = useState<string[]>([]);
    const [hashtagInput, setHashTagInput] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [carbonSave, setCarbonSave] = useState("");
    const [plasticSave, setPlasticSave] = useState("");
    const [price, setPrice] = useState("");
    const [scheduleAt, setScheduleAt] = useState("");
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [quantities, setQuantities] = useState<string[]>([]);

    const toggleInterest = (item: string) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    };
    const options = [
        "DIY Tips",
        "Health",
        "Education",
        "Technology",
        "Travel"
    ];

    const list = ["OEKO-TEX", "B Corporation", "ECOCERT", "BPI Compostable", "Climate Neutral", "Energy Star",
        "RoHS Compliant", "OMRI", "COSMOS", "ASTM", "FSC"];
    const icons: any = {
        "OEKO-TEX": OEKOTEX,
        "B Corporation": B_Corporation,
        "ECOCERT": ECOCERT,
        "BPI Compostable": BPI_Compostable,
        "Climate Neutral": Climate_Neutral,
        "Energy Star": Energy_Star,
        "RoHS Compliant": RoHS_Compliant,
        "OMRI": OMRI,
        "COSMOS": COSMOS,
        "ASTM": ASTM,
        "FSC": FSC
    };
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
        if (!title.trim()) {
            Alert.alert("Missing Info", "Please enter a product name.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", title);
            formData.append("description", description);
            formData.append("benefits", JSON.stringify(benefits.split("\n")));
            formData.append("sourceLink", sourceLink);
            formData.append("category", category);
            formData.append("carbonSaved", carbonSave || "0g");
            formData.append("plasticSaved", plasticSave || "0g");
            formData.append("price", price || "0");
            formData.append("hashtags", JSON.stringify(hashtags));
            formData.append("certifications", JSON.stringify(selected));
            formData.append("quantities", JSON.stringify(quantities));
            
            if (scheduleAt) {
                formData.append("scheduleAt", scheduleAt);
            }

            if (imageUri) {
                formData.append("images", {
                    uri: imageUri,
                    type: "image/jpeg",
                    name: `product_${Date.now()}.jpg`,
                } as any);
            }

            console.log("Publishing product with FormData...");
            await productsAPI.create(formData);
            
            Alert.alert("Success", "Your product has been listed on EcoSpace!", [
                { text: "OK", onPress: () => navigation.navigate("MainTabs") }
            ]);
        } catch (error: any) {
            console.error("Publish error:", error);
            Alert.alert("Error", error.response?.data?.error || "Failed to publish product.");
        }
    };

    const handleCheckLink = async () => {
        if (!sourceLink.trim()) {
            Alert.alert("No Link", "Please enter an affiliate link first.");
            return;
        }
        const url = sourceLink.startsWith('http') ? sourceLink : `https://${sourceLink}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert("Invalid URL", "This link cannot be opened. Please check the URL.");
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
            const image = await ImagePicker.openPicker({
                cropping: false,
                compressImageQuality: 0.7,
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
            });

            const filePath = image.path.startsWith("file://")
                ? image.path
                : `file://${image.path}`;

            const cropped_image = await ImagePicker.openCropper({
                path: filePath,
                mediaType: 'photo',
                freeStyleCropEnabled: true,
                compressImageQuality: 0.7,
            });


            setImageUri(cropped_image.path);

        } catch (error: any) {
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
                            New Product
                        </Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <InputCard
                            title="Product Name:"
                            placeholder='Type your Product Name"'
                            value={title}
                            onChangeText={setTitle}
                            maxLength={100}
                            inputHeight={40}
                            containerStyle={{ backgroundColor: "white" }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <InputCard
                            title="Description:"
                            placeholder='Explain what makes this product eco-friendly...'
                            value={description}
                            onChangeText={setDescription}
                            maxLength={500}
                            inputHeight={70}
                            containerStyle={{ backgroundColor: "white" }}
                        />
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        <Text style={{ fontSize: 20, fontWeight: "600", marginRight: 20 }}>
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
                    <View style={{ marginTop: 14 }}>
                        <View style={{ flexDirection: "row", padding: 10, alignItems: "center", }}>
                            <View style={{ borderRadius: 20, marginRight: 10, padding: 12, backgroundColor: "#FFF8D6" }}>
                                <Carbon_save width={30} height={30} />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ marginRight: 20, fontSize: 18, fontWeight: "500" }}>Carbon Save:</Text>
                                <View style={{ borderWidth: 2, flexWrap: "wrap", backgroundColor: "white", borderRadius: 20, borderColor: "#BDAE7D", paddingHorizontal: 30 }}>
                                    <TextInput
                                        placeholder="50g"
                                        placeholderTextColor={"#A9A9A9"}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        value={carbonSave}
                                        onChangeText={setCarbonSave}
                                        style={{ color: "#141414" }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", padding: 10, alignItems: "center", }}>
                            <View style={{ borderRadius: 20, marginRight: 10, padding: 12, backgroundColor: "#FFF8D6" }}>
                                <Plastic_save width={30} height={30} />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ marginRight: 20, fontSize: 18, fontWeight: "500" }}>Plastic Save:</Text>
                                <View style={{ borderWidth: 2, flexWrap: "wrap", backgroundColor: "white", borderRadius: 20, borderColor: "#BDAE7D", paddingHorizontal: 30 }}>
                                    <TextInput
                                        placeholder="150g"
                                        placeholderTextColor={"#A9A9A9"}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        value={plasticSave}
                                        onChangeText={setPlasticSave}
                                        style={{ color: "#141414" }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>Certifications: </Text>
                    <View style={{
                        flexWrap: "wrap",
                        marginTop: 1,
                        flexDirection: "row",
                        borderColor: "#141414",
                        paddingTop: 10
                    }}>

                        {list.map((item, index) => {
                            const Icon = icons[item];
                            const isSelected = selected.includes(item);
                            return (
                                <View>
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => toggleInterest(item)}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: isSelected ? "#4F9A42" : "#BDAE7D",
                                            backgroundColor: isSelected ? "#4F9A42" : "#FFF8D6",
                                            marginTop: 10,
                                            paddingHorizontal: 10,
                                            paddingVertical: 4,
                                            borderRadius: 90,
                                            marginLeft: 8,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",

                                        }}
                                    >
                                        <View style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 100,
                                            backgroundColor: "#FFF4BA",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: 4
                                        }}>
                                            <Icon width={18} height={18} />
                                        </View>
                                        <Text style={{ color: isSelected ? "white" : "#141414" }}>
                                            {item}
                                        </Text>

                                    </TouchableOpacity>
                                </View>
                            )
                        })}

                    </View>
                    <View style={{ marginTop: 20 ,}}>
                        <View>
                            <Text style={{ fontWeight: 600, fontSize: 20, marginBottom: 20 }}>
                                Media:
                            </Text>
                            {imageUri && <TouchableOpacity onPress={() => setImageUri(null)}><X /></TouchableOpacity>}
                            {imageUri ? (
                                <View style={{ marginBottom: 30 }}>
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={{ width: "100%", height: 300, }}
                                        resizeMode="contain"
                                    />
                                </View>
                            ) : (
                                <View style={{ borderWidth: 2, borderRadius: 10, borderColor: "#BDAE7D", height: 200, justifyContent: "center" , backgroundColor:"#FFFFFF"}}>
                                    <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                                        <TouchableOpacity style={{ marginRight: 20, padding: 15, borderRadius: 40, backgroundColor: "#BDAE7D" }}
                                            onPress={InsertImage}>
                                            <Camera width={40} height={40} color={"white"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            Affiliate Link:
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>

                            <TextInput
                                placeholder="Type or paste a product URL"
                                placeholderTextColor={"black"}
                                value={sourceLink}
                                onChangeText={setSourceLink}
                                style={{
                                    flex: 1,
                                    height: 50,
                                    borderWidth: 1.5,
                                    borderColor: "#BDAE7D",
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: "white",
                                }}
                            />

                            <TouchableOpacity
                                onPress={handleCheckLink}
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
                                <Text style={{ fontWeight: "600", color: "#5584EE" }}>Check</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <InputCard
                            title="Benefits:"
                            placeholder='e.g., “Reduces plastic usage by 80%.”'
                            value={benefits}
                            onChangeText={setBenefits}
                            maxLength={300}
                            inputHeight={60}
                            containerStyle={{ backgroundColor: "white" }}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Quantity 
                            quantities={quantities}
                            onAddQuantity={(qty) => setQuantities(prev => [...prev, qty])}
                            onRemoveQuantity={(index) => setQuantities(prev => prev.filter((_, i) => i !== index))}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity
                            style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#EEE", padding: 10, alignItems: "center" }}
                            onPress={() => setShowPreviewModal(true)}
                        >
                            <Eye color="green" style={{ marginRight: 20 }} />
                            <Text style={{ fontSize: 16 }}>Preview</Text>
                            <ChevronRight color="#AAA" size={18} style={{ marginLeft: 'auto' }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#EEE", padding: 10, alignItems: "center" }}
                            onPress={() => setShowScheduleModal(true)}
                        >
                            <CalendarCheck color="green" style={{ marginRight: 20 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16 }}>Schedule Publish</Text>
                                {scheduleAt ? <Text style={{ color: "#4F9A42", fontSize: 13, marginTop: 2 }}>{scheduleAt}</Text> : null}
                            </View>
                            <ChevronRight color="#AAA" size={18} />
                        </TouchableOpacity>
                    </View>

                    {/* Preview Modal */}
                    <Modal visible={showPreviewModal} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
                            <View style={{ backgroundColor: "#FFF", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: "80%" }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <Text style={{ fontSize: 20, fontWeight: "700" }}>Product Preview</Text>
                                    <TouchableOpacity onPress={() => setShowPreviewModal(false)}><X size={26} color="#999" /></TouchableOpacity>
                                </View>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200, borderRadius: 16, marginBottom: 16 }} resizeMode="cover" />}
                                    <Text style={{ fontSize: 22, fontWeight: "800", color: "#141414" }}>{title || "Product Name"}</Text>
                                    <Text style={{ color: "#666", marginTop: 8, lineHeight: 22 }}>{description || "No description added."}</Text>
                                    {sourceLink ? <Text style={{ color: "#5584EE", marginTop: 8 }}>🔗 {sourceLink}</Text> : null}
                                    <Text style={{ marginTop: 12, fontWeight: "700" }}>Benefits:</Text>
                                    <Text style={{ color: "#555", marginTop: 4 }}>{benefits || "No benefits added."}</Text>
                                    {selected.length > 0 && (
                                        <><Text style={{ marginTop: 12, fontWeight: "700" }}>Certifications:</Text>
                                        <Text style={{ color: "#4F9A42" }}>{selected.join(", ")}</Text></>
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    {/* Schedule Modal */}
                    <Modal visible={showScheduleModal} animationType="slide" transparent={true}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", paddingHorizontal: 24 }}>
                            <View style={{ backgroundColor: "#FFF", borderRadius: 20, padding: 24 }}>
                                <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 16 }}>Schedule Publish</Text>
                                <Text style={{ color: "#666", marginBottom: 12 }}>Enter date & time (e.g. 2026-04-10 10:00 AM)</Text>
                                <TextInput
                                    style={{ borderWidth: 1.5, borderColor: "#BDAE7D", borderRadius: 10, padding: 12, fontSize: 16, backgroundColor: "#FDFAF0" }}
                                    placeholder="YYYY-MM-DD HH:MM AM/PM"
                                    value={scheduleAt}
                                    onChangeText={setScheduleAt}
                                />
                                <View style={{ flexDirection: "row", marginTop: 20, gap: 12 }}>
                                    <TouchableOpacity style={{ flex: 1, padding: 14, borderRadius: 12, borderWidth: 1.5, borderColor: "#DDD", alignItems: "center" }} onPress={() => setShowScheduleModal(false)}>
                                        <Text style={{ fontWeight: "600", color: "#888" }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#4F9A42", alignItems: "center" }} onPress={() => { setShowScheduleModal(false); Alert.alert("Scheduled!", `Product will be published on ${scheduleAt}`); }}>
                                        <Text style={{ fontWeight: "700", color: "#FFF" }}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
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

export default NewProduct;
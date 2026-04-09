import react, { useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, MessageCircleMore, Search, Mic , Heart , Gift , ShoppingCart } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";

function ProductSearchBar({ initialValue = "" }: any) {
    const navigation = useNavigation<any>();
    const [State, SetState] = useState("Posts");
    const [searchValue, setSearchValue] = useState(initialValue);
    return (
        <SafeAreaView style={{ backgroundColor: "#FFFBE6" }}>
            <View>
                <View style={{ paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ letterSpacing: 2, fontWeight: "500", fontSize: 24, color: "#000000" }}>ecospace</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => Alert.alert("Wishlist", "Coming Soon!")} style={{ borderColor: "#141414", paddingHorizontal: 9, paddingVertical: 4, flexDirection: "row", alignItems: "center", borderRadius: 90, marginRight: 16 }}>
                            <Heart size={(30)}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Alert.alert("Rewards", "Coming Soon!")} style={{ marginRight: 16 }}>
                            <Gift size={(30)} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                            <ShoppingCart size={(30)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center", flexDirection: "row", borderWidth: 2, borderColor: "#FFF2B1", margin: 16, height: 50, borderRadius: 100, backgroundColor: "white" }}>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                    <Search size={30} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10, flex: 1, marginRight: 10 }}>
                    <TextInput placeholder="search"
                        placeholderTextColor="#666"
                        value={searchValue}
                        onChangeText={setSearchValue}
                        onSubmitEditing={() => {
                            if(searchValue.trim()) navigation.navigate('Shop', { q: searchValue.trim() });
                        }}
                        style={{
                            color: "#141414",
                            fontSize: 18,
                            fontWeight: "400"
                        }}
                    />
                </View>
                <TouchableOpacity style={{ marginLeft: "auto", marginRight: 10 }}>
                    <Mic size={30} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ProductSearchBar;
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../components/ProductSearchBar";
import Discount from "./Discount";
import TechAndGadgets from "./Categories/TechAndGadgets";
import Reducing from "../assets/Reducing.svg";
import HomeEssentials from "../Product/Categories/HomeEssentials";
import BeautyAndPersonalCare from "../Product/Categories/BeautyAndPersonalCare";
import Energy_Star from "../assets/EnergyStar.png";
import GreenSeal from "../assets/GreenSeal.png";
import GOTS from "../assets/Gots.png";
import ECOCERT from "../assets/ECOCERT.png";
import FSC from "../assets/FSC.png";
import Bluesign from "../assets/Bluesign.png";
import Epeat from "../assets/Epeat.png";
import COSMOS from "../assets/Cosmos.png";
import { productsAPI } from "../api/products";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [certifications, setCertifications] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await productsAPI.getCategories();
      setCertifications(res.data.certifications || []);
    } catch (err) {
      console.error("Shop home fetch error:", err);
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

  const toggleInterest = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const icons: { [key: string]: any } = {
    "Energy Star": Energy_Star,
    "Green Seal": GreenSeal,
    GOTS: GOTS,
    ECOCERT: ECOCERT,
    FSC: FSC,
    COSMOS: COSMOS,
    Bluesign: Bluesign,
    Epeat: Epeat,
  };

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FFFBE6' }}>
        <ActivityIndicator size="large" color="#4F9A42" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFBE6' }}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4F9A42"]} />}
      >
        <Searchbar />
        <View style={{ marginTop: 10 }}>
          <LinearGradient
            colors={["#4E9EE9", "#4075EE"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              marginHorizontal: 20,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  Green Essentials
                </Text>

                <Text style={{ fontSize: 14, color: "#e6f0ff" }}>
                  Buy 2 reusable bags and get 1 free — save the planet in style!
                </Text>
              </View>

              <Reducing width={80} height={80} />
            </View>
          </LinearGradient>
        </View>

        {certifications.length > 0 && (
            <>
                <Text
                style={{
                    marginTop: 20,
                    marginHorizontal: 30,
                    color: "#347928",
                    fontSize: 20,
                    fontWeight: "bold",
                }}
                >
                Certifications
                </Text>

                <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingTop: 10,
                    paddingHorizontal:20
                }}
                >
                {certifications.map((item, index) => {
                    const Icon = icons[item];
                    const isSelected = selected.includes(item);

                    return (
                    <View
                        key={index}
                        style={{
                        width: "25%",
                        alignItems: "center",
                        marginBottom: 16,
                        }}
                    >
                        <TouchableOpacity
                        onPress={() => {
                            toggleInterest(item);
                            navigation.navigate('Shop', { certification: item });
                        }}
                        style={{ alignItems: "center" }}
                        >
                        <View
                            style={{
                            width: 70,
                            height: 70,
                            borderRadius: 100,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 6,
                            backgroundColor: '#F5F5F5'
                            }}
                        >
                            {Icon ? (
                                <Image
                                source={Icon}
                                style={{ width: "80%", height: "80%" }}
                                resizeMode="contain"
                                />
                            ) : (
                                <Text style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>{item}</Text>
                            )}
                        </View>

                        <Text
                            numberOfLines={1}
                            style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: isSelected ? "#4F9A42" : "#141414",
                            }}
                        >
                            {item}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    );
                })}
                </View>
            </>
        )}
        
        <Discount />

        {/* Sell on EcoSpace Banner */}
        <TouchableOpacity
          onPress={() => navigation.navigate('NewProduct')}
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            borderRadius: 16,
            overflow: 'hidden',
            marginTop:20,
          }}
        >
          <LinearGradient
            colors={['#4F9A42', '#2E7D32']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '800', marginBottom: 4 }}>🌿 Sell on EcoSpace</Text>
              <Text style={{ color: '#C8E6C9', fontSize: 14 }}>List your eco-friendly products and reach thousands of conscious buyers</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginLeft: 12 }}>
              <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 14 }}>Start →</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TechAndGadgets />
        <HomeEssentials />
        <BeautyAndPersonalCare />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
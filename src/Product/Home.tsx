import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
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

import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation<any>();
  const [selected, setSelected] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const toggleInterest = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const list: string[] = [
    "Energy Star",
    "Green Seal",
    "GOTS",
    "ECOCERT",
    "FSC",
    "COSMOS",
    "Bluesign",
    "Epeat",
  ];

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

  const visibleList = showAll ? list : list.slice(0, 8);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
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
          {visibleList.map((item, index) => {
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
                    navigation.navigate('Shop');
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
                    }}
                  >
                    <Image
                      source={Icon}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  </View>

                  <Text
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
        <Discount />
        <TechAndGadgets />
        <HomeEssentials />
        <BeautyAndPersonalCare />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
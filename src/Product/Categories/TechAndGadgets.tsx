import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Backcase from "../../assets/Products/Tech/Backcase.png";
import Cables from "../../assets/Products/Tech/Cables.png";
import Charger from "../../assets/Products/Tech/Charger.png";
import Earbuds from "../../assets/Products/Tech/Earbuds.png";
import Solar from "../../assets/Products/Tech/Solar.png";
import Lights from "../../assets/Products/Tech/Lights.png";
import Speaker from "../../assets/Products/Tech/Speaker.png";
import LED_Light from "../../assets/Products/Tech/LEDlights.png";

import { useNavigation } from "@react-navigation/native";

function TechAndGadgets() {
  const navigation = useNavigation<any>();
  const list = [
    { name: "Backcase", image: Backcase },
    { name: "Cables", image: Cables },
    { name: "Charger", image: Charger },
    { name: "Earbuds", image: Earbuds },
    { name: "Solar", image: Solar },
    { name: "Lights", image: Lights },
    { name: "Speaker", image: Speaker },
    { name: "LED Light", image: LED_Light },
  ];

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 10, marginHorizontal: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Metropolis-Regular",
          color: "#4F9A42",
          fontWeight: "900",
        }}
      >
        Tech & Gadgets
      </Text>

      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {list.map((item, index) => (
          <View
            key={index}
            style={{
              width: "25%", // ⭐ FIXED: 4 per row
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Shop', { category: 'Tech & Gadgets', q: item.name })}
              style={{
                width: 70,        // ⭐ fixed size circle
                height: 70,
                borderRadius: 100,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                elevation: 3,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: "65%",
                  height: "65%",
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Metropolis-Regular",
                fontSize: 14,
                marginTop: 6,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default TechAndGadgets;
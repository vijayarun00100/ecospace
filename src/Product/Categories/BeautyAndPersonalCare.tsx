import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



import Babycare from "../../assets/Products/Beauty/Babycare.png";
import BathBody from "../../assets/Products/Beauty/BathAndBody.png";
import Feminine from "../../assets/Products/Beauty/Feminine_Hygiene.png";
import Fragrence from "../../assets/Products/Beauty/Fragrance.png";
import HairCare from "../../assets/Products/Beauty/HairCare.png";
import Jwellery from "../../assets/Products/Beauty/Jwellery.png";
import SkinCare from "../../assets/Products/Beauty/Skincare.png";
import TopWear from "../../assets/Products/Beauty/Top_Wear.png";
import { useNavigation } from "@react-navigation/native";

function BeautyAndPersonalCare() {
  const navigation = useNavigation<any>();
  const list = [
    { name: "Babycare", image: Babycare },
    { name: "Bath&Body", image: BathBody },
    { name: "Feminine Hygiene", image: Feminine },
    { name: "Fragrance", image: Fragrence },
    { name: "Hair Care", image: HairCare },
    { name: "Jwellery", image: Jwellery },
    { name: "SkinCare", image: SkinCare },
    { name: "Top Wear", image: TopWear },
  ];

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Metropolis-Regular",
          color: "#4F9A42",
          fontWeight: "900",
        }}
      >
       Beauty & Personal Care
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
              width: "25%", 
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Shop')}
              style={{
                width: 70, 
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

export default BeautyAndPersonalCare;
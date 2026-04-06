import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



import Bags from "../../assets/Products/Home/Bags.png";
import Candles from "../../assets/Products/Home/Candles.png";
import Clothes from "../../assets/Products/Home/Clothes.png";
import Detergent from "../../assets/Products/Home/Detergent.png";
import Scrubber from "../../assets/Products/Home/Scrubber.png";
import Stationery from "../../assets/Products/Home/Stationery.png";
import Toys from "../../assets/Products/Home/Toys.png";
import Wraps from "../../assets/Products/Home/Wraps.png";
import { useNavigation } from "@react-navigation/native";

function HomeEssentials() {
  const navigation = useNavigation<any>();
  const list = [
    { name: "Bags", image: Bags },
    { name: "Bottle", image: require("../../assets/Products/Bottle/WB1.png") },
    { name: "Candles", image: Candles },
    { name: "Clothes", image: Clothes },
    { name: "Detergent", image: Detergent },
    { name: "Scrubber", image: Scrubber },
    { name: "Stationery", image: Stationery },
    { name: "Toys", image: Toys },
    { name: "Wraps", image: Wraps },
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
       Home Essentials
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
              onPress={() => navigation.navigate(item.name === 'Bottle' ? 'Shop' : 'Product')}
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

export default HomeEssentials;
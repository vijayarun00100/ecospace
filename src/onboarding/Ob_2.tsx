import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {ChevronRight} from 'lucide-react-native';
import Ob_2_img from "../assets/ob2.svg";

function Ob_2({navigation} : any) {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View style={{flex:1}}></View>
      {/* Image Section */}
      <View
        style={{
          flex: 6,
          justifyContent: "center",
          alignItems: "center",
          padding:26,
        //   borderWidth: 2,
        //   borderColor: "red"

        }}
      >
        <Ob_2_img width="100%" height="100%" />
      </View>

      {/* Text Section */}
      <View
        style={{
          flex: 3,
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 30,
        //   borderWidth: 2,
        //   borderColor: "orange",
        }}
      >
        <View style={{
            // borderWidth: 2,
            // borderColor: "blue",
            width : "100%"
        }}>
            <Text
              style={{
                color: "#4F9A42",
                fontSize: 26,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 12,
                letterSpacing: 2,
                width : "100%"
              }}
            >
               Smart Scanning,{'\n'}Smarter Choices
            </Text>
        </View>
        <View style = {{
            // borderWidth: 2,
            // borderColor: "blue",
            width : "100%",
            marginTop:4
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                lineHeight: 22,
                color: "#444",
                letterSpacing: 2,
                paddingHorizontal: 25,
              }}
            >
              Scan products to get instant details about certifications, Ingredients, plastic content.
            </Text>
        </View>
      </View>
      <View style={{
            // borderWidth : 2,
            // borderColor : "green",
            flex: 2,
            marginLeft:"auto",
            paddingRight: 30,
        }}>
        <TouchableOpacity
          style={{
              backgroundColor: "#5584EE",
              width: 70,
              height: 70,
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
            onPress={()=> navigation.navigate('Ob3')}
        >
            <ChevronRight color="white" size={30} />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default Ob_2;
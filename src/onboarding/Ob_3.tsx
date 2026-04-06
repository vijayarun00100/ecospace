import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {ChevronRight} from 'lucide-react-native';
import Ob_3_img from "../assets/ob3.svg";

function Ob_3({navigation} : any) {
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
      <View style={{flex:1}}></View>
      {/* Image Section */}
      <View
        style={{
          flex: 6,
          justifyContent: "center",
          alignItems: "center",
          padding:17,
        //   borderWidth: 2,
        //   borderColor: "red"

        }}
      >
        <Ob_3_img width="100%" height="100%" />
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
               Recommend the Best
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
             Found a product that’s good for you and the planet? Share it with our community.
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
             onPress={()=> navigation.navigate('LoginMenu')}
        >
            <ChevronRight color="white" size={30} />
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

export default Ob_3;
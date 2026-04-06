import React, { useEffect, useRef } from "react";
import { View, Text, Dimensions, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Start from "../assets/start.svg";
import Tic from "../assets/Tic.svg";
import Arc from "../assets/Arc3.svg";
import Sound from "react-native-sound";

const { width, height } = Dimensions.get("window");

function Welcome({navigation} : any) {
  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const sound = useRef<Sound | null>(null);

  useEffect(() => {

    sound.current = new Sound("bgm2.mp3", Sound.MAIN_BUNDLE, (error) => {

      if (error) {
        console.log("Sound failed to load", error);
        return;
      }

      sound.current?.play();

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]).start();

    });

    return () => {
      sound.current?.release();
    };

  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MainTabs");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "white",
        opacity: opacity,
        transform: [{ translateY }],
      }}
    >
      <SafeAreaView edges={["top"]} />
      <View style={{ flex: 3, alignItems: "center" }}>

        <View
          style={{
            position: "absolute",
            top: height * 0.1,
          }}
        >
          <Arc width={width * 1.3} height={height * 0.4} />
        </View>

        <View
          style={{
            position: "absolute",
            top: height * 0.26,
          }}
        >
          <Arc width={width * 1.1} height={height * 0.4} />
        </View>

        <View
          style={{
            position: "absolute",
            top: height * 0.34,
          }}
        >
          <Arc width={width * 1.0} height={height * 0.5} />
        </View>

      </View>

      <View
        style={{
          flex: 2,
          backgroundColor: "#FFFBE6",
          borderTopLeftRadius: width * 0.4,
          borderTopRightRadius: width * 0.4,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: width * 0.1,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -height * 0.06,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Start width={width * 0.3} height={width * 0.35} />

          <View
            style={{
              position: "absolute",
            }}
          >
            <Tic width={width * 0.1} height={width * 0.1} />
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: height * 0.05 }}>

          <Text
            style={{
              fontSize: width * 0.055,
              fontWeight: "800",
              textAlign: "center",
              marginBottom: 10,
              letterSpacing: 1,
            }}
          >
            Welcome to our Green Community!
          </Text>

          <Text
            style={{
              fontSize: width * 0.04,
              color: "#444",
              textAlign: "center",
              lineHeight: 22,
              fontWeight: "400",
              marginTop: 10,
            }}
          >
            Dive in and start exploring sustainable solutions today.
          </Text>

        </View>

      </View>

      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#FFFBE6" }} />
    </Animated.View>
  );
}

export default Welcome;
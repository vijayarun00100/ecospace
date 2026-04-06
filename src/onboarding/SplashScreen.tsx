import React from "react";
import { Image, Text, View , TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Logo from "../assets/logo.svg";
function SplashScreen({navigation} : any) {
    return (
        <SafeAreaProvider style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={()=> navigation.navigate('Ob1')}
            >
                <Logo style={{width:'100%', height:'100%'}} />
            </TouchableOpacity>
        </SafeAreaProvider>
    );
}

export default SplashScreen;
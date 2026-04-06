import React from "react";
import {View , Text , TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
interface BackButtonProps{
    title?:string;
}

function BackButton({title} : BackButtonProps){
    const navigation = useNavigation();
    return (
    <SafeAreaView style={{
        justifyContent:"flex-start",
        paddingHorizontal:20,
        // borderWidth:2,
        // borderColor:"blue",
    }}>
        <View style={{
            justifyContent:"space-between",
            flexDirection:"row",
            alignItems:"center",
            paddingBottom:32
        }}>
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={{
                
            }}
            onPress={() => navigation.goBack()}>
                <ArrowLeft color = "#4F4F4F" size={32}/>
            </TouchableOpacity>
            {title && (
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: "#3F7D3C",
              marginLeft:20
            }}
          >
            {title}
          </Text>
        )}
        </View>
            <TouchableOpacity style={{
                
            }}
            onPress={() => navigation.navigate('LoginMenu')}>
                <View style={{
                    borderWidth:2,
                    borderColor:"#A9A9A9",
                    padding:5,
                    paddingHorizontal:20,
                    borderRadius:20
                }}>
                    <Text style={{fontSize:18 , fontWeight:"600" , color:"#A9A9A9"}}>sign in</Text>
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
}

export default BackButton;
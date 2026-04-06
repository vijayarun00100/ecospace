import React from "react";
import { View, Text, TextInput, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import {Image, Pencil} from "lucide-react-native"
type AddContentCardProp = {
    title : string;
    onTouch : (text:string) => void;
}

const AddContentCard = ({
    title,
    onTouch,
} : AddContentCardProp) => {
    return(
        <View>
            <Text style={{fontWeight:600 , fontSize:20 , marginBottom:20}}>
                {title}
            </Text>
            <View style={{borderWidth:2 ,borderRadius:10, borderColor:"#BDAE7D" ,height:200 , justifyContent:"center"}}>
                <View style={{alignItems:"center" , justifyContent:"center" , flexDirection:"row"}}>
                    <TouchableOpacity style={{marginRight:20 , padding:15 , borderRadius:40 , backgroundColor:"#BDAE7D"}}
                    onPress={() => onTouch("Photos")}>
                        <Image width={40} height={40} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding:15 , borderRadius:40 , backgroundColor:"#BDAE7D"}}
                    onPress={() => onTouch("Text")} >
                        <Pencil width={40} height={40} color={"white"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddContentCard;
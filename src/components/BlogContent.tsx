import react , {useState} from "react";
import {View , Text , TextInput , TouchableOpacity , Image ,ImageSourcePropType } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
// const Dp = require("../assets/Hari.png");
interface BlogContentProps{
    text?:string;
    image?:ImageSourcePropType;
}
function BlogContent({text,image} : BlogContentProps){
    const paragraphs = text?.split(/\s{2,}/) ?? [];
    return(
        <View style={{flex:1}}>
            <View style={{marginHorizontal:30 , marginBottom:50}}>
                <Text style={{color:"#141414" ,fontWeight:600 , fontSize:20 , marginBottom:15}}>
                    Impact of recycling
                </Text>
                {paragraphs.map((word : string, index : number) => (
                    <Text key={index} style={{fontSize: 17,marginBottom: 12 , color:"#8B8B8B"}}>
                        {word}
                    </Text>
                ))}
                { image && (<View style={{alignItems:"center" , justifyContent:"center" , marginTop:5}}>
                        <View style={{width:"100%" , height:300,}}>   
                            <Image source={image} resizeMode="contain" style={{width:"100%" , height:"100%"}}/>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

export default BlogContent;
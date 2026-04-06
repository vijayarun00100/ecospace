import react, { useState } from "react";
import {View , Image , Text, TouchableOpacity, TextInput} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

import BackButton from "../components/BackButton";

function Details({navigation} : any){ 
    const [gender , setGender] = useState("");
    return(
        <SafeAreaProvider style = {{flex:1 , flexDirection:"column" , justifyContent:"space-between"}}>
            <View style={{}}>
                <BackButton />
                <View>
                    <Text style={{color:"#4F9A42" , fontWeight:"600" , fontSize:34 , marginLeft:20 , marginBottom:20}}>Hi, earth hero!</Text>
                </View>
                <View style={{marginHorizontal:20}}>
                    <Text style={{
                        fontWeight:"600",
                        fontSize:18,
                    }}>Tell us your name to join the eco-friendly circle!</Text>
                    <View style={{marginTop:20,
                        borderWidth:2,
                        borderColor:"#A9A9A9",
                        borderRadius:50,
                        width:"100%",
                        height:60,
                        justifyContent:"flex-start",
                        alignItems:"center",
                        paddingHorizontal:20,
                        flexDirection:"row"
                    }}>
                        <TextInput
                            placeholder="Enter your name"
                            placeholderTextColor="#666"
                            style={{
                                color:"#141414",
                                fontSize:16,
                                fontWeight:"400"
                            }}
                        />
                    </View>
                </View>
                <View style={{marginHorizontal:20 , marginTop:30}}>
                    <Text style={{
                        fontWeight:"500",
                        fontSize:18,
                    }}>How do you identify yourself?</Text>
                    <View style={{
                        marginTop:20,
                        alignItems:"center",
                        flexDirection:"row",
                    }}>
                        <Text
                            style={{
                                color:gender === "Male" ? "white" : "#666",
                                fontSize:16,
                                fontWeight:"400",
                                borderColor:gender === "Male" ? "#988133":"#A9A9A9",
                                borderRadius:50,
                                borderWidth:2,
                                marginRight:10,
                                paddingHorizontal:20,
                                paddingVertical:6,
                                backgroundColor: gender === "Male" ? "#988133":"transparent"
                            }}
                            onPress={() => {
                                setGender("Male");
                            }}
                        >
                            Male
                        </Text>
                        <Text
                            style={{
                                color:gender === "Female" ? "white" : "#666",
                                fontSize:16,
                                fontWeight:"400",
                                borderColor:gender === "Female" ? "#988133":"#A9A9A9",
                                borderRadius:50,
                                borderWidth:2,
                                marginRight:10,
                                paddingHorizontal:20,
                                paddingVertical:6,
                                backgroundColor: gender === "Female" ? "#988133":"transparent"
                            }}
                            onPress={() => {
                                setGender("Female");
                            }}
                        >
                            Female
                        </Text>
                        <Text
                            style={{
                                color:gender === "Other" ? "white" : "#666",
                                fontSize:16,
                                fontWeight:"400",
                                borderColor:gender === "Other" ? "#988133":"#A9A9A9",
                                borderRadius:50,
                                borderWidth:2,
                                marginRight:10,
                                paddingHorizontal:20,
                                paddingVertical:6,
                                backgroundColor: gender === "Other" ? "#988133":"transparent"
                            }}
                            onPress={() => {
                                setGender("Other");
                            }}
                        >
                            Other
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={{
                marginHorizontal:30,
                // borderWidth:2,
                // borderColor:"blue",
                marginBottom:30,
                height:60,
                justifyContent:"center",
                alignItems:"center",
                borderRadius:50,
                backgroundColor:"#5584EE"
            }}
            onPress={() => navigation.navigate('Interest')}>
                <Text style={{
                    color:"white",
                    fontWeight:"500",
                    letterSpacing:2,
                    fontSize:18,
                }}>Next</Text>
            </TouchableOpacity>
        </SafeAreaProvider>
    );
}
export default Details;
import react , {useRef , useState} from "react";
import {View , Text , Image , TouchableOpacity , TextInput , KeyboardAvoidingView, Platform, Touchable , ScrollView } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import BackButton from "../components/BackButton";

function OtpVerification({navigation} : any){
    
    const [Otp , SetOtp] = useState(["" , "" , "" , ""]);
    const inputs = [
        useRef<TextInput>(null) , useRef<TextInput>(null) , useRef<TextInput>(null) , useRef<TextInput>(null)
    ];
    const HandleChange = (text :string, index:number) => {
        const newOtp = [...Otp];
        newOtp[index] = text;
        SetOtp(newOtp);
        if(text && index < 3){
            inputs[index + 1].current?.focus();
        }
    };

    const HandleErase = (text:string , index:number)=>{
        if(!text && index > 0){
            inputs[index-1].current?.focus();
        }
    }

    const [focusedIndex , setFocusedIndex] = useState<number | null>(null);
    return(
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <SafeAreaView style={{flex:1,flexDirection:"column" , justifyContent:"space-between"}}>
                <View>
                    <BackButton title = "Verify otp" />
                    <View style={{marginHorizontal:20}}>
                        <Text style={{
                            color:"#141414",
                            fontSize:20,
                            fontWeight:"700",
                            marginBottom:10
                        }}>Confirm Your Number</Text>
                        <Text style={{
                            color:"#141414",
                            fontSize:16,
                            fontWeight:"400",
                            marginBottom:40
                        }}>Enter the number sent to the email: 
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: 20, flexDirection: "row", justifyContent:"space-between" }}>
                      {Otp.map((digit, index) => (
                        <View
                          key={index}
                          style={{
                            borderWidth: 2,
                            borderColor: focusedIndex === index ? "#4F9A42" : "#8B8B8B",
                            width: 70,
                            height: 70,
                            borderRadius: 25,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: focusedIndex == index ? "#D4F2CF" : "#FFFBE6",
                          }}
                        >
                          <TextInput
                            style={{
                              color: "#141414",
                              fontSize: 24,
                              fontWeight: "600",
                              textAlign: "center",
                            }}
                            ref={inputs[index]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => HandleChange(text, index)}
                            onFocus={() => setFocusedIndex(index)}
                            onBlur={() => setFocusedIndex(null)}
                            onKeyPress={({ nativeEvent }) =>
                              nativeEvent.key === "Backspace" && HandleErase(digit, index)
                            }
                          />
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity style={{
                        marginHorizontal:60,
                        // borderWidth:2,
                        // borderColor:"blue",
                        marginTop:40,
                        height:60,
                        justifyContent:"center",
                        alignItems:"center",
                        borderRadius:50,
                        backgroundColor:"#FFFBE6",
                        borderColor:"#5584EE",
                        borderWidth:2,
                        marginBottom:20
                    }}>
                        <Text style={{
                            color:"#5584EE",
                            fontWeight:"500",
                            letterSpacing:2,
                            fontSize:18,
                        }}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
                
                <View>

                    <TouchableOpacity style={{
                        marginHorizontal:20,
                        // borderWidth:2,
                        // borderColor:"blue",
                        height:60,
                        justifyContent:"center",
                        alignItems:"center",
                        borderRadius:50,
                        backgroundColor:"#5584EE"
                    }}
                    onPress={() => navigation.navigate('Details')}
                    >
                        <Text style={{
                            color:"white",
                            fontWeight:"500",
                            letterSpacing:2,
                            fontSize:18,
                        }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

export default OtpVerification;
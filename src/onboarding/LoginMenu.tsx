import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { authAPI } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import LoginMenuImage from "../assets/LoginMenu_.svg";
import Google from "../assets/Google.svg";

function LoginMenu({ navigation }: any) {
    const { login } = useAuth();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '366980377728-sb8tucgr2jn0kmahv90gqpjqjr1voc6u.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            const user = response.data?.user;
            
            if (!user) {
                throw new Error("No user data received from Google");
            }
            
            // Call backend to login/register with google
            const res = await authAPI.googleSignIn({
                email: user.email,
                name: user.name ?? (user.givenName + " " + user.familyName),
                photo: user.photo ?? undefined,
                googleId: user.id,
            });

            await login(res.data.token, res.data.user);

            if (res.data.user.onboardingDone) {
                navigation.reset({ index: 0, routes: [{ name: "MainTabs" }] });
            } else {
                navigation.navigate("Details");
            }
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert("Error", "Play services not available or outdated");
            } else {
                Alert.alert("Error", "Google login failed: " + error.message);
            }
        }
    };
    return(
        <SafeAreaView style= {{flex:1 , flexDirection:"column" , width:"100%", height:"100%"}}>
            <View style={{
                flex:4,
                justifyContent:"center",
                alignItems:"center",
                // borderWidth:1,
                // borderColor:"red",
                padding:34
            }}>
                <LoginMenuImage width="100%" height="100%" />
            </View>
            <View style={{
                flex:4,
                justifyContent:"center",
                alignItems:"center",
                // borderWidth:1,
                // borderColor:"red",
            }}>
                <View style={{
                    width:"100%",
                    backgroundColor:"white",
                    height:"100%",
                    borderTopLeftRadius:"15%",
                    borderTopRightRadius:"15%"
                }}>
                    <View style={{
                        backgroundColor:"#D9D9D9",
                        width:60,
                        height:7,
                        marginTop:10,
                        borderRadius:5,
                        justifyContent:"center",
                        alignItems:"center",
                        alignSelf:"center",
                    }}>
                    </View>
                    <View style={{
                        flexDirection : "column",
                        justifyContent:"center",
                        alignItems: "center",
                        marginTop:40,
                        marginBottom:20,
                        // borderWidth:2,
                        // borderColor:"blue"
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor:"#5584EE",
                            width:248,
                            height:60,
                            paddingHorizontal:15,
                            borderRadius:40,
                            justifyContent:"center",
                            alignItems:"center",
                            marginBottom:20
                        }}
                         onPress={()=> navigation.navigate('Signup')}
                        >
                            <Text style = {{
                                textAlign: "center",
                                fontSize: 16,
                                lineHeight: 25,
                                color: "white",
                                letterSpacing: 2,
                                fontWeight:700
                            }}>
                                CREATE ACCOUNT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor:"white",
                            width:248,
                            height:60,
                            paddingHorizontal:15,
                            borderRadius:40,
                            justifyContent:"center",
                            alignItems:"center",
                            borderWidth: 2,
                            borderColor:"#5584EE"
                        }}>
                            <Text
                             style = {{
                                textAlign: "center",
                                fontSize: 16,
                                lineHeight: 25,
                                color: "#5584EE",
                                letterSpacing: 2,
                                fontWeight:700
                            }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent:"center",
                        alignItems:"center",
                        flexDirection:"row",
                        marginBottom:20,
                    }}>
                        <View style={{
                            backgroundColor:"#878787",
                            borderWidth:1,
                            borderColor:"#878787",
                            height:1,
                            width:60,
                            marginRight:9
                        }}>
                        </View>
                        <Text style={{
                            textAlign: "center",
                            justifyContent:"center",
                            fontSize: 16,
                            lineHeight: 25,
                            color: "#878787",
                            letterSpacing: 2,
                            fontWeight:400
                        }}>
                            or
                        </Text>
                        <View style={{
                            backgroundColor:"#878787",
                            borderWidth:1,
                            borderColor:"#878787",
                            height:1,
                            width:60,
                            marginLeft:9
                        }}>
                        </View>
                    </View>
                    <View style={{
                        justifyContent:"center",
                        alignItems:"center",
                    }}>
                        <Text style={{
                            justifyContent:"center",
                            textAlign: "center",
                            fontSize: 15,
                            lineHeight: 25,
                            color: "#4F4F4F",
                            fontWeight:400,
                            marginBottom:12
                        }}>
                            Signup with
                        </Text>
                        <TouchableOpacity 
                            onPress={handleGoogleLogin}
                            style={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Google width={40} height={40} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default LoginMenu;

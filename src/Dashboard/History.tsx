import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashBoardHeader from "../components/DashBoardHeader";
import { ChevronLeft, LockOpen} from "lucide-react-native";
import Bag from "../assets/bag.svg";
import Coin from "../assets/coin.svg";
function History() {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center",marginBottom:20 }}>
                <ChevronLeft width={40} height={40} color={"#4F9A42"} style={{ marginRight: 4 }} />
                <Text style={{ fontWeight: 700, fontSize: 24, color: "#4F9A42", marginRight: 10 }}>Coin History</Text>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                    <View style={{ padding: 20, backgroundColor: "#FFF5BF", borderRadius: 20, flexDirection: "row" , alignItems:"center"}}>
                        <View style={{ width: 70, height: 70, padding: 10, borderRadius: 50, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                            <Bag width={50} height={50} style={{}} />
                        </View>
                        <View style={{marginLeft:20 , flex:1}}>
                            <Text style={{ flexWrap:"wrap", fontSize: 16, fontWeight: "500" }}>
                                Unlocked  <Text style={{ fontWeight: "700" }}>free shipping</Text> on eco friendly purchases.
                            </Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:"#FFF0A1" , padding:10 , borderRadius:20 ,}}>
                        <View style={{flexDirection:"row" , alignItems:"center" ,justifyContent:"space-between" ,marginRight:6 , marginLeft:8}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <Coin style={{marginRight:5}}/>
                                <Text style={{fontSize:24, fontWeight:600}}>200 <Text style={{fontSize:20, fontWeight:600}}>Coins</Text></Text>
                            </View>
                            <View style={{borderRadius:20 , borderWidth:2 , paddingHorizontal:5 , paddingVertical:4 ,flexDirection:"row" , alignItems:"center" , borderColor:"#141414"}}>
                                <LockOpen style={{marginRight:10}}/>
                                <Text style={{fontFamily:"Metropolis-Regular"}}>Redeemed</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                    <View style={{ padding: 20, backgroundColor: "#FFF5BF", borderRadius: 20, flexDirection: "row" , alignItems:"center"}}>
                        <View style={{ width: 70, height: 70, padding: 10, borderRadius: 50, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                            <Bag width={50} height={50} style={{}} />
                        </View>
                        <View style={{marginLeft:20 , flex:1}}>
                            <Text style={{ flexWrap:"wrap", fontSize: 16, fontWeight: "500" }}>
                                Unlocked  <Text style={{ fontWeight: "700" }}>free shipping</Text> on eco friendly purchases.
                            </Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:"#FFF0A1" , padding:10 , borderRadius:20 ,}}>
                        <View style={{flexDirection:"row" , alignItems:"center" ,justifyContent:"space-between" ,marginRight:6 , marginLeft:8}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <Coin style={{marginRight:5}}/>
                                <Text style={{fontSize:24, fontWeight:600}}>200 <Text style={{fontSize:20, fontWeight:600}}>Coins</Text></Text>
                            </View>
                            <View style={{borderRadius:20 , borderWidth:2 , paddingHorizontal:5 , paddingVertical:4 ,flexDirection:"row" , alignItems:"center" , borderColor:"#141414"}}>
                                <LockOpen style={{marginRight:10}}/>
                                <Text style={{fontFamily:"Metropolis-Regular"}}>Redeemed</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                    <View style={{ padding: 20, backgroundColor: "#FFF5BF", borderRadius: 20, flexDirection: "row" , alignItems:"center"}}>
                        <View style={{ width: 70, height: 70, padding: 10, borderRadius: 50, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                            <Bag width={50} height={50} style={{}} />
                        </View>
                        <View style={{marginLeft:20 , flex:1}}>
                            <Text style={{ flexWrap:"wrap", fontSize: 16, fontWeight: "500" }}>
                                Unlocked  <Text style={{ fontWeight: "700" }}>free shipping</Text> on eco friendly purchases.
                            </Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:"#FFF0A1" , padding:10 , borderRadius:20 ,}}>
                        <View style={{flexDirection:"row" , alignItems:"center" ,justifyContent:"space-between" ,marginRight:6 , marginLeft:8}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <Coin style={{marginRight:5}}/>
                                <Text style={{fontSize:24, fontWeight:600}}>200 <Text style={{fontSize:20, fontWeight:600}}>Coins</Text></Text>
                            </View>
                            <View style={{borderRadius:20 , borderWidth:2 , paddingHorizontal:5 , paddingVertical:4 ,flexDirection:"row" , alignItems:"center" , borderColor:"#141414"}}>
                                <LockOpen style={{marginRight:10}}/>
                                <Text style={{fontFamily:"Metropolis-Regular"}}>Redeemed</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default History;
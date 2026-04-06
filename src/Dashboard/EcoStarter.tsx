import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Easing, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ChevronRight } from "lucide-react-native";
import LinearGradient from 'react-native-linear-gradient';
import DashBoardHeader from "../components/DashBoardHeader";
import Svg, { Circle } from "react-native-svg";
import Task from "../assets/Task.svg";
import PendingTask from "../assets/PendingTask.svg";
import Completed from "../assets/Completed.svg";
import Todo from "../assets/Todo.svg";
import Green_Commuter from "../assets/Green_Commuter.svg";
import PlasticFree from "../assets/PlasticFree.svg";
import EnergySaver from "../assets/EnergySaver.svg";
import WasteWarrior from "../assets/WasteWarrior.svg";
import GreenThumb from "../assets/GreenThumb.svg";
import EcoInfluencer from "../assets/EcoInfluencer.svg";
import ClimateChampion from "../assets/ClimateChampion.svg";

function EcoStarter() {
    const navigation = useNavigation<any>();
    const progress = 0.7;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);
    const progress_ = 0.7;
    return (
        <SafeAreaView style={{ flex: 1, }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <DashBoardHeader title={"DashBoard"} />
                <View style={{ marginHorizontal: 30 }}>
                    <View style={{
                        marginTop: 5,
                        borderRadius: 20,
                        height: 150,
                        marginBottom: 10,
                        overflow: 'hidden',
                    }}>
                        <LinearGradient
                            colors={['#4E9EE9', '#4075EE']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={{ flex: 1, padding: 20 }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ flex: 1, flexDirection: "column" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Green_Commuter style={{ marginRight: 10 }} />
                                        <Text style={{ color: "white", fontSize: 20, fontWeight: 700 }}>Eco Starter</Text>
                                    </View>
                                    <Text style={{ color: "white", marginTop: 10, fontSize: 18, fontWeight: 500 }}>
                                        Don't forget, every small action leads to a big change!
                                    </Text>
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Svg width={100} height={100}>
                                        <Circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            stroke="#AFC6FF"
                                            strokeWidth="10"
                                            fill="none"
                                        />
                                        <Circle
                                            cx="50"
                                            cy="50"
                                            r={radius}
                                            stroke="#FFD54F"
                                            strokeWidth="10"
                                            fill="none"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            rotation="-90"
                                            origin="50,50"
                                        />
                                    </Svg>
                                    <Text
                                        style={{
                                            position: "absolute",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "white"
                                        }}
                                    >
                                        {Math.round(progress * 100)}%
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View >
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex:1, marginRight: 10, backgroundColor: "#FFD166", height: 150,  borderRadius: 20 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Task width={40} height={40} style={{ marginRight: 10 }} />
                                    <Text style={{ fontSize: 20, fontWeight: 600, color: "#7E6200" }}>Tasks</Text>
                                </View>
                                <Text style={{ fontSize: 40 }}>1</Text>
                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#4F4F4F" }}>Completed</Text>
                            </View>
                        </View>
                        <View style={{ flex:1, backgroundColor: "#FFD166", height: 150, borderRadius: 20 }}>
                            <View style={{ padding: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <PendingTask width={40} height={40} style={{ marginRight: 10 }} />
                                    <Text style={{ fontSize: 20, fontWeight: 600, color: "#7E6200" }}>Tasks</Text>
                                </View>
                                <Text style={{ fontSize: 40 }}>9</Text>
                                <Text style={{ fontSize: 18, fontWeight: 500, color: "#4F4F4F" }}>Completed</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
                            <Text style={{ color: "#4F9A42", fontSize: 20, fontWeight: 700, marginRight: 10 }}>Eco Starter</Text>
                            <Green_Commuter style={{}} />
                        </View>
                        <View style={{ marginTop: 10, backgroundColor: "white", borderWidth: 1, borderRadius: 20, padding: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Completed style={{ marginRight: 10 }} />
                                <View style={{ flexDirection: "column" }}>
                                    <Text>Like 10 posts from other users.</Text>
                                    <View style={{ height: 10, width: "100%", backgroundColor: "#E0E0E0", borderRadius: 10, marginTop: 10 }}>
                                        <View
                                            style={{
                                                height: "100%",
                                                width: `${progress_ * 100}%`,
                                                backgroundColor: "#4E7CF0",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:20 , flexDirection:"column"}}>
                        <View style={{borderTopWidth:2,borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <PlasticFree width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Plastic Free</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <Green_Commuter width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Green Commuter</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <EnergySaver width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Energy Saver</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <WasteWarrior width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Waste Warrior</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <GreenThumb width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Green Thumb</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <EcoInfluencer width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Eco Influencer</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                        <View style={{borderBottomWidth:2, padding:10,justifyContent:"space-between", borderColor:"#CACACA" , flexDirection:"row"}}>
                            <View style={{flexDirection:"row" , alignItems:"center"}}>
                                <ClimateChampion width={40} height={40} style={{marginRight:15}}/>
                                <Text style={{fontSize:17 , fontWeight:600}}>Climate Champion</Text>
                            </View>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Challenge')}
                                style={{flexDirection:"row", alignItems:"center"}}
                            >
                                <Text style={{fontSize:17 , fontWeight:400 , marginRight:6}}>See all</Text>
                                <ChevronRight />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default EcoStarter;
import react, {useState}from "react";
import {View , Text , TextInput , TouchableOpacity , Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Bell , MessageCircleMore , Search , Mic, History} from 'lucide-react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";

function DashBoardHeader({ title }: { title?: string }){
    const navigation = useNavigation<any>();
    const [State , SetState] = useState("Posts");
    return(
        <SafeAreaView style={{flex:1}}>
            <View>
                <View style={{paddingHorizontal:16 , flexDirection:"row" , justifyContent:"space-between" , alignItems:"center"}}>
                    <View style={{flexDirection:"row" , alignItems:"center"}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ChevronLeft width={40} height={40} color = {"#4F9A42"} style={{marginRight:4}}/>
                        </TouchableOpacity>
                        <Text style={{ fontWeight:700 , fontSize:24 , color:"#4F9A42", marginRight:10}}>{title}</Text>
                    </View>
                    <View style = {{flexDirection:"row" , alignItems:"center"}}>
                        <TouchableOpacity style = {{borderWidth:2 , borderColor:"#141414" , paddingHorizontal:7 , paddingVertical:3 , flexDirection:"row" , alignItems:"center" , borderRadius:90 , marginRight:12}}>
                            <View style={{borderWidth:1 , borderColor:"#FCCD2A" , width:25 , height:25 , borderRadius:190 , marginRight:10 , backgroundColor:"#FCCD2A"}} />
                            <Text style={{fontWeight:500 , fontSize:16}}>1040</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('History')}
                            style={{marginRight:12}}
                        >
                            <History size={30} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight:12}}>
                            <Bell size={(30)}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Communication')}>
                            <MessageCircleMore size={(30)}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DashBoardHeader;
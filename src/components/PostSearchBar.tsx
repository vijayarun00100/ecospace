import react from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, MessageCircleMore, Search, Mic } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

function PostSearchBar() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const currentRoute = route.name;

  return (
    <View>
      <View>
        <View style={{ paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ letterSpacing: 2, fontWeight: 500, fontSize: 24, color: "#000000" }}>ecospace</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Dashboard', { screen: 'Communication' })}
              style={{ borderWidth: 2, borderColor: "#141414", paddingHorizontal: 9, paddingVertical: 4, flexDirection: "row", alignItems: "center", borderRadius: 90, marginRight: 16 }}
            >
              <View style={{ borderWidth: 1, borderColor: "#FCCD2A", width: 30, height: 30, borderRadius: 190, marginRight: 10, backgroundColor: "#FCCD2A" }} />
              <Text style={{ fontWeight: 500, fontSize: 16 }}>1040</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Bell size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard', { screen: 'Communication' })}>
              <MessageCircleMore size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => navigation.navigate(currentRoute === 'Article' ? 'Explore' : 'Search')}
        style={{ marginTop: 20, alignItems: "center", justifyContent: "center", flexDirection: "row", borderWidth: 2, borderColor: "#FFF2B1", margin: 16, height: 50, borderRadius: 100, backgroundColor: "white" }}
      >
        <View style={{ marginLeft: 10 }}>
          <Search size={30} />
        </View>
        <View style={{ marginLeft: 10, flex: 1, marginRight: 10 }}>
          <Text style={{ color: "#666", fontSize: 18, fontWeight: "400" }}>search</Text>
        </View>
        <View style={{ marginLeft: "auto", marginRight: 10 }}>
          <Mic size={30} />
        </View>
      </TouchableOpacity>

      <View style={{ paddingHorizontal: 35, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#CACACA" }}>
        
        <TouchableOpacity
          onPress={() => navigation.navigate("Posts")}
          style={{ alignItems: "center", justifyContent: "flex-end" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", color: currentRoute === "Posts" ? "green" : "#141414", paddingBottom: 10 }}>
            Posts
          </Text>
          {currentRoute === "Posts" && (
            <View style={{ height: 4, width: 60, backgroundColor: "green", borderTopLeftRadius: 20, borderTopRightRadius: 20, position: "absolute", bottom: 0 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Article")}
          style={{ alignItems: "center", justifyContent: "flex-end" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", color: currentRoute === "Article" ? "green" : "#141414", paddingBottom: 10 }}>
            Article
          </Text>
          {currentRoute === "Article" && (
            <View style={{ height: 4, width: 60, backgroundColor: "green", borderTopLeftRadius: 20, borderTopRightRadius: 20, position: "absolute", bottom: 0 }} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Trending")}
          style={{ alignItems: "center", justifyContent: "flex-end" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", color: currentRoute === "Trending" ? "green" : "#141414", paddingBottom: 10 }}>
            Trending
          </Text>
          {currentRoute === "Trending" && (
            <View style={{ height: 4, width: 70, backgroundColor: "green", borderTopLeftRadius: 20, borderTopRightRadius: 20, position: "absolute", bottom: 0 }} />
          )}
        </TouchableOpacity>

      </View>
    </View>
  );
}

export default PostSearchBar;
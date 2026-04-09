import react from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, MessageCircleMore, Search, Mic } from 'lucide-react-native';
import PageHeader from './PageHeader';
import { useNavigation, useRoute } from '@react-navigation/native';

function PostSearchBar() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const currentRoute = route.name;

  return (
    <View>
      <PageHeader 
        showSearchBar={true}
        onSearchPress={() => navigation.navigate(currentRoute === 'Article' ? 'Explore' : 'Search')}
        headerStyle={{ paddingBottom: 0 }}
      />

      <View style={{ paddingHorizontal: 35, flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#CACACA", marginTop:20 }}>
        
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
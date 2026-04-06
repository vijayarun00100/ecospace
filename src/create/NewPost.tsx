import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, BadgeCheck } from "lucide-react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width / 3;

export default function NewPost() {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  const [cursor, setCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    requestPermission();
  }, []);


  const requestPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }
      loadAlbums();
    } catch (err) {
      console.log(err);
    }
  };


  const loadAlbums = async () => {
    try {
      const albumData = await CameraRoll.getAlbums({
        assetType: "Photos",
      });

      setAlbums(albumData);

      if (albumData.length > 0) {
        const first = albumData[0].title;
        setCurrentAlbum(first);
        loadImages(first);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const loadImages = async (albumName, nextCursor = null) => {
    try {
      if (!hasNextPage && nextCursor) return;

      const photos = await CameraRoll.getPhotos({
        first: 50,
        assetType: "Photos",
        groupName: albumName,
        after: nextCursor,
      });

      const newImages = photos.edges.map((e) => ({
        uri: e.node.image.uri,
      }));

      if (nextCursor) {
        setImages((prev) => [...prev, ...newImages]);
      } else {
        setImages(newImages);
        if (newImages.length > 0) {
          setSelectedImage(newImages[0]);
        }
      }

      setCursor(photos.page_info.end_cursor);
      setHasNextPage(photos.page_info.has_next_page);

    } catch (err) {
      console.log(err);
    }
  };


  const changeAlbum = (albumName) => {
    setCurrentAlbum(albumName);
    setImages([]);
    setCursor(null);
    setHasNextPage(true);
    loadImages(albumName);
  };


  const handleImagePress = (item) => {
    if (!isMultiSelect) {
      setSelectedImage(item);
      return;
    }

    const index = selectedImages.findIndex(
      (img) => img.uri === item.uri
    );

    if (index !== -1) {
      setSelectedImages((prev) =>
        prev.filter((img) => img.uri !== item.uri)
      );
    } else {
      setSelectedImages((prev) => [...prev, item]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>


      <View style={{
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
      }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <X width={24} height={24} style={{ marginRight: 20 }} />
          <Text style={{ fontSize: 22, fontWeight: "600" }}>
            New post
          </Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: "#5584EE", fontSize: 18 }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: 20, width: "100%", height: 450 }}>
        {(isMultiSelect && selectedImages.length > 0) || selectedImage ? (
          <Image
            source={{
              uri:
                isMultiSelect && selectedImages.length > 0
                  ? selectedImages[0].uri
                  : selectedImage?.uri,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : null}
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 10 }}>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          

          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              {currentAlbum || "Recents"}
            </Text>
            <Text style={{ marginLeft: 5 }}>▼</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsMultiSelect(!isMultiSelect);
              setSelectedImages([]);
            }}
            style={{
              flexDirection: "row",
              borderRadius: 30,
              alignItems: "center",
              padding: 7,
              paddingHorizontal: 10,
              backgroundColor: isMultiSelect ? "#FFD700" : "#FFF5BF",
            }}
          >
            <BadgeCheck height={20} width={20} />
            <Text style={{ marginLeft: 6 }}>
              {isMultiSelect ? "Multi Selected" : "Select Multiple"}
            </Text>
          </TouchableOpacity>
        </View>

        {showDropdown && (
          <View style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderRadius: 10,
            elevation: 5,
            maxHeight: 200,
            zIndex: 10,
          }}>
            <FlatList
              data={albums}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    changeAlbum(item.title);
                    setShowDropdown(false);
                  }}
                  style={{
                    padding: 12,
                    borderBottomWidth: 0.5,
                    borderColor: "#ccc",
                  }}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => loadImages(currentAlbum, cursor)}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          const index = selectedImages.findIndex(
            (img) => img.uri === item.uri
          );

          return (
            <TouchableOpacity onPress={() => handleImagePress(item)}>
              <View>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    margin:2
                  }}
                />

                {isMultiSelect && (
                  <View style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor:
                      index !== -1 ? "#007AFF" : "rgba(0,0,0,0.3)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    {index !== -1 && (
                      <Text style={{ color: "#fff", fontSize: 12 }}>
                        {index + 1}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
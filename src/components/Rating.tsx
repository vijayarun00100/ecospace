import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Star } from "lucide-react-native";

const Rating = () => {
    const [rating, setRating] = useState(0);

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>

            {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Star
                        size={22}
                        fill={i <= rating ? "#4F9A42" : "#D3D3D3"}
                        color={i <= rating ? "#4F9A42" : "#D3D3D3"}
                        style={{ marginRight: 4 }}
                    />
                </TouchableOpacity>
            ))}

            <Text style={{ marginLeft: 8, fontSize: 16 }}>
                {rating}.0
            </Text>
        </View>
    );
};

export default Rating;
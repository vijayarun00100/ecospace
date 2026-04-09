import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Star } from "lucide-react-native";

interface RatingProps {
    rating?: number;
    size?: number;
    onRatingChange?: (rating: number) => void;
    showText?: boolean;
}

const Rating = ({ rating: initialRating = 0, size = 22, onRatingChange, showText = true }: RatingProps) => {
    const [rating, setRating] = useState(initialRating);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handlePress = (i: number) => {
        if (onRatingChange) {
            setRating(i);
            onRatingChange(i);
        }
    };

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((i) => {
                    const isFilled = i <= Math.round(rating);
                    const Content = (
                        <Star
                            size={size}
                            fill={isFilled ? "#4F9A42" : "#D3D3D3"}
                            color={isFilled ? "#4F9A42" : "#D3D3D3"}
                            style={{ marginRight: size * 0.18 }}
                        />
                    );

                    if (onRatingChange) {
                        return (
                            <TouchableOpacity key={i} onPress={() => handlePress(i)}>
                                {Content}
                            </TouchableOpacity>
                        );
                    }

                    return <View key={i}>{Content}</View>;
                })}
            </View>

            {showText && (
                <Text style={{ marginLeft: 8, fontSize: size * 0.72, fontWeight: 'bold', color: '#333' }}>
                    {rating.toFixed(1)}
                </Text>
            )}
        </View>
    );
};

export default Rating;
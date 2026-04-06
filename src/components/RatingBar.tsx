import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";

const RatingBar = ({ rating, percent }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
            }}
        >
            {/* Left: Rating */}
            <View style={{ flexDirection: "row", alignItems: "center", width: 40 }}>
                <Text style={{ fontSize: 14 }}>{rating}</Text>
                <Star size={14} fill="#000" color="#000" />
            </View>

            {/* Middle: Progress Bar */}
            <View
                style={{
                    flex: 1,
                    height: 6,
                    backgroundColor: "#D3D3D3",
                    borderRadius: 5,
                    marginHorizontal: 10,
                    overflow: "hidden",
                }}
            >
                <View
                    style={{
                        width: `${percent}%`,
                        height: "100%",
                        backgroundColor: "#4F9A42",
                    }}
                />
            </View>

            {/* Right: Percentage */}
            <Text style={{ width: 40, textAlign: "right" }}>
                {percent}%
            </Text>
        </View>
    );
};

const RatingDistribution = () => {
    const data = [
        { rating: 5, percent: 66 },
        { rating: 4, percent: 23 },
        { rating: 3, percent: 7 },
        { rating: 2, percent: 2 },
        { rating: 1, percent: 1 },
    ];

    return (
        <View style={{ marginHorizontal: 20 }}>
            {data.map((item, index) => (
                <RatingBar
                    key={index}
                    rating={item.rating}
                    percent={item.percent}
                />
            ))}
        </View>
    );
};

export default RatingDistribution;
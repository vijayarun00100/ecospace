import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";

interface RatingItemProps {
    rating: number;
    percent: number;
}

const RatingItem = ({ rating, percent }: RatingItemProps) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
            }}
        >
            {/* Left: Rating */}
            <View style={{ flexDirection: "row", alignItems: "center", width: 30 }}>
                <Text style={{ fontSize: 13, marginRight: 4 }}>{rating}</Text>
                <Star size={12} fill="#666" color="#666" />
            </View>

            {/* Middle: Progress Bar */}
            <View
                style={{
                    flex: 1,
                    height: 6,
                    backgroundColor: "#EEE",
                    borderRadius: 3,
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
            <Text style={{ width: 35, textAlign: "right", fontSize: 12, color: '#888' }}>
                {Math.round(percent)}%
            </Text>
        </View>
    );
};

interface RatingDistributionProps {
    data?: { rating: number; percent: number }[];
}

const RatingDistribution = ({ data }: RatingDistributionProps) => {
    const defaultData = [
        { rating: 5, percent: 70 },
        { rating: 4, percent: 20 },
        { rating: 3, percent: 5 },
        { rating: 2, percent: 3 },
        { rating: 1, percent: 2 },
    ];

    const displayData = data || defaultData;

    return (
        <View style={{ width: '100%' }}>
            {displayData.map((item, index) => (
                <RatingItem
                    key={index}
                    rating={item.rating}
                    percent={item.percent}
                />
            ))}
        </View>
    );
};

export default RatingDistribution;
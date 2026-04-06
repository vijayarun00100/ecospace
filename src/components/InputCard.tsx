import React from "react";
import { View, Text, TextInput, StyleProp, ViewStyle } from "react-native";

type InputCardProps = {
    title: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    maxLength?: number;
    containerStyle?: StyleProp<ViewStyle>; 
    inputHeight?: number; 
};

const InputCard = ({
    title,
    placeholder,
    value,
    onChangeText,
    maxLength,
    containerStyle,
    inputHeight = 80
} : InputCardProps ) => {
    return (
        <View>
            <Text style={{ fontWeight: "600", marginBottom: 6 , fontSize:20 }}>
                {title}
            </Text>
            <View
                style={[
                    {
                        borderWidth: 1.5,
                        borderColor: "#BDAE7D",
                        borderRadius: 8,
                        padding: 10,
                        marginTop:10
                    },
                    containerStyle
                ]}
            >

                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor="#A9A9A9"
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    multiline
                    style={{
                        height: inputHeight,
                        borderRadius: 10,
                        padding: 10,
                        // backgroundColor: "#EFE8D2",
                        textAlignVertical: "top",
                        fontSize:17,
                    }}
                />

                {maxLength && (
                    <Text style={{ fontSize: 12, textAlign: "right", marginTop: 4 }}>
                        {value.length}/{maxLength}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default InputCard;
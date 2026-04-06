import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown } from "lucide-react-native";

type Props = {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
};

const DropdownSelector: React.FC<Props> = ({
    options,
    selected,
    onSelect
}) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={{ width: 150 }}>
            {/* Selected Box */}
            <TouchableOpacity
                onPress={() => setOpen(!open)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#CBBE9A",
                    backgroundColor: "#F3EED9"
                }}
            >
                <Text style={{ fontWeight: "500" }}>{selected}</Text>
                <ChevronDown size={18} />
            </TouchableOpacity>

            {/* Dropdown List */}
            {open && (
                <View
                    style={{
                        marginTop: 5,
                        borderWidth: 1,
                        borderColor: "#CBBE9A",
                        borderRadius: 10,
                        backgroundColor: "#FFF",
                        overflow: "hidden"
                    }}
                >
                    {options.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                onSelect(item);
                                setOpen(false);
                            }}
                            style={{
                                padding: 10,
                                borderBottomWidth:
                                    index !== options.length - 1 ? 1 : 0,
                                borderColor: "#EEE"
                            }}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default DropdownSelector;
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ChevronDown } from "lucide-react-native";

const units = ["Litre", "Kg", "Piece", "Pack"];

interface QuantityProps {
    quantities: string[];
    onAddQuantity: (qty: string) => void;
    onRemoveQuantity: (index: number) => void;
}

function Quantity({ quantities, onAddQuantity, onRemoveQuantity }: QuantityProps) {
    const [selectedUnit, setSelectedUnit] = useState("Litre");
    const [showUnits, setShowUnits] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onAddQuantity(`${inputValue} ${selectedUnit}`);
            setInputValue("");
        }
    };

    return (
        <View style={{
            borderWidth: 1.5,
            borderColor: "#BDAE7D",
            borderStyle: "dashed",
            borderRadius: 12,
            padding: 12,
            backgroundColor: "#FDFAF0",
            zIndex: 100
        }}>
            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12, zIndex: 101 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>Quantity:</Text>

                {/* Unit Dropdown */}
                <View>
                    <TouchableOpacity
                        onPress={() => setShowUnits(!showUnits)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1.5,
                            borderColor: "#BDAE7D",
                            borderRadius: 20,
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            backgroundColor: "white"
                        }}
                    >
                        <Text style={{ marginRight: 4, fontWeight: "500" }}>{selectedUnit}</Text>
                        <ChevronDown width={16} height={16} />
                    </TouchableOpacity>

                    {/* Dropdown Options */}
                    {showUnits && (
                        <View style={{
                            position: "absolute",
                            top: 40,
                            right: 0,
                            backgroundColor: "white",
                            borderWidth: 1.5,
                            borderColor: "#BDAE7D",
                            borderRadius: 10,
                            zIndex: 110,
                            minWidth: 100
                        }}>
                            {units.map(unit => (
                                <TouchableOpacity
                                    key={unit}
                                    onPress={() => { setSelectedUnit(unit); setShowUnits(false); }}
                                    style={{ padding: 10 }}
                                >
                                    <Text>{unit}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            {/* Quantity Tags */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {quantities.map((qty, index) => (
                    <TouchableOpacity 
                        key={index} 
                        onPress={() => onRemoveQuantity(index)}
                        style={{
                            borderWidth: 1.5,
                            borderColor: "#BDAE7D",
                            borderRadius: 20,
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            backgroundColor: "white",
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: "#555" }}>{qty}</Text>
                        <Text style={{ marginLeft: 6, color: '#FF4444', fontWeight: 'bold' }}>×</Text>
                    </TouchableOpacity>
                ))}

                {/* Add Input */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1.5,
                    borderColor: "#BDAE7D",
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    backgroundColor: "white",
                    minWidth: 90
                }}>
                    <TextInput
                        placeholder="Add"
                        placeholderTextColor="#A9A9A9"
                        value={inputValue}
                        onChangeText={setInputValue}
                        keyboardType="numeric"
                        style={{ flex: 1, padding: 0, color: "black", fontSize: 14 }}
                    />
                    <TouchableOpacity onPress={handleAdd}>
                        <Text style={{ color: "#BDAE7D", fontWeight: "700", fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Quantity;
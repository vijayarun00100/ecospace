import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, ShoppingCart, CreditCard, Home, MapPin, CheckCircle2, Package, Truck, Calendar } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { getUploadUrl } from "../api/config";

const Row = ({ label, value, isTotal = false }: { label: string; value: string; isTotal?: boolean }) => (
    <View style={[styles.row, isTotal && styles.totalRow]}>
        <Text style={[styles.rowLabel, isTotal && styles.totalLabel]}>{label}</Text>
        <Text style={[styles.rowValue, isTotal && styles.totalValue]}>{value}</Text>
    </View>
);

const Payment = () => {
    const navigation = useNavigation<any>();
    const { items, total, subtotal, checkout } = useCart();
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('Home - 123 Eco Lane, Green City');
    const [selectedPayment, setSelectedPayment] = useState('UPI (Google Pay)');

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            const res = await checkout(selectedPayment, selectedAddress);
            setOrderId(res.order?._id || 'ORD-' + Math.floor(Math.random() * 1000000));
            setIsSuccess(true);
        } catch (err) {
            Alert.alert("Error", "Payment failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={styles.successContainer}>
                    <View style={styles.successCard}>
                        <View style={styles.checkmarkOuter}>
                            <View style={styles.checkmarkMiddle}>
                                <View style={styles.checkmarkInner}>
                                    <CheckCircle2 size={60} color="#FFF" />
                                </View>
                            </View>
                        </View>
                        <Text style={styles.successTitle}>Payment Successful!</Text>
                        <Text style={styles.successSubtitle}>
                            Your order <Text style={{ fontWeight: 'bold', color: '#333' }}>#{orderId.slice(-8).toUpperCase()}</Text> has been placed successfully.
                        </Text>
                        <View style={styles.orderSummarySuccess}>
                            {items.map((item: any, idx: number) => (
                                <View key={idx} style={styles.miniItemRow}>
                                    <Image 
                                        source={{ uri: getUploadUrl(item.product?.images?.[0]) }} 
                                        style={styles.miniImage} 
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text numberOfLines={1} style={styles.miniName}>{item.product?.name}</Text>
                                        <Text style={styles.miniQty}>Qty: {item.quantity}</Text>
                                    </View>
                                    <Text style={styles.miniPrice}>₹{item.product?.price * item.quantity}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.divider} />
                        <View style={{ width: '100%', gap: 10, marginTop: 10 }}>
                            <Row label="Order Date" value={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', year: 'numeric' })} />
                            <Row label="Payment Method" value={selectedPayment} />
                            <Row label="Total Amount" value={`₹${total}`} isTotal />
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
                        }}
                        style={styles.continueButton}
                    >
                        <Text style={styles.continueButtonText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={28} color="#4F9A42" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <ShoppingCart size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <MapPin size={20} color="#4F9A42" />
                        <Text style={styles.sectionTitle}>Shipping Address</Text>
                        <TouchableOpacity><Text style={styles.editLink}>Change</Text></TouchableOpacity>
                    </View>
                    <View style={styles.addressCard}>
                        <Home size={24} color="#666" />
                        <View style={{ marginLeft: 15, flex: 1 }}>
                            <Text style={styles.addressLabel}>Home</Text>
                            <Text style={styles.addressText}>123 Eco-Friendly Lane, Green City, Planet Earth - 560001</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <CreditCard size={20} color="#4F9A42" />
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                    </View>
                    <TouchableOpacity style={[styles.methodCard, selectedPayment === 'UPI (Google Pay)' && styles.selectedMethod]}>
                        <View style={styles.methodIcon} />
                        <Text style={styles.methodText}>UPI (Google Pay / PhonePe)</Text>
                        <View style={[styles.radio, selectedPayment === 'UPI (Google Pay)' && styles.radioActive]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.methodCard, selectedPayment === 'Credit/Debit Card' && styles.selectedMethod]}>
                        <View style={styles.methodIcon} />
                        <Text style={styles.methodText}>Credit / Debit Card</Text>
                        <View style={styles.radio} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Package size={20} color="#4F9A42" />
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                    </View>
                    {items.map((item: any, idx: number) => (
                        <View key={idx} style={styles.summaryItem}>
                            <Image 
                                source={{ uri: getUploadUrl(item.product?.images?.[0]) }} 
                                style={styles.summaryImage} 
                            />
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text numberOfLines={1} style={styles.summaryName}>{item.product?.name}</Text>
                                <Text style={styles.summaryDesc}>Qty: {item.quantity} | {item.size || 'Standard'}</Text>
                            </View>
                            <Text style={styles.summaryPrice}>₹{item.product?.price * item.quantity}</Text>
                        </View>
                    ))}
                    
                    <View style={styles.summaryDetails}>
                        <Row label="Subtotal" value={`₹${subtotal}`} />
                        <Row label="Shipping" value="FREE" />
                        <Row label="Tax (GST 18%)" value={`₹${Math.round(subtotal * 0.18)}`} />
                        <View style={styles.divider} />
                        <Row label="Total Amount" value={`₹${total}`} isTotal />
                    </View>
                </View>

                <View style={styles.infoBox}>
                    <Truck size={18} color="#2E7D32" />
                    <Text style={styles.infoText}>Eco-conscious delivery estimated within 3-5 days</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    disabled={isProcessing}
                    onPress={handleCheckout}
                    style={styles.payButton}
                >
                    {isProcessing ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.payButtonText}>Pay ₹{total}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#4F9A42"
    },
    section: {
        backgroundColor: '#FFF',
        marginTop: 10,
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        flex: 1,
    },
    editLink: {
        color: '#4F9A42',
        fontWeight: 'bold',
        fontSize: 14,
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        backgroundColor: '#FAFAFA',
    },
    addressLabel: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#333',
    },
    addressText: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 12,
        marginBottom: 12,
    },
    selectedMethod: {
        borderColor: '#4F9A42',
        backgroundColor: '#F0F8EE',
    },
    methodIcon: {
        width: 40,
        height: 24,
        backgroundColor: '#EEE',
        borderRadius: 4,
        marginRight: 15,
    },
    methodText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CCC',
    },
    radioActive: {
        borderColor: '#4F9A42',
        backgroundColor: '#4F9A42',
        borderWidth: 5,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    summaryImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    summaryName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    summaryDesc: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    summaryPrice: {
        fontWeight: 'bold',
        color: '#333',
    },
    summaryDetails: {
        marginTop: 10,
        gap: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    rowLabel: {
        color: "#888",
        fontSize: 14,
    },
    rowValue: {
        fontWeight: "600",
        color: '#333',
        fontSize: 14,
    },
    totalRow: {
        marginTop: 5,
        paddingTop: 5,
    },
    totalLabel: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 18,
    },
    totalValue: {
        color: '#4F9A42',
        fontWeight: '900',
        fontSize: 22,
    },
    divider: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: 10,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        padding: 15,
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
    },
    infoText: {
        fontSize: 13,
        color: '#2E7D32',
        marginLeft: 10,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    payButton: {
        backgroundColor: "#4F9A42",
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#4F9A42",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    payButtonText: {
        color: "#FFF",
        fontWeight: "900",
        fontSize: 18,
    },
    successContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: '#FAFAFA',
    },
    successCard: {
        backgroundColor: "#FFF",
        borderRadius: 25,
        padding: 30,
        alignItems: "center",
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    checkmarkOuter: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: "#E8F5E9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    checkmarkMiddle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#C8E6C9",
        alignItems: "center",
        justifyContent: "center",
    },
    checkmarkInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#4F9A42",
        alignItems: "center",
        justifyContent: "center",
    },
    successTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#333",
        marginBottom: 10,
    },
    successSubtitle: {
        textAlign: "center",
        color: "#888",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 25,
    },
    orderSummarySuccess: {
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
    },
    miniItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    miniImage: {
        width: 40,
        height: 40,
        borderRadius: 6,
        backgroundColor: '#EEE',
    },
    miniName: {
        marginLeft: 10,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#444',
    },
    miniQty: {
        marginLeft: 10,
        fontSize: 11,
        color: '#888',
    },
    miniPrice: {
        fontWeight: '700',
        color: '#333',
        fontSize: 13,
    },
    continueButton: {
        backgroundColor: "#4F9A42",
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: "center",
        width: '100%',
        marginTop: 30,
    },
    continueButtonText: {
        color: "#FFF",
        fontWeight: "900",
        fontSize: 18,
    },
});

export default Payment;
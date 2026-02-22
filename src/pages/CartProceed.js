import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import api from '../config/api'
import PageHeader from '../components/generalComponents/PageHeader'

const CartProceed = () => {
    const navigation = useNavigation();

    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [orderNote, setOrderNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getCartSummary = async () => {
        try {
            const response = await api.get('/rest/api/cart');
            console.log(response);
            if (response.data && response.data.data) {
                const items = response.data.data || {};
                setOrderItems(response.data.data.items);
                setCartItems(items.items);
                setTotalAmount(items.items.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0));
            }
        } catch (error) {
            console.log("Özet hatası:", error);
        }
    }

    useFocusEffect(
        useCallback(() => { getCartSummary(); }, [])
    );

    const handleCompleteOrder = async () => {
        if (!address.trim()) {
            Alert.alert("Missing Detail", "A delivery address is required to proceed.");
            return;
        }

        try {
            setIsLoading(true);
            const formattedItems = orderItems.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity
            }));
            console.log(formattedItems);
            const response = await api.post('/rest/api/order/create', {
                items: formattedItems,
                address: address

            });

            if (response.data) {
                Alert.alert(
                    "Order Confirmed",
                    "Thank you for your purchase.",
                    [{
                        text: "OK", onPress: () => navigation.reset({
                            index: 0,
                            routes: [{ name: 'CartMain' }],
                        })
                    }]
                );
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Could not complete the order.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                <PageHeader subTitle={"REVIEW"} mainTitle={"CHECKOUT"} />

                <View style={styles.formContainer}>

          
                    <View style={styles.summaryContainer}>
                        {cartItems.map((item) => (
                            <View key={item.product.id} style={styles.itemRow}>
                                <Text style={styles.itemName} numberOfLines={1}>
                                    {item.quantity}x {item.product.name.toUpperCase()}
                                </Text>
                                <Text style={styles.itemPrice}>
                                    {(item.product.price * item.quantity).toLocaleString()} TL
                                </Text>
                            </View>
                        ))}
                    </View>


                    <Text style={styles.sectionHeader}>DELIVERY</Text>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>ADDRESS</Text>
                        <TextInput
                            style={styles.textArea}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter full address..."
                            placeholderTextColor="#ccc"
                            multiline={true}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>NOTES</Text>
                        <TextInput
                            style={styles.input}
                            value={orderNote}
                            onChangeText={setOrderNote}
                            placeholder="Optional requests..."
                            placeholderTextColor="#ccc"
                        />
                    </View>

                </View>
            </ScrollView>


            <View style={styles.footer}>
                <View style={styles.totalBlock}>
                    <Text style={styles.totalLabel}>TOTAL</Text>
                    <Text style={styles.totalPrice}>{totalAmount.toLocaleString()} TL</Text>
                </View>

                <TouchableOpacity
                    style={styles.payBtn}
                    activeOpacity={0.9}
                    onPress={handleCompleteOrder}
                    disabled={isLoading || cartItems.length === 0}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FCFCF8" />
                    ) : (
                        <Text style={styles.payBtnText}>PAY NOW</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CartProceed

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FCFCF8',
    },
    scroll: {
        backgroundColor: '#FCFCF8',
    },
    formContainer: {
        paddingHorizontal: 25,
        paddingBottom: 130, // Footer için
    },


    summaryContainer: {
        marginBottom: 40,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#EAEAEA',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 11,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#666',
        flex: 1,
    },
    itemPrice: {
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
        color: '#1a1a1a',
    },

    // -- Form Alanı --
    sectionHeader: {
        fontSize: 10,
        letterSpacing: 3,
        color: '#1a1a1a',
        marginBottom: 20,
        fontWeight: '500',
    },
    inputWrapper: {
        marginBottom: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0d0d0',
    },
    inputLabel: {
        fontSize: 9,
        color: '#888',
        letterSpacing: 2,
        marginBottom: 5,
    },
    input: {
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#1a1a1a',
        paddingVertical: 10,
    },
    textArea: {
        height: 60,
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#1a1a1a',
        paddingTop: 10,
        textAlignVertical: 'top',
    },

    // -- Footer --
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FCFCF8',
        paddingHorizontal: 25,
        paddingBottom: Platform.OS === 'ios' ? 35 : 20,
        paddingTop: 15,
        borderTopWidth: 0.5,
        borderTopColor: '#EAEAEA',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalBlock: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 9,
        color: '#888',
        letterSpacing: 2,
        marginBottom: 2,
    },
    totalPrice: {
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
        color: '#520000',
    },
    payBtn: {
        backgroundColor: '#520000',
        paddingVertical: 14,
        paddingHorizontal: 35,
        alignItems: 'center',
    },
    payBtnText: {
        color: '#FCFCF8',
        fontSize: 11,
        letterSpacing: 2,
        fontWeight: '600',
    }
})
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import api from '../../config/api';

const CartProductBox = ({ item, onRemove }) => {
    const { product, quantity } = item;
    const [isLoading, setIsLoading] = useState(false);


    const deleteAll = async () => {
        try {
            const url = '/rest/api/cart/delete';
            setIsLoading(true);
            const response = await api.delete(url, {
                data: {
                    productId: product.id,
                    quantity: quantity 
                }
            });
            if (onRemove) {
                onRemove();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    const decreaseItem = async () => {

        if (quantity === 1) {
            await deleteAll();
            return;
        }

        try {
            const url = '/rest/api/cart/delete';
            setIsLoading(true);
            const response = await api.delete(url, {
                data: {
                    productId: product.id,
                    quantity: 1 // Sadece 1 adet eksiltiyoruz
                }
            });

            if (onRemove) {
                onRemove();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.images[0].imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                    </Text>
                    <Text style={styles.price}>
                        {product.price.toLocaleString()} TL
                    </Text>
                </View>

                <View style={styles.actionRow}>
                    {/* Zarif Adet Kontrol Kısmı */}
                    <View style={styles.qtyContainer}>
                        <Text style={styles.qtyLabel}>QTY:</Text>
                        
                        <TouchableOpacity 
                            onPress={decreaseItem} 
                            disabled={isLoading} 
                            style={styles.qtyBtn} 
                            activeOpacity={0.6}
                        >
                            <Text style={styles.qtyIcon}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantity}>{quantity}</Text>
                    </View>

                    <TouchableOpacity onPress={deleteAll} disabled={isLoading} activeOpacity={0.6} style={styles.removeBtn}>
                        <Text style={styles.removeText}>REMOVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CartProductBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#FCFCF8',
        marginBottom: 30, 
    },
    imageContainer: {
        width: 105, 
        height: 145,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 20, 
        justifyContent: 'space-between',
        paddingVertical: 10, 
    },
    productName: {
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#1a1a1a',
        letterSpacing: 2.5, 
        lineHeight: 18,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    price: {
        fontSize: 16,
        fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
        color: '#520000',
        letterSpacing: 1,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyLabel: {
        fontSize: 10,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#888',
        letterSpacing: 2,
    },
    qtyBtn: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginLeft: 2,
    },
    qtyIcon: {
        fontSize: 14,
        color: '#1a1a1a',
        fontWeight: '300',
    },
    quantity: {
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#1a1a1a',
        paddingHorizontal: 2,
    },
    removeBtn: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    removeText: {
        fontSize: 9,
        color: '#a0a0a0',
        letterSpacing: 2,
    }
})
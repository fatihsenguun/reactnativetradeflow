import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import heart1 from '../images/heart1.png' 
import heart from '../images/heart.png'   

const { width, height } = Dimensions.get('window');

const ProductPage = ({ route }) => {
    const { product } = route.params;
    const [isFav, setIsFav] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                
                <View style={styles.imageWrapper}>
                    <Image 
                        source={{ uri: product.images[0].imageUrl }} 
                        style={styles.image} 
                    />
                </View>

                <View style={styles.infoContainer}>
                    
                    <Text style={styles.subHeader}>COLLECTION</Text>

                    <Text style={styles.productName}>{product.name.toUpperCase()}</Text>

                    <Text style={styles.productPrice}>{product.price} TL</Text>

                    <View style={styles.divider} />

                    <Text style={styles.description}>
                        {product.description || "Elegance lies in the details. This piece embodies timeless sophistication and superior craftsmanship."}
                    </Text>

                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                
                <TouchableOpacity 
                    style={styles.favButton} 
                    onPress={() => setIsFav(!isFav)}
                >
                    <Image 
                        source={isFav ? heart : heart1} 
                        style={styles.heartIcon} 
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>ADD TO CART</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ProductPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCF8',
    },
    imageWrapper: {
        width: width,
        height: height * 0.60, 
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 24,
        alignItems: 'center', 
    },
    subHeader: {
        fontSize: 12,
        color: '#888',
        letterSpacing: 4,
        marginBottom: 10,
        fontWeight: '500',
    },
    productName: {
        fontSize: 26,
        color:"#520000",
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif', 
        fontWeight: '400', 
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1,
    },
    productPrice: {
        fontSize: 18,
        color: '#444',
        fontWeight: '300', 
        marginBottom: 20,
    },
    divider: {
        width: 40, 
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 24, 
        textAlign: 'center', 
        paddingHorizontal: 10,
        fontWeight: '300',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 90,
        backgroundColor: '#FCFCF8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20, 
        borderTopWidth: 1,
        borderTopColor: '#eee', 
    },
    favButton: {
        width: 50,
        height: 50,
        borderWidth: 1, 
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderRadius: 4, 
    },
    heartIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: "#520000"
    },
    addToCartButton: {
        flex: 1, 
        height: 50,
        backgroundColor: '#1a1a1a', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4, 
    },
    addToCartText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 2, 
    }
})
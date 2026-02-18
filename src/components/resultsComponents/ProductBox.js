import { Image, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import heart1 from '../../images/heart1.png'
import heart from '../../images/heart.png'
import { useFav } from '../../context/FavoriteContext'
import { useAuth } from '../../context/AuthProvider'

const ProductBox = ({ product }) => {
    if (!product) return null;

    const { toggleFavorite, isFavorite } = useFav();
    const navigation = useNavigation()
    const isFav = isFavorite(product.id);
    const [procutObj, setProductObj] = useState({});
    const { user } = useAuth();


    const handleFav = async (productId) => {
        if (!user) {
            navigation.navigate('SignIn');
            return;
        }
        console.log("productBox", product);

        toggleFavorite(product)
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProductPage', { product: product })}
        >
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: product.images[0].imageUrl }} />
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={styles.productName}>
                        {product.name.toUpperCase()}
                    </Text>
                    <Text style={styles.productPrice}>{product.price} TL</Text>
                </View>

                <TouchableOpacity onPress={() => handleFav(product.id)} style={styles.favButton}>
                    <Image style={styles.heartIcon} source={isFav ? heart : heart1} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductBox

const styles = StyleSheet.create({
    container: {
        width: '48%',
        marginBottom: 30,
    },
    imageWrapper: {
        width: '100%',
        height: 280,
        backgroundColor: '#F0F0F0',
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 2,
    },
    textWrapper: {
        flex: 1,
        marginRight: 8,
    },
    productName: {
        fontSize: 14,

        color: '#1a1a1a',
        fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#555',
        fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
        fontWeight: '600',
    },
    favButton: {
        paddingTop: 2,
    },
    heartIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        tintColor: "#520000",
    }
})
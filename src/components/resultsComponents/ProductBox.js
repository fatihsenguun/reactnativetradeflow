import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import heart1 from '../../images/heart1.png'
import heart from '../../images/heart.png'


const ProductBox = ({ product }) => {
    const [isFav, setIsFav] = useState(false);


    return (
        <View style={styles.product}>
            <View>
                <Image style={styles.images} source={{ uri: product.images[0].imageUrl }} />

            </View>
            <View style={styles.textView}>
                <Text numberOfLines={1} style={styles.header}  >{product.name.toUpperCase()} </Text>
                <Text style={styles.price}>{product.price} TL </Text>
                <TouchableOpacity onPress={()=>setIsFav(!isFav)} style={styles.heartButton}>
                {!isFav ? (    <Image style={styles.heart} source={heart1} />):( <Image style={styles.heart} source={heart} />)}
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ProductBox

const styles = StyleSheet.create({
    images: {
        width: '100%',
        height: 250,

    },
    product: {

        width: '49%',
        height: 270,
        marginTop: 35

    },
    header: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: '600'
    },
    textView: {
        marginHorizontal: 10,
        marginTop: 5


    },
    heart: {
        width: 20,
        height: 20,
        bottom: -1,


    }
    ,
    heartButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 1,

        borderRadius: 20
    }
})
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

const ProductBox = ({ product }) => {


    return (
        <View style={styles.product}>
            <View>
                <Image style={styles.images} source={{ uri: product.images[0].imageUrl }} />
                <TouchableOpacity style={styles.heartButton}>
                    <Text style={{ fontSize: 20, color: 'red' }}>♥</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textView}>
                <Text numberOfLines={1} style={styles.header}  >{product.name.toUpperCase()} </Text>
                <Text style={styles.price}>{product.price} TL </Text>
                <FontAwesome6
                    name="house"
                    size={30}
                    color="#000"
                    iconType="solid" 
                />
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
    heartButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 1,
    }
})
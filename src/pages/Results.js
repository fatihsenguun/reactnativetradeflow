import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Results = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.product}>

                        <Image style={styles.images} source={require('../images/men2.png')} />
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.images} source={require('../images/men3.png')} />
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.images} source={require('../images/men4.png')} />
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.images} source={require('../images/women2.png')} />
                    </View>
                    <View style={styles.product}>
                        <Image style={styles.images} source={require('../images/women3.png')} />
                    </View>
                </View>


            </View>
        </ScrollView>


    )
}

export default Results

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25
    },
    product: {
      
        width: '45%',
        height: 270,
        marginTop: 35

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    images: {
        width: '100%',
        height: 200,

    }
})
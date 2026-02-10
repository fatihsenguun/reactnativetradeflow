import { Animated, Image, Pressable, ScrollView, ScrollViewComponent, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Home = ({navigation}) => {

    const slideAnim = useRef(new Animated.ValueXY({ x: 0, y: 500 })).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {

        const timeout = setTimeout(() => {
            Animated.parallel([Animated.timing(slideAnim, {
                toValue: { x: 0, y: 0 },
                duration: 1000,
                useNativeDriver: false,

            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,

            })
            ]).start()
        }, 1300)


    })

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.homePage}>
                <Animated.View style={[slideAnim.getLayout(), { opacity: opacityAnim }]}>

                    <View style={styles.picsbutton}>
                        <Image source={require('../images/men1.png')} style={styles.pic1} />
                        <Text style={styles.text1} >New Collection</Text>
                        <Pressable onPress={() => navigation.navigate('Results')} style={styles.discoverButton}><Text>Discover</Text></Pressable>
                    </View>

                    <View style={styles.picsbutton}>
                        <Image source={require('../images/women1.jpeg')} style={styles.pic1} />
                        <Text style={styles.text1} >New Collection</Text>
                        <Pressable onPress={() => navigation.navigate('Results')}  style={styles.discoverButton}><Text>Discover</Text></Pressable>

                    </View>
                </Animated.View>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    homePage: {
        width: '95%',
        height: '100%',
    },
    pic1: {
        marginTop: 20,
        width: '100%',
        height: 500
    },
    text1: {
        fontSize: 20,
        marginTop: 30,

    },
    picsbutton: {
        alignItems: 'center',
        height: 700
    },
    discoverButton: {
        marginTop: 20,
        width: 120,
        height: 50,
        borderRadius: 7,
        borderColor: '#520000',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#520000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }

})
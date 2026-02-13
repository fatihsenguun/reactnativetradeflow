import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View, Platform, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { AnimationContext } from '../context/AnimationContext';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {

    const slideAnim = useRef(new Animated.ValueXY({ x: 0, y: 450 })).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const { hasHomeAnimated, setHasHomeAnimated } = useContext(AnimationContext)

    useEffect(() => {

        if (!hasHomeAnimated) {
            const timeout = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(slideAnim, {
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
                setHasHomeAnimated(true)
            }, 1300)
        }
        else {

            slideAnim.setValue({ x: 0, y: 0 })
            opacityAnim.setValue(1)
        }

    }, [])

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Animated.View style={[slideAnim.getLayout(), { opacity: opacityAnim }]}>

                    <View style={styles.sectionContainer}>
                        <Text style={styles.subTitle}>SS / 2026</Text>
                        <Text style={styles.mainTitle}>GENTLEMEN</Text>

                        <View style={styles.imageWrapper}>
                            <Image source={require('../images/men1.png')} style={styles.image} />
                        </View>

                        <Pressable onPress={() => navigation.navigate('SearchResults', { categories: ["08ad6bed-ac8d-4e20-b835-7b00d960bfea"], header: 'GENTLEMEN' })} style={styles.discoverButton}>
                            <Text style={styles.buttonText}>DISCOVER</Text>
                        </Pressable>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.sectionContainer}>
                        <Text style={styles.subTitle}>NEW ARRIVALS</Text>
                        <Text style={styles.mainTitle}>LADIES</Text>

                        <View style={styles.imageWrapper}>
                            <Image source={require('../images/women1.jpeg')} style={styles.image} />
                        </View>

                        <Pressable onPress={() => navigation.navigate('SearchResults', { categories: ["ee671e9d-124c-4239-adf6-b46d5840e4a7"], header: 'LADIES' })} style={styles.discoverButton}>
                            <Text style={styles.buttonText}>DISCOVER</Text>
                        </Pressable>

                    </View>

                    <View style={{ height: 50 }} />
                </Animated.View>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCF8',
    },
    scrollContent: {
        paddingTop: 20,
        alignItems: 'center'
    },
    sectionContainer: {
        width: width,
        alignItems: 'center',
        marginBottom: 40,
    },
    subTitle: {
        fontSize: 12,
        color: '#666',
        letterSpacing: 4,
        marginBottom: 5,
        fontWeight: '500',
    },
    mainTitle: {
        fontSize: 32,
        color: "#000000",
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        marginBottom: 20,
        letterSpacing: 1,
        fontWeight: '400',
    },
    imageWrapper: {
        width: width * 0.9,
        height: 500,
        backgroundColor: '#f0f0f0',
        marginBottom: 25,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    discoverButton: {
        width: 160,
        height: 45,
        backgroundColor: '#520000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#FCFCF8',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 2,
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: '#e0e0e0',
        alignSelf: 'center',
        marginBottom: 40,
    }
})
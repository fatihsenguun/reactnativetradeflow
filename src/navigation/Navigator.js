import { StyleSheet, Text, View, Image, Animated, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Home from '../pages/Home'
import Search from '../pages/Search'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import Results from '../pages/Results'
import HomeStack from './HomeStack'
import SearchStack from './SearchStack'
import Favourites from '../pages/Favourites'
import ProductPage from '../pages/ProductPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SearchResults from '../pages/SearchResults'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// ===== TABS BILEŞENINI NAVIGATOR DIŞINA TAŞI =====
const Tabs = ({ slideAnim, widthAnim, opacityAnim }) => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: "#520000",
            tabBarLabelStyle: {
                fontSize: 14,
                fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
                fontWeight: '400',
            },

            tabBarStyle: {
                paddingHorizontal: 15
            },
            headerLeft: () => (
                <Animated.Image
                    source={require('../images/logo.png')}
                    style={{
                        width: widthAnim,
                        height: 100,
                        opacity: opacityAnim,
                        transform: slideAnim.getTranslateTransform(),
                    }}
                />
            ),

        }}>
            <Tab.Screen
                name="HOME"
                component={HomeStack}
                options={{
                    headerTitle: "",
                    tabBarIcon: () => {
                        <Image style={styles.basket} source={require('../images/shopping-bag.png')} />
                    },

                }}
            />
            <Tab.Screen name="SEARCH" component={SearchStack}
                options={{
                    headerTitle: "",
                    tabBarIcon: () => null,

                }} />
            <Tab.Screen name={" "} component={Favourites}
                options={{
                    headerTitle: "",

                    tabBarIcon: ({ focused, color }) => (
                        !focused ?
                            (<Image style={[styles.heart, { tintColor: color }]} source={require('../images/heart23.png')} />) :
                            (<Image style={[styles.heart, { tintColor: color }]} source={require('../images/heartfill.png')} />)
                    ),
                    tabBarIconStyle: {
                        marginTop: 20,
                    },

                    tabBarActiveTintColor: "#520000"
                }}
            />
            <Tab.Screen name="CART" component={Cart}
                options={{
                    headerTitle: "",
                    tabBarIcon: () => null,

                }} />
            <Tab.Screen name="PROFILE" component={Profile}
                options={{
                    headerTitle: "",
                    tabBarIcon: () => null,

                }} />

        </Tab.Navigator>
    )
}

const Navigator = () => {

    const { width, height } = Dimensions.get('window');

    const slideAnim = useRef(new Animated.ValueXY({ x: (width / 2) - 200, y: (height / 2) - 50 })).current;
    const widthAnim = useRef(new Animated.Value(400)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,

        }).start()
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {

            Animated.parallel([

                Animated.timing(slideAnim, {
                    toValue: { x: 0, y: 0 },
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(widthAnim, {
                    toValue: 140,
                    duration: 1000,
                    useNativeDriver: false,
                })

            ]).start();

        }, 1300)

        return () => clearTimeout(timeout);
    }, [])

    return (
        <NavigationContainer>

            <Stack.Navigator>

                <Stack.Screen
                    name="MainTabs"
                    component={() => <Tabs slideAnim={slideAnim} widthAnim={widthAnim} opacityAnim={opacityAnim} />}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SearchResults"
                    component={SearchResults}

                    options={({ navigation }) => ({
                        headerShown: true,
                        title: false,
                        headerBackTitleVisible: false,
                        headerBackTitle: "",
                        headerBackButtonDisplayMode: "minimal",

                        headerTintColor: "#520000",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'CART' })}>
                                <Image style={styles.basket} source={require('../images/shopping-bag.png')} />
                            </TouchableOpacity>
                        ),
                    })}
                />

                <Stack.Screen
                    name="ProductPage"
                    component={ProductPage}

                    options={({ navigation }) => ({
                        headerShown: true,
                        title: false,
                        headerBackTitleVisible: false,
                        headerBackTitle: "",
                        headerBackButtonDisplayMode: "minimal",

                        headerTintColor: "#520000",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'CART' })}>
                                <Image style={styles.basket} source={require('../images/shopping-bag.png')} />
                            </TouchableOpacity>
                        ),
                    })}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigator

const styles = StyleSheet.create({
    basket: {
        width: 25,
        height: 25,
        tintColor: '#520000',
    },
    heart: {
        width: 20,
        height: 20
    }
})
import { StyleSheet, Text, View, Image, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Home from '../pages/Home'
import Search from '../pages/Search'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import Results from '../pages/Results'
import HomeStack from './HomeStack'
import SearchStack from './SearchStack'
import ProductPage from '../pages/ProductPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SearchResults from '../pages/SearchResults'


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const Navigator = () => {



    const Tabs = () => {

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

        }, [])

        return (

            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: "#520000",
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
                    fontWeight: '400',

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
                        tabBarIcon: () => null,

                    }}
                />
                <Tab.Screen name="SEARCH" component={SearchStack}
                    options={{
                        headerTitle: "",
                        tabBarIcon: () => null,


                    }} />
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
    return (
        <NavigationContainer>

            <Stack.Navigator>


                <Stack.Screen
                    name="MainTabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    name="SearchResults"
                    component={SearchResults}

                    options={{
                        headerShown: true,
                        title: false,
                        headerBackTitleVisible: false,
                        headerBackTitle: "",
                        headerBackButtonDisplayMode: "minimal",

                        headerTintColor: "#520000",
                        headerRight: () => (
                            <View></View>
                        ),
                    }}
                />

                <Stack.Screen
                    name="ProductPage"
                    component={ProductPage}

                    options={{
                        headerShown: true,
                        title: false,
                        headerBackTitleVisible: false,
                        headerBackTitle: "",
                        headerBackButtonDisplayMode: "minimal",

                        headerTintColor: "#520000",
                        headerRight: () => (
                            <TouchableOpacity>
                                <Image style={styles.basket} source={require('../images/shopping-bag.png')} />
                            </TouchableOpacity>
                        ),
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigator

const styles = StyleSheet.create({
    basket: {
        width: 30,
        height: 30
    }
})
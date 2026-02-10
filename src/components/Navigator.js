import { StyleSheet, Text, View, Image, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import Results from '../pages/Results'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={Home} />
            <Stack.Screen name="Results" component={Results} />
        </Stack.Navigator>
    )
}


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
                    name="Home"
                    component={HomeStack} 
                    options={{
                        headerTitle: "",
                        tabBarIcon: () => null,
                    }}
                />
                <Tab.Screen name="Search" component={Search}
                    options={{
                        headerTitle: "",
                        tabBarIcon: () => null,

                    }} />
                <Tab.Screen name="Cart" component={Cart}
                    options={{      
                        headerTitle: "",
                        tabBarIcon: () => null,

                    }} />
                <Tab.Screen name="Profile" component={Profile}
                    options={{
                        headerTitle: "",
                        tabBarIcon: () => null,

                    }} />
            </Tab.Navigator>

        )
    }
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    )
}
export default Navigator

const styles = StyleSheet.create({})
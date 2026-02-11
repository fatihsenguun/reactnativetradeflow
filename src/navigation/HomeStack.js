import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Home from '../pages/Home';
import Results from '../pages/Results';

function HomeStack() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={Home} />

        </Stack.Navigator>
    )
}

export default HomeStack
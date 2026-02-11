import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Search from '../pages/Search'
import SearchResults from '../pages/SearchResults';

function SearchStack() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchMain" component={Search} />

        </Stack.Navigator>
    )
}

export default SearchStack
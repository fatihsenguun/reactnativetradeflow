import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cart from '../pages/Cart';
import CartProceed from '../pages/CartProceed';


function CartStack() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CartMain" component={Cart} />
            <Stack.Screen name="CartProceed" component={CartProceed} />

        </Stack.Navigator>
    )
}

export default CartStack
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/context/CartContext';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ProductList"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="ProductList" 
            component={ProductListScreen}
          />
          <Stack.Screen 
            name="ProductDetails" 
            component={ProductDetailsScreen}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}




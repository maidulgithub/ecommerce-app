import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import CartItem from '../../../components/cartItem';
import { useCart } from '../../../context/CartContext';

export default function Tablayout() {
  const {cartItems} = useCart();
  return (
    <Tabs screenOptions={{
        headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarShowLabel: false,
      
      tabBarLabelStyle: {
        backgroundColor : '#fff',
        borderTopWidth : 1,
        borderTopColor : '#F0F0F0',
        height : 56,   
        paddingTop : 8
      },
    }}>
      <Tabs.Screen name="index" options={{ tabBarIcon: ({ color,focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={24}  /> }} />
      {/* <Tabs.Screen name="cart" options={{ tabBarIcon: ({ color,focused }) => <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} /> }} /> */}
       <Tabs.Screen name="cart" options={{
         tabBarIcon: ({ color,focused }) =>(

        <View className='relative' >
          <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} /> 
          {cartItems?.length > 0 && <View className='absolute -top-2 
          -right-2 bg-accent size-3 rounded-full items-center justify-center'>
            <Ionicons name='ellipse' size={7} color='white' />
          </View>}
          
        </View>
         )
        
        }} />
       
       
      <Tabs.Screen name="favourite" options={{ tabBarIcon: ({ color,focused }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24}  /> }} />
      <Tabs.Screen name="profile" options={{ tabBarIcon: ({ color,focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={24}  /> }} />
    </Tabs>
  )
}
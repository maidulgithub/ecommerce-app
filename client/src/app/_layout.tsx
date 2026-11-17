import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import "../../global.css";

import { CartProvider } from "../../context/CartContext";
import { WishlistCProvider } from "../../context/WishlistContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from "react-native-toast-message";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

export default function RootLayout() {
  return (  <GestureHandlerRootView style={{flex:1}}>
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>

           
            <CartProvider>
            <WishlistCProvider>
               
                  <Stack  screenOptions={{headerShown : false}} />
                  <Toast />
               </WishlistCProvider>
             </CartProvider>

              </ClerkProvider>
             </GestureHandlerRootView>
             
           );
}

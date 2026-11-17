import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ProductCardProps } from '../constants/types'
import { Color, Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({product}:ProductCardProps) {
    const {toggleWishlist,isInWishlist} = useWishlist();
    const isLiked = isInWishlist(product._id);
  return (
    <Link href={`/product/${product._id}`} asChild>
        <TouchableOpacity className='w-[48%] mb-4 bg-white rounded-lg overflow-hidden ' > 
            <View className='relative h-56 w-full bg-gray-100'>
                <Image  source={{uri : product.images[0]}} className='h-full w-full' resizeMode='cover'></Image>
                
                {/* favourie icon */}
                <TouchableOpacity className='absolute top-2 right-2 z-10 bg-white rounded-full shadow-sm ' 
                onPress={(e)=> {e.stopPropagation(); toggleWishlist(product)}}> 
                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={20}
                 color={isLiked ? COLORS.accent : COLORS.primary} />
                 </TouchableOpacity>

                  {/* is featured */}
                  {product.isFeatured && (
                    <View className='absolute top-2 left-2 bg-black px-2 py-1 rounded'>
                        <Text className='text-white text-xs font-bold uppercase'>Featured</Text>
                    </View>
                  )}
                
            </View>
            {/* favourie icon */}
            <View className='p-3'>
              <View className='flex-row items-center mb-1 '>
                 <Ionicons name='star' size={14} color='#FFD&00' />
                 <Text className='text-secondary text-xs ml-1'>4.7</Text>
              </View>
              <Text className='text-primary text-sm font-medium mb-1' numberOfLines={1}>{product.name}</Text>
              <Text className='text-primary text-base font-bold' numberOfLines={1}>${product.price}</Text>
            </View>


        </TouchableOpacity>
    </Link>
  )
}
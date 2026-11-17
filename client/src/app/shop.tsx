import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Product } from '../../constants/types'
import { dummyProducts } from '@/assets/assets';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import ProductCard from '../../components/ProductCard';

export default function shop() {
    const [products,setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);
    const [loadingMore,setLoadingMore] = useState(false);
    const [hasMore,setHasMore] = useState(true);
    const [page,setPage] = useState(1);

    const fetchProducts = async (pageNumber=1)=> {
        if(pageNumber === 1){
            setLoading(true);
        }else {
            setLoadingMore(true);
        }

        try{
            const start = (pageNumber - 1) * 10;
            const end = start + 10;
            const paginatingData = dummyProducts.slice(start,end);
            if(pageNumber === 1){
            setProducts(paginatingData);
            }else {
            setProducts(prev => [...prev, ...paginatingData]);    
            }

            setHasMore(end < dummyProducts.length);
            setPage(pageNumber);
            setLoading(false);
            setLoadingMore(false);
        }catch(error){
            setLoading(false);
            setLoadingMore(false);
        }
    } 

    const loadMore = () => {
        console.log('loading',loading,'loadingMore',loadingMore,'hasMore',hasMore,'page',page)
        if(!loading && !loadingMore && hasMore){
            console.log('loading',loading,'loadingMore',loadingMore,'hasMore',hasMore,'page',page,'fetchProducts')
            fetchProducts(page + 1);
        }
    }

    useEffect(()=>{fetchProducts(1)},[])
  return (
    <SafeAreaView className='flex-1 bg-surface' edges={['top']}>
        <Header title='Shop' showBack showCart />
       
        <View className='flex-row gap-2 mb-3 mx-4'>
             {/* search bar */}
            <View className='flex-row flex-1 items-center bg-white rounded-xl border border-gray-100'>
                <Ionicons name='search' className='ml-4' size={20} color={COLORS.secondary} />
                <TextInput className='flex-1 ml-2 text-primary px-4 py-3' placeholder='Searchh products..' placeholderTextColor={COLORS.secondary} returnKeyType='search'  />
            </View>
            {/* filter icon */}
            <TouchableOpacity className='bg-gray-800 w-12 h-12 items-center justify-center rounded-xl'>
                <Ionicons name='options-outline' size={24} color='white'/>
            </TouchableOpacity>
        </View>
        {loading ? (<View className='flex-1 justify-center items-center'> 
            <ActivityIndicator size='large' color={COLORS.primary} />
        </View>) : (
            <FlatList 
            data={products} 
            keyExtractor={(item)=> item._id} 
            numColumns={2} 
            contentContainerStyle={{padding:16,paddingBottom : 100}}
             columnWrapperStyle={{justifyContent : 'space-between'}} 
             renderItem={ ({item})=>(<ProductCard product={item} />) } 
             onEndReached={loadMore} 
             onEndReachedThreshold={0.5} 
             ListFooterComponent={
               loadingMore ? (
                <View>
                    <ActivityIndicator size='small' color={COLORS.primary} />
                </View>
               ) : undefined
             }
             ListEmptyComponent={!loading && (<View 
             className='flex-1 items-center justify-center py-20' >
                <Text className='text-secondary'> No products found</Text>

             </View>)} />
        )}
        
    </SafeAreaView>
  )
}
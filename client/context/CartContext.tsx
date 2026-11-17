
import {createContext,useContext,ReactNode,useState,useEffect} from  'react'
import {dummyCart} from '../assets/assets'
import { WishlistContextType,Product } from '../constants/types';
const CartContext = createContext<CartContextType|undefined>(undefined);

export type CartItem = {
    id :string,
    productId : string,
    product : Product,
    quantity : number,
    size : string,
    price : number
}
type CartContextType = {
    cartItems : CartItem[],
    addToCart : (product : Product,size:string)=> Promise<void>;
    removeFromCart : (itemId : string,size:string)=> Promise<void>;
    updateQuantity : (itemId : string,quantity : number,size:string)=> Promise<void>;
    clearCart : ()=> Promise<void>;
   
   cartTotal : number;
   itemCount : number;
   isLoading : boolean;

}

export  function CartProvider({children}:{children : ReactNode}) {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  const fetchCart = async () => {
    setIsLoading(true);
    const  serverCart = dummyCart;
    const mappedItems : CartItem[] = serverCart.items.map((item:any) => ({
        id: item.product._id,
        productId: item.product._id,
        product: item.product,
        quantity : item.quantity,
        size: item?.size || 'M',
        price : item.price
    }));
    setCartItems(mappedItems);
    setCartTotal(serverCart.totalAmount);
    setIsLoading(false);
  } 


  const addToCart = async (product:Product,size:string) => {

}

const removeFromCart = async (itemId:string,size:string) => {
    
}
const clearCart = async () => {
}


const updateQuantity = async (itemId:string,quantity:number,size:string="M") => {
 

}

const itemCount = cartItems.reduce((sum,item)=> sum + item.quantity,0);

useEffect(()=>{
    fetchCart();
},[]); 

// const itemCount = cartItems.reduce((sum: number, item: CartItem) => {
//   return sum + item.price * item.quantity;
// }, 0);

  
  
  return (
    <CartContext.Provider 
    value={{cartItems, clearCart, addToCart, removeFromCart, updateQuantity, cartTotal, itemCount, isLoading}}>
    {children}
    </CartContext.Provider>
    
  )
}
export function useCart(){
    const context = useContext(CartContext);
    if(context === undefined){
        throw new Error('useWishlist must be use within WishlistProvider');
    }
    return context;
}


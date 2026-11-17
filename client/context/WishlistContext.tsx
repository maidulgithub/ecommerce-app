
import {createContext,useContext,ReactNode,useState,useEffect} from  'react'
import {dummyWishlist} from '../assets/assets'
import { WishlistContextType,Product } from '../constants/types';
const WishlistContext = createContext<WishlistContextType|undefined>(undefined);

export  function WishlistCProvider({children}:{children : ReactNode}) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetWishlist = async () => {
    setLoading(true);
    setWishlist(dummyWishlist);
     setLoading(false);
  }
  useEffect(() => {
    fetWishlist();    
  }, []);

  const toggleWishlist = async (produt: Product) => {
    const exist = wishlist.find((prd)=> prd._id === produt._id);
    setWishlist((prev)=> {
        if(exist){ return prev.filter((p)=> p._id !== produt._id)}
        return [...prev, produt];
    } )
  }

  const isInWishlist = (produtId : String)=> {
    return wishlist.some((p)=> p._id === produtId)
  }
  
  
  return (
    <WishlistContext.Provider value={{wishlist,loading,isInWishlist,toggleWishlist}}>
    {children}
    </WishlistContext.Provider>
    
  )
}
export function useWishlist(){
    const context = useContext(WishlistContext);
    if(context === undefined){
        throw new Error('useWishlist must be use within WishlistProvider');
    }
    return context;
}
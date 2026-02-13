import { createContext, useEffect, useState } from "react";
import {AuthProvider} from '../context/AuthProvider'
const FavoritesContext = createContext();

export const FavoritesProvider = ({children})=>{

    const {user}  = AuthProvider();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        
    },[])
    const fetchFavoritesFromBackend =()=>{

    }

    const toggleFavorite = (product)=>{
        const isExist = favorites.find(item=>item.id === product.id)


        if (isExist) {
        setFavorites(favorites.filter(item=>item.id != product.id));
            
        } else {
            setFavorites([...favorites,product]);
        }


    }
    const isFavorite = (productId)=>{
        return favorites.some(item=>item.id===productId)
    };

return(
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
            {children}
        </FavoritesContext.Provider>
)

}
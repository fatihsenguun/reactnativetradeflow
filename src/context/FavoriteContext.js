import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthProvider'
import axios from "axios";
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);


    const BASE_URL = 'http://localhost:8080/rest/api/favorite'
    useEffect(() => {

        if (user) {
            fetchFavoritesFromBackend();
        } else {
            setFavorites([]);
        }
    }, [user])

    const fetchFavoritesFromBackend = async () => {
        try {
            const url = `${BASE_URL}/myfavorites`;

            setLoading(true);
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data) {

                setFavorites(response.data.data);
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const toggleFavorite = async (product) => {
        const isExist = favorites.some(item => item.id === product.id)

        const oldFavorites = [...favorites];

        if (isExist) {
            setFavorites(favorites.filter(item => item.id != product.id));


        } else {
            setFavorites([...favorites, { product: product }]);
        }
        try {

            const response = await axios.post(`${BASE_URL}/toggle`, {
                product: product
            })
            console.log(response);

        } catch (error) {

        }





    }
    const isFavorite = (productId) => {
        return favorites.some(item => item.id === productId)
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
            {children}
        </FavoritesContext.Provider>
    )

}
export const useFav = ()=> useContext(FavoritesContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthProvider'
import axios from "axios";
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState();

    const BASE_URL = 'http://localhost:8080/rest/api/favorite'
    useEffect(() => {

        if (user && user.accessToken) {
            setAccessToken(user.accessToken)
            fetchFavoritesFromBackend(user.accessToken);

        } else {
            setFavorites([]);

        }
    }, [user,])


    const fetchFavoritesFromBackend = async (token) => {
        try {

            const url = `${BASE_URL}/myfavorites`;

            setLoading(true);
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.data) {
                setFavorites(response.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const toggleFavorite = async (product) => {

        const token = user?.accessToken;
        if (!token) return;

        const isExist = favorites.some(item => item.product.id === product.id)
        const oldFavorites = [...favorites];

        if (isExist) {
            setFavorites(favorites.filter(item => item.product.id != product.id));
        } else {
            setFavorites([...favorites, { product: product }]);
        }
        try {

            const response = await axios.post(
                `${BASE_URL}/toggle`,
                { product: product.id },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

        } catch (error) {
            setFavorites(oldFavorites)
            console.error(error)
        }
    }
    const isFavorite = (productId) => {
        return favorites.some(item => item.product.id === productId)
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
            {children}
        </FavoritesContext.Provider>
    )

}
export const useFav = () => useContext(FavoritesContext);
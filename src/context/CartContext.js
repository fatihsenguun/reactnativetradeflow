import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import { useAuth } from "./AuthProvider";


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([])
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0)
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {

        if (user && user.accessToken) {
            getMyCart()
        } else {
            setProducts([]);
        }
    }, [user,])

    const getMyCart = async () => {
        try {
            const url = '/rest/api/cart';

            setIsLoading(true);
            const response = await api.get(url);

            if (response.data && response.data.data) {
                setProducts(response.data.data.items);
                setProductsCount(response.data.data.items.length)
                console.log("response", response.data.data.items);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addToCart = async (product) => {
        console.log("product", product);
        try {
            const response = await api.post('rest/api/cart/add', {
                items: [
                    {
                        productId: product.id,
                        quantity: 1
                    }
                ]
            })
            if (response) {
                getMyCart();
                console.log(response);
            }

        } catch (error) {
            console.log(error);
        }
    }


    const removeFromCart = (productId) => setCartItems(cartItems.filter(i => i.id !== productId));
    return (
        <CartContext.Provider value={{products, cartItems, productsCount, addToCart, getMyCart, removeFromCart, setCartItems }}>
            {children}
        </CartContext.Provider>

    )

}
export const useCart = () => useContext(CartContext);
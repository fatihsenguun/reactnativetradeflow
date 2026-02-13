import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (product) => setCartItems([...cartItems, product])
    const removeFromCart = (productId) => setCartItems(cartItems.filter(i => i.id !== productId));

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems }}>
            {children}
        </CartContext.Provider>

    )

}
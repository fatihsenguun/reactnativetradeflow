import { AnimationProvider } from './AnimationContext'
import { AuthProvider } from './AuthProvider'
import { CartProvider } from './CartContext'
import { FavoritesProvider } from './FavoriteContext'


export const AppProvider = ({ children }) => {

    return (
        <AnimationProvider>
            <AuthProvider>
                <FavoritesProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </FavoritesProvider>
            </AuthProvider>
        </AnimationProvider>
    )
}
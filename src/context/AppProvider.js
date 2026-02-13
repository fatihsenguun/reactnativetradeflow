import {AnimationProvider} from './AnimationContext'
import { AuthProvider } from './AuthProvider'
import { CartProvider } from './CartContext'


export const AppProvider = ({children})=>{

    return(
      <AnimationProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </AnimationProvider>
    )
}
import { createContext, useContext, useEffect, useState } from "react"
import {setTokens,getTokens} from '../config/tokenStorage'


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const tokens = await getTokens();


            if (tokens && tokens.accessToken) {
              
                setUser({ 
                    accessToken: tokens.accessToken, 
                    refreshToken: tokens.refreshToken 
                });
            }
        } catch (error) {
            console.log("Token error: ", error);
        } finally {

            setIsLoading(false); 
        }
    }


    useEffect(() => {
        isLoggedIn();
    }, [])

    const login = async(userData) => {
        setUser(userData)
        await setTokens(userData.accessToken, userData.refreshToken)


    }
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, isLoading, setIsLoading, login, logout }}>
            {children}
        </AuthContext.Provider>

    )
}
export const useAuth =()=> useContext(AuthContext);

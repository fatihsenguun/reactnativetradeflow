import { createContext, useContext, useState } from "react"
import {setTokens} from '../config/tokenStorage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [isLoading, setIsLoading] = useState(true)

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

import { createContext, useContext, useEffect, useState } from "react"
import { setTokens, getTokens } from '../config/tokenStorage'
import api from "../config/api"


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userInfo, setUserInfo] = useState(null);
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
                await fetchUser();
            }
        } catch (error) {
            console.log("Token error: ", error);
        } finally {

            setIsLoading(false);
        }
    }
    const fetchUser = async () => {
        try {

            const url = `http://localhost:8080/getUser`;
            setIsLoading(true);
            const response = await api.get(url);

            if (response.data) {

                setUserInfo(response.data)
                return(response.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        isLoggedIn();

    }, [])

    const login = async (userData) => {
        setUser(userData)
        await setTokens(userData.accessToken, userData.refreshToken)
        await fetchUser()

    }
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, isLoading,userInfo, fetchUser, setIsLoading, login, logout }}>
            {children}
        </AuthContext.Provider>

    )
}
export const useAuth = () => useContext(AuthContext);

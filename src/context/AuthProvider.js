import { createContext, useState } from "react"


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const login = (userData) => setUser(userData)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, isLoading, setIsLoading, login, logout }}>
            {children}
        </AuthContext.Provider>

    )
}
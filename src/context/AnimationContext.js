
import React, { createContext, useState } from 'react'

export const AnimationContext = createContext()

export const AnimationProvider = ({ children }) => {

    const [hasHomeAnimated, setHasHomeAnimated] = useState(false)

    return (
        <AnimationContext.Provider value={{ hasHomeAnimated, setHasHomeAnimated }}>
            {children}
        </AnimationContext.Provider>
    )


}
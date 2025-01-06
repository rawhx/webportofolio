import React, { createContext, useState } from 'react';
export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [hamburgerActive, setHamburgerActive] = useState(false)

    return (
        <GlobalContext.Provider value={{ 
            hamburger: { hamburgerActive, setHamburgerActive },
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

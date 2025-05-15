import React, { createContext, useState } from "react";

const Authcontext = createContext<{token: string | null, setToken: React.Dispatch<React.SetStateAction<string | null>>} | null>(null);
const DataContext = createContext<{data: any | null, setData: React.Dispatch<React.SetStateAction<string | null>>} | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    return (
        <>
           <Authcontext.Provider value={{token, setToken}}>{children}</Authcontext.Provider>
        </>
    )
}

export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [data, setData] = useState<any | null>(null)
    return (
        <>
         <DataContext.Provider value={{data, setData}}>{children}</DataContext.Provider>
        </>
    )
}

export const useData = () => {
    return React.useContext(DataContext)
}

export const useAuth = () => {
    return React.useContext(Authcontext)
}

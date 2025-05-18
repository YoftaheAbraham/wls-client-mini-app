import React, { createContext, useEffect, useLayoutEffect, useState } from "react";

const Authcontext = createContext<{token: string | null, setToken: (token: string, save_token: boolean) => void, logout: () => void} | null>(null);
const DataContext = createContext<{data: any | null, setData: (data: object, save_data: boolean) => void | null} | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);

    useLayoutEffect(() => {
        setToken(localStorage.getItem("token"));
        console.log(token);
        
    }, [token])

    const setTokenData = (token: string, save_token: boolean) => {
        setToken(token)
        if(save_token) {
            localStorage.setItem("token", token)
        }
    }

    const logout = () => {
        localStorage.clear();
        setToken(null)
    }
    return (
        <>
           <Authcontext.Provider value={{token, setToken: setTokenData, logout}}>{children}</Authcontext.Provider>
        </>
    )
}

export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [data, setData] = useState<any | null>(null);

     useLayoutEffect(() => {
        let localData = localStorage.getItem("data") || "";
        if(localData && localData != "") {
            setData(JSON.parse(localData.toString()));
            console.log(data, localData);
        }
    }, []);

    useEffect

    const setStudentData = (data: object, save_data: boolean) => {
        setData(data)
        if(save_data) {
            localStorage.setItem("data", JSON.stringify(data))
        }
    }
    return (
        <>
         <DataContext.Provider value={{data, setData: setStudentData}}>{children}</DataContext.Provider>
        </>
    )
}

export const useData = () => {
    return React.useContext(DataContext)
}

export const useAuth = () => {
    return React.useContext(Authcontext)
}

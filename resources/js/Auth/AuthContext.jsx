import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    //Set token
    const tokenn = localStorage.getItem('token');
    const [token, setToken] = useState(tokenn);

    useEffect(() => {
        token = tokenn;
        if(token){
            setToken(token);
            console.log("esta cosa funciona" + token)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            token, setToken
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

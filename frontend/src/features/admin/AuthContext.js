import React, { useState } from "react";

const AuthContext = React.createContext("user");

const AuthProvider = (props) => {
    const [loginUser, setLoginUser] = useState("");

    const login = (username, password) => {
        if(username == process.env.REACT_APP_MOVIE_USER && password == process.env.REACT_APP_MOVIE_PASSWORD){
            setLoginUser(username);

        }
    }
    const logout = () => {
        setLoginUser("");
    }

    return (
        <AuthContext.Provider value={{ loginUser, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
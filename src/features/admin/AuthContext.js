import React, { useState } from "react";

const AuthContext = React.createContext("user");

const AuthProvider = (props) => {
    const [loginUser, setLoginUser] = useState("");

    const login = (username, password) => {
        if(username == process.env.REACT_APP_MOVIE_USER && password == process.env.REACT_APP_MOVIE_PASSWORD){
            setLoginUser(username);
            console.log("Logged in user:" + loginUser);

        }
        console.log("Finished")
    }
    const logout = () => {
        setLoginUser(null);
    }

    return (
        <AuthContext.Provider value={{ loginUser, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"


export default function LoginForm() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    
    function handleUserNameChange(e) {
        setUserName(e.target.value)
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value)
    }


    function handleFormSubmit(e) {
        e.preventDefault();
        console.log("Logging in User: " + username);
        let user = username, pass =  password;
        login(user, pass);  
        navigate("/list");  
    }
    
    
    return (
        <div className="flex flex-col justify-content-center items-center">
                <h2 className="text-4xl mb-6">Login</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input 
                            id="username"
                            name="username"
                            type="text" 
                            placeholder="Username"  
                            value={username}
                            onChange={handleUserNameChange}
                            className="rounded-full outline outline-gray-500 mb-3 p-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="rounded-full outline outline-gray-500 mb-3 p-1"
                        />
                    </div>
                    <div>
                        <button type="submit">Go</button>
                    </div>
            </form>
        </div>
    )
}


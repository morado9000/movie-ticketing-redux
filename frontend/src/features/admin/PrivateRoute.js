import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute(props) {
    const { loginUser } = useContext(AuthContext);
    if(!loginUser){
        return <Navigate to="/admin/login" />
    }
    return props.children;
}
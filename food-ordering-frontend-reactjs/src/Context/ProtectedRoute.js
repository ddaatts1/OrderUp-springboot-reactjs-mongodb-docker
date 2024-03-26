import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";

import LoginForm from "../GoogleRecaptcha/LoginForm";
import {decodeToken} from "react-jwt";

// 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
function ProtectedRoute({ element,userRole, ...rest }) {
    const { authState } = useContext(AuthContext);

    const [role,setRole] = useState('')
    useEffect(()=>{


        const myDecodedToken = decodeToken(authState.token);
        if(myDecodedToken != null)
        setRole(myDecodedToken.role)
        console.log("authState protected: ",authState)
        console.log("myDecodedToken: ",myDecodedToken)
    },[authState])


    useEffect(()=>{
        console.log("role: ",role)

    },[role])



    return (
        <>
            {console.log("auth: ",authState)}
            {authState.isAuthenticated == true? role==userRole? element :<LoginForm/> : <LoginForm/>}
        </>

    );
}

export default ProtectedRoute;
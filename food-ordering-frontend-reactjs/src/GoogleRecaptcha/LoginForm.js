import React, {useState, useRef, useEffect} from "react";
import validator from "validator";
import './LoginForm.css'
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {useAuth} from "../Context/useAuth";
import {useNavigate} from "react-router";
import {decodeToken} from "react-jwt";

const Login = () => {

    const navigate = useNavigate();
    const {login} = useAuth()
    const [response,setResponse] = useState(null);
    const [verified, setVerified] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const doLogin = async () => {
        const { email, password} = getInputs();
        if (
            isSignupValid({
                email,
                password,
            })
        ) {

            console.log("env : ",process.env.REACT_APP_URL_LOGIN)
            console.log("request body: ",getInputs())
            await axios.post(process.env.REACT_APP_URL_LOGIN ,getInputs()).then((r)=>{
                console.log("response: ",r.data)
                setResponse(r.data)
                const myDecodedToken = decodeToken(r.data.message);
                console.log("myDecodedToken: ",myDecodedToken)
                if(myDecodedToken != null)
                   if(myDecodedToken.role == "MANAGER"){
                       setTimeout(() => {
                           navigate('/management' );
                       }, 2000);// 2s
                   }
                else {
                       setTimeout(() => {
                           navigate('/SystemManagement' );
                       }, 2000);// 2s
                   }




            }).catch((error) => {
                console.log("sai ten dn hoac mk")
            });

            console.log(response)




        }
    };

    useEffect(()=>{
        if(response != null){
            if(response.status == 1){
                console.log(response.message)
                alert("login successfully");
                login(response.message)
            }else {
                alert("sai ten dn hoac mk");
            }
        }

    },[response])

    const getInputs = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        return { email, password};
    };

    const isSignupValid = ({email,
                               password,
                           }) => {

        if (!validator.isEmail(email)) {
            alert("Please input your email");
            return false;
        }
        if (
            validator.isEmpty(password) ||
            !validator.isLength(password, {min: 6})
        ) {
            alert(
                "Please input your password. You password must have at least 6 characters"
            );
            return false;
        }


        return true;
    };
    function onChange(value) {
        console.log("Captcha value:", value);
        setVerified(true);
    }

    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__container">
                    <div className="signup__title">Login</div>
                </div>
                <div className="signup__subtitle"></div>
                <div className="signup__form">

                    <input type="text" placeholder="Email" ref={emailRef}/>
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <ReCAPTCHA
                        sitekey="6LfHLvwkAAAAALp4W4i3Yr4c1A70Mqy3_ik58Uga"
                        onChange={onChange}
                    />
                    <button className="signup__btn" onClick={doLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
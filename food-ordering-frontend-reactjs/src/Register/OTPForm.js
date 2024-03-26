import React, {useState, useRef, useEffect} from "react";
import validator from "validator";
import './RegisterForm.css'
import axios from "axios";

const OTPForm = () => {

    const OTPRef = useRef(null);

    const Validate = async () => {
        const { OTP} = getInputs();
        if (
            isSignupValid({
                OTP,
            })
        ) {
            const searchParams = new URLSearchParams(window.location.search);
            const email = searchParams.get('email');

            console.log("OTP: ",OTP)
            axios.post(process.env.REACT_APP_URL_VALIDATE_OTP,null,
                {params: {
                email, OTP
            }}).then((response)=>{
                console.log("response: ",response.data)
                    if(response.data.code == 1){
                        console.log("Xác thực thành công")
                        alert("Xác thực thành công");
                        window.location.href = '/login' ;


                    }
                    else {
                        console.log("Xác thực thất bại ")
                        alert("Xác thực thất bại");

                    }
                })

        }
    };

    useEffect(()=>{

        const searchParams = new URLSearchParams(window.location.search);
        const email = searchParams.get('email');
        console.log("email: ",email)
    },[])

    const getInputs = () => {
        const OTP = OTPRef.current.value;

        return {OTP}
    };

    const isSignupValid = ({
        OTP
                           }) => {

        if(validator.isEmpty(OTP)){
            alert("Mã OTP không được để trống")
            return false;
        }
            return true;
        };


        return (
            <div className="signup">
                <div className="signup__content">
                    <div className="signup__container">
                        <div className="signup__title">Đăng ký</div>
                    </div>
                    <div className="signup__subtitle"></div>
                    <div className="signup__form">

                        <input type="text" placeholder="Mã OTP" ref={OTPRef}/>


                        <button className="signup__btn" onClick={Validate}>
                            Xác thực
                        </button>
                    </div>
                </div>
            </div>
        );
    }

export default OTPForm
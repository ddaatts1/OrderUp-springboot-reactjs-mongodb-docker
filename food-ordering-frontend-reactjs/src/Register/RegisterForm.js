import React, {useState, useRef} from "react";
import { ReactComponent as Loader } from './load.svg'

import './RegisterForm.css'
import axios from "axios";
import {useNavigate} from "react-router";

const SignUp = () => {

    const [isLoading,setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();
    const aboutRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const emailRef = useRef(null);
    const filepickerRef = useRef(null);
    const fullnameRef = useRef(null);
    const passwordRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);

    const signup = async () => {
        setIsLoading(true)
        const { fullname, email, password, confirmPassword,phone,address,about} = getInputs();
        if (
            isSignupValid({
                about,
                fullname,
                email,
                password,
                confirmPassword,
                phone,
                address
            })
        ) {
            const  requestData = {
                name:fullname,
                email:email,
                password: password,
                address_detail: address,
                address_long:"",
                address_lat:"",
                phone:phone
            }
            console.log("request data : ",requestData);
           await axios.post(process.env.REACT_APP_URL_REGISTER,requestData)
                .then((response)=>{
                    console.log("response: ",response)
                    if(response.status != 200){
                        console.log("Tạo tìa khoản không thành công")
                        setIsLoading(false)
                    }
                    else {
                        console.log("Tạo tài khoản thành công ")
                        setIsLoading(false)

                        alert("You account was created successfully");
                        // window.location.href = '/validateOTP?email=' + email;
                        navigate('/validateOTP?email=' + email);
                    }
                })

        }
    };

    const getInputs = () => {
        const about = aboutRef.current.value;
        const fullname = fullnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const address = addressRef.current.value;
        const phone = phoneRef.current.value;
        return { fullname, email, password, confirmPassword,phone,address,about};
    };

    const isSignupValid = ({
                               about,
                               fullname,
                               email,
                               password,
                               confirmPassword,
                                phone,
                                address
                           }) => {
        // if (!avatar) {
        //     alert("Please upload your avatar");
        //     return false;
        // }
        // if (validator.isEmpty(fullname)) {
        //     alert("Please input your fullname");
        //     return false;
        // }
        // if (!validator.isEmail(email)) {
        //     alert("Please input your email");
        //     return false;
        // }
        // if (
        //     validator.isEmpty(password) ||
        //     !validator.isLength(password, {min: 6})
        // ) {
        //     alert(
        //         "Please input your password. You password must have at least 6 characters"
        //     );
        //     return false;
        // }
        // if (validator.isEmpty(confirmPassword)) {
        //     alert("Please input your confirm password");
        //     return false;
        // }
        // if (password !== confirmPassword) {
        //     alert("Confirm password and password must be the same");
        //     return false;
        // }
        // if (validator.isEmpty(about)) {
        //     alert("Please input your description");
        //     return false;
        // }
        // if(validator.isEmpty(phone)) {
        //     alert("Please input your phone ");
        //     return false;
        // }
        //
        // if(validator.isEmpty(address)){
        //     alert("Please input your address");
        //     return false;
        // }
        return true;
    };

    const uploadAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };
    };

    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__container">
                    <div className="signup__title">Đăng ký</div>
                </div>
                <div className="signup__subtitle"></div>
                <div className="signup__form">
                    {avatar && (
                        <div
                            className="signup__user-avatar"
                            onClick={() => filepickerRef.current.click()}
                        >
                            <img src={avatar} alt="avatar"/>
                        </div>
                    )}
                    {!avatar && (
                        <div
                            onClick={() => filepickerRef.current.click()}
                            className="signup__upload-container"
                        >
                            Chọn ảnh
                        </div>
                    )}
                    <input
                        className="signup__upload-avatar"
                        hidden
                        onChange={uploadAvatar}
                        ref={filepickerRef}
                        type="file"
                    />
                    <input type="text" placeholder="Tên nhà hàng" ref={fullnameRef}/>
                    <input type="text" placeholder="Email" ref={emailRef}/>
                    <input type="password" placeholder="Mật khẩu" ref={passwordRef}/>
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu "
                        ref={confirmPasswordRef}
                    />
                    <input type="text" placeholder="Số điện thoại" ref={phoneRef}/>

                    <input type="text" placeholder="Địa chỉ" ref={addressRef}/>

                    <textarea
                        className="signup__about"
                        placeholder="Chi tiết..."
                        ref={aboutRef}
                    ></textarea>
                    <button className="signup__btn" onClick={signup}>
                        {!isLoading?"Đăng ký ":<Loader className="spinner"/> }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
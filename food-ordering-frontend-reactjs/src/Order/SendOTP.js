import React, {useState, useRef, useEffect} from 'react';
import firebase from"../ChatBox/firebaseConfig"
import Rating from "react-rating";
import {FaStar} from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import Popup from "reactjs-popup";



function SendOTP() {
    const [mobile, setMobile] = useState('');
    const [otp, setOTP] = useState('');
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);


    const handleRatingChange = (value) => {
        setRating(value);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobile') {
            setMobile(value);
        } else if (name === 'otp') {
            setOTP(value);
        }
    };

    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
                console.log("Recaptca varified");
            },
            defaultCountry: "IN"
        });
    };

    const onSignInSubmit = (e) => {
        e.preventDefault();
        configureCaptcha();
        const phoneNumber = "+84" + mobile;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent");
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log("SMS not sent");
        });
    };

    const onSubmitOTP = (e) => {
        e.preventDefault();
        const code = otp;
        console.log(code);
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(JSON.stringify(user));
            alert("Thành công ");
            // ...
        }).catch((error) => {
            alert("Sai mã OTP");
            // User couldn't sign in (bad verification code?)
            // ...
        });
    };







    return (
        <>
            <button type="button" className="button" onClick={() => setOpen(o => !o)}>
                Đánh giá
            </button>
            <Popup open={open}
                   onClose={closeModal}
                   closeOnDocumentClick
                   position={"bottom center"}

            >
                <div className="signup">
                    <div className="signup__content">
                        <div className="signup__container">
                            <div className="signup__title">Đánh giá</div>
                        </div>
                        <div className="signup__subtitle"></div>
                        <div className="signup__form">

                            <Rating
                                style={{ maxWidth: 180 }}
                                initialRating={rating}
                                emptySymbol={<FaStar color="#ddd" />}
                                fullSymbol={<FaStar color="#ffc107" />}
                                onChange={handleRatingChange}
                                fractions={4}
                            />
                            <div>Bạn đánh giá: {rating} sao</div>


                            <form onSubmit={onSignInSubmit}>
                                <div id="sign-in-button"></div>
                                <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange} value={mobile} />
                                <button className="signup__btn" type="submit">Gửi</button>
                            </form>
                            <form onSubmit={onSubmitOTP}>
                                <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange} value={otp} />
                                <div style={{display:"flex", flexWrap:"wrap"}}>
                                    <button className="signup__btn" type="submit">Xác nhận</button>
                                    <button onClick={closeModal}  style={{background:"rgb(153, 51, 0)"}} className="signup__btn" type="button">Hủy</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>


            </Popup>
        </>

    );
}

export default SendOTP;




import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import SendOTP from "./SendOTP";
import firebase from "../ChatBox/firebaseConfig";
import Rating from "react-rating";
import {FaStar} from "react-icons/fa";


function UserListOrder() {


    const [res, setRes] = useState()
    const [totalPage, setTotalPage] = useState(5);
    const [pageContent, setPageContent] = useState()
    const [page, setPage] = useState(0)
    const [empty, setEmpty] = useState(false)
    const options = ['PENDING', 'DELIVERY', 'RECEIVED',"DELETE","ALL"];
    const [status, setStatus] = useState("ALL")
    const [phone,setPhone]  = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const [itemId,setItemId] = useState('')
    const [orderItemId,setOrderItemId] = useState('')

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
            axios.post(`${process.env.REACT_APP_URL_USER_RATE}?itemId=${itemId}&orderItemId=${orderItemId}&rattingValue=${rating}`).then((response)=>{

                console.log(response.data);
                alert("Đánh giá thành công")
                closeModal()
            }).catch((e)=>{
                console.log("error: ",e)
            })
            alert("Thành công ");
            // ...
        }).catch((error) => {
            alert("Sai mã OTP");
            // User couldn't sign in (bad verification code?)
            // ...
        });
    };





    const handleMouseDown = () => {
        setShowPopup(true);
    };

    const handleMouseUp = () => {
        setShowPopup(false);
    };


    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        setStatus(event.target.value)
    }
    const handlePageChange = (page) => {

    };


    function fetchData() {

        axios
            .get(`${process.env.REACT_APP_URL_USER_GET_LIST_ORDER}?phone=${phone}&status=${status}`, {

            })
            .then((response) => {
                console.log("data: ", response.data.data.listOrder);
                setRes(response.data.data.listOrder);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [status])


    useEffect(() => {

        console.log("data:", res)
        console.log("totalPages: ", totalPage)

    }, [totalPage])


    function handleSearch(){
        fetchData()
    }


    useEffect(()=>{

        console.log("itemId: ",itemId)
        console.log("orderItemId: ",orderItemId)
    },[itemId])


    function handleRate() {





    }

    return (
        <>
            <div className="adminListItemContainer">
                <table className="adminListItem">
                    <thead>
                        <select onChange={onOptionChangeHandler}>
                            <option>Chọn</option>
                            {options.map((option, index) => {
                                return <option defaultValue="PENDING" key={index}>
                                    {option}
                                </option>
                            })}
                        </select>
                        <input type="text" value={phone} placeholder="Nhap so dien thoai mua hang" onChange={(e)=>setPhone(e.target.value)}/>
                        <button onClick={handleSearch}>Tìm</button>
                    </thead>

                    <th className="Item_header">
                        <td style={{"flexGrow": "1", width: "50px"}}>STT</td>
                        <td style={{width: "200px"}}>TÊN</td>
                        <td style={{"flexGrow": "2", width: "100px"}}>GIÁ</td>
                        <td style={{"flexGrow": "2", width: "100px"}}>TRẠNG THÁI</td>
                        <td style={{"flexGrow": "5"}}></td>
                    </th>
                    {res && res.map((item, i) => {
                        return (
                            item.foodOrderList.map((food,index)=>{
                                return(
                                    <tr key={i + '-' + index} className="Item">


                                        <td style={{"flexGrow": "1", width: "50px"}}>{i + 1}</td>
                                        <td style={{"flexGrow": "5", width: "200px"}}>{food.name}</td>
                                        <td style={{"flexGrow": "2", width: "100px"}}>{food.price}</td>
                                        <td style={{"flexGrow": "2", width: "100px"}}> <button  disabled={true}
                                                                                                style={item.status == "ON" ? {"background": "#C7390C"} : {"background": "#245618"}}>{item.orderStatus == "PENDING" ? "Duyệt" : item.orderStatus == "DELIVERY" ? "Đã giao" :item.orderStatus == "DELETE"? "Đã hủy":"Đã giao"}</button>
                                        </td>
                                        <td style={{"flexGrow": "5"}}>

                                            {/*{showPopup && <div>Popup content goes here</div>}*/}
                                            <Popup key={index} open={showPopup} trigger={<button key={index}
                                                style={{ background: '#7F4F40' }}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}

                                            >detail</button>} position="bottom center">
                                                <div className='popup'>
                                                    <ul>
                                                        {item.foodOrderList.map((f)=>{
                                                            return(
                                                                <li style={{fontWeight:"bold"}}>Tên : {f.name} Giá: {f.price} Số lượng: {f.quantity}</li>

                                                            )
                                                        })}
                                                        <li>Địa chỉ: {item.customerAddress}</li>
                                                        <li>Thời gian đặt hàng : {item.orderDatetime}</li>
                                                        <li>Phương thức nhận hàng: {item.method == "restaurant"? "tại cửa hàng":"tại nhà"}</li>
                                                    </ul>
                                                </div>
                                            </Popup>

                                            <button disabled={food.rated== true?"none":""} style={{background:food.rated?"gray": "blueviolet", cursor:"pointer"}}   onClick={() =>{ setOpen(o => !o)
                                            setMobile(phone)
                                                setItemId(food.id)
                                                setOrderItemId(item.foodOrderId)
                                            }}>
                                                Đánh giá
                                            </button>
                                            <Popup open={open}
                                                   onClose={closeModal}
                                                    closeOnDocumentClick={false}
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
                                                                    <button  className="signup__btn" type="submit">Xác nhận</button>
                                                                    <button onClick={closeModal}  style={{background:"rgb(153, 51, 0)"}} className="signup__btn" type="button">Hủy</button>
                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>


                                            </Popup>

                                        </td>
                                    </tr>

                                )
                            })
                        )
                    })}

                </table>


            </div>


        </>
    )
}
export default UserListOrder;
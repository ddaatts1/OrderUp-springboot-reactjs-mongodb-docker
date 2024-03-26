import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "./Cart";
import "./Cart.css"
import subtract from './remove.png'
import plus from './plus.png'
import deleteI from './delete.png'
import axios from "axios";
import {useFetcher} from "react-router-dom";

function DisplayCart() {

    const {cartItems, removeFromCart, plusQuantity, subtractQuantity} = useContext(CartContext);
    const [quantity, setQuantity] = useState(1)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
    const [note, setNote] = useState("")
    const [method, setMethod] = useState("house")
    const [from,setFrom] = useState('')
    const [to,setTo] = useState('')
    const [shippingFee,setShippingFee] = useState(0)
    // Function to handle Remove from Cart button click
    const handleRemoveFromCart = (item) => {
        removeFromCart(item);

    };


    function handlePlusQuantity(item) {
        plusQuantity(item)
    }

    function handleSubtractQuantity(item) {
        subtractQuantity(item)
    }

    useEffect(() => {
        // console.log("name: ",name)
        // console.log("method: ",method)
    }, [name, method])



    useEffect(()=>{

        const  t = localStorage.getItem("address");
        const cart = JSON.parse(localStorage.getItem('cart'));
        if( cart != null){
            const   f = cart[0].resAddress;
            setFrom(f)
            setTo(t)

        }

    },[])

    useEffect(()=>{

            console.log("from: ",from)
            console.log("to: ",to)
        const f = localStorage.getItem("address");
        if(f == null){
            alert("Vui lòng nhập địa chỉ của bạn")
        }else {

            axios.post(`${process.env.REACT_APP_URL_USER_GET_SHIPPING_FEE}`,{
                from: from,
                to:to
            })
                .then((response)=>{
                    console.log("shipping fee response: ",response)
                    setShippingFee(response.data.data)
                })
        }

    },[to])

    // useEffect(()=>{
    //     console.log("from: ",from)
    //     console.log("to: ",to)
    //
    // },[to])




    function buy() {

        const t = localStorage.getItem("address")
        if(t == '' || t == null){
            alert("Vui lòng nhập vị trí của bạn ")

        }else if(name ==''){
            alert("Vui lòng nhập tên ")

        }else if(phone == ''){
            alert("Vui lòng nhập số điện thoại ")

        }

        else {
            const items = JSON.parse(localStorage.getItem("cart"));

            const payload = {

                name: name,
                phone: phone,
                method: method,
                note: note,
                address_lat: 0,
                address_long: 0,
                address_detail: localStorage.getItem("address"),
                items: items.map((i) => {
                    return {
                        _id: i._id,
                        quantity: i.quantity,
                        restaurantId: i.restaurantId
                    }
                })

            }

            console.log("payload: ", payload)
            axios.post(process.env.REACT_APP_URL_USER_ORDER,payload)
                .then((response)=>{
                    console.log("response: ",response)
                    alert("Mua hàng thành công ")
                })
        }

    }


    return (
        <div className="containerCart">
            <div className="cart">

                <div className="divLeft">
                    <h2>Giỏ hàng</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <span className="image">
                                    <img style={{objectFit: "cover"}}
                                         src={item.image_url }/>
                                    </span>
                                <div className="namePrice">
                                    <span className="name">{item.name}</span>
                                    <div className="plusDelete">
                                        <div className="quantity">
                                            <img onClick={() => {
                                                handleSubtractQuantity(item)
                                            }} style={{width: "25px", height: "25px", marginRight: "15px"}}
                                                 src={subtract} alt="subtract"/>
                                            <span>{item.quantity}</span>
                                            <img onClick={() => {
                                                handlePlusQuantity(item)
                                            }} style={{width: "25px", height: "25px", marginLeft: "15px"}} width="25px"
                                                 height="25px" src={plus} alt="plus"/>

                                        </div>

                                        <span style={{float: "right"}}>{item.price * item.quantity}</span>
                                        <img onClick={() => handleRemoveFromCart(item)}
                                             style={{width: "25px", height: "25px", marginLeft: "10px"}} width="25px"
                                             height="25px" src={deleteI} alt="plus"/>
                                    </div>

                                </div>

                            </li>
                        ))}
                    </ul>
                    <div className="shipping">
                        <span>Phí ship: {shippingFee }</span></div>
                </div>
                <div className="divRight">
                    <div className="label"><span> Thông tin khách hàng</span></div>
                    <div className="hotenSDT">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                               placeholder="Họ và tên"/>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                               placeholder="Số điện thoại"/>
                    </div>
                    <div className="radioButton">
                        <span><input checked={method === "restaurant" ? true : false}
                                     onChange={(e) => setMethod(e.target.value)} id="restaurant" type="radio"
                                     value="restaurant" name="method"/> <label
                            htmlFor="restaurant">Nhận tại cửa hàng</label> </span>
                        <span><input checked={method === "house" ? true : false}
                                     onChange={(e) => setMethod(e.target.value)} id="house" type="radio" value="house"
                                     name="method"/><label htmlFor="house">Giao tận nơi</label></span>
                    </div>
                    <div className="note">
                        <textarea value={note} onChange={(e) => setNote(e.target.value)} className="note"
                                  placeholder="Ghi chú"></textarea>
                    </div>
                    <div className="confirm">
                        <button onClick={() => {
                            buy()
                        }}>Mua hàng
                        </button>

                    </div>
                </div>


            </div>

        </div>
    );


}

export default DisplayCart;
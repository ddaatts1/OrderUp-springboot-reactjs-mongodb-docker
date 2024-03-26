import Rating from "react-rating";
import {useContext, useEffect, useState} from "react";
import { FaStar } from "react-icons/fa";
import "./FoodDetail.css"
import Footer from "../HomePage/Footer";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {auth, db} from "../ChatBox/firebaseConfig";
import {CartContext} from "../Cart/Cart";
import firebase from "firebase/compat/app";
import {useNavigate} from "react-router";
import {useAuth} from "../Context/useAuth";
import {addDoc, collection} from "@firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
const FoodDetail = () => {
    const [rating, setRating] = useState(4);
    const [searchParam,setSearchParam] = useSearchParams();
    const [product,setProduct]= useState({})
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const handleAddToCart = (product) => {
        addToCart(product);
        alert("sản phẩm đã thêm vào giỏ hàng ")
    };


    useEffect(()=>{

        const  id = searchParam.get("id")
        console.log("id: ",id)

        axios.get(`${process.env.REACT_APP_URL_USER_GET_ITEM_DETAIL}?id=${id}`,{})
            .then((response)=>{
                console.log("response: ",response)
                setProduct(response.data.data)
            })
    },[])


    // const signInWithGoogle = () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     auth.signInWithPopup(provider);
    // }
    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log("Current user:", user);
                sendMessage(result.user)
                navigate("/chat")
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    };

   async function chatWithRes() {
        if(user){
            await sendMessage(user)
            navigate("/chat")
        }else {
           await signInWithGoogle()

        }
    }



    const sendMessage = async (user) => {
        // e.preventDefault();

        const { uid, photoURL, displayName } = user;

        await addDoc(collection(db, "messages"), {
            text: "👋",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            toUser: product.restaurant.uid,
            photoURL
        });

    }

    return (

         <div className="foodDetailContainer">
            <div className="foodDetail">
                <div className="foodImage">

                    <img src={product.image}/>
                </div>
                <div className="foodInfo">
                    <div className="foodName">{product.name} </div>
                    <div className="foodRating">
                        <Rating
                            readonly="readonly"
                            style={{ maxWidth: 180 }}
                            initialRating={product.rating}
                            emptySymbol={<FaStar color="#ddd" />}
                            fullSymbol={<FaStar color="#ffc107" />}
                        />
                    </div>
                    <div className="foodNote">
                        <div>Thanh toán thẻ tín dụng Sacombank: Giảm 15% tối đa 30K cho đơn từ 80K
                            vào tất cả các ngày trong tuần</div>

                    </div>
                    <div className="foodTime">Mở bán : 9.00 am - 12 pm</div>
                    <div className="foodPrice">{product.price}</div>
                    <div className="addToCart">
                        <button onClick={()=>{handleAddToCart({image :"",
                            _id:product._id,
                            resAddress: product.restaurant.address,
                            image_url:product.image,
                            name:product.name,
                                ordered:1,
                            price:product.price,
                            restaurantId: product.restaurant._id

                        })}}>Thêm vào giỏ hàng</button>
                        <button onClick={()=>{chatWithRes()}}  >Chat</button>
                    </div>
                </div>
            </div>
            <div className="relateItem">
                {product.relateItemList &&product.relateItemList.map((r,index)=>{
                    return(
                        <div key={index}  className="relateItemCard">
                            <div className="relateItemImage">
                                <img src={r.image}/>
                            </div>
                            <div className="relateItemInfo">

                                <div> {r.name}</div>
                                <div>{r.price} vnd</div>
                            </div>
                            <div className="relateItemButton">
                                <button onClick={()=>{handleAddToCart({image :r.image,
                                    _id:r._id,
                                    image_url:r.image_url,
                                    name:r.name,
                                    ordered:1,
                                    price:r.price,
                                    restaurantId: product.restaurant._id
                                })}}>Thêm vào giỏ hàng</button>
                            </div>
                        </div>

                    )
                })}


            </div>
            <Footer/>
        </div>


    );
};

export default FoodDetail;

// CartContext.js
import React, {createContext, useReducer, useEffect, useContext, useState} from "react";
import '../Listfood/Listfood.css'

// Define cart reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            add({ ...action.payload, quantity: 1 });
            console.log("add to cart",{ ...action.payload, quantity: 1 })
            return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
            case "REMOVE_FROM_CART":
            remove(action.payload)
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                ),
            };
        case "LOAD_CART":
            return {
                ...state, cartItems: action.payload
            };
        case "PLUS_QUANTITY":
                plusQuantity({...action.payload,quantity:action.payload.quantity+1})
            let items1 = JSON.parse(localStorage.getItem("cart"));
            const index1 = items1.findIndex(existingItem => existingItem._id === action.payload._id);
            console.log("index: ",index1)
            if (index1 !== -1) {
                state.cartItems[index1] = {...action.payload,quantity:action.payload.quantity+1};
            }
            return {...state};
        case "SUBTRACT_QUANTITY":
            subtractQuantity({...action.payload,quantity:action.payload.quantity >0 ?action.payload.quantity-1:0})
            let items = JSON.parse(localStorage.getItem("cart"));
            const index = items.findIndex(existingItem => existingItem._id === action.payload._id);
            console.log("index: ",index)
            if (index !== -1) {
                state.cartItems[index] = {...action.payload,quantity:action.payload.quantity >0 ?action.payload.quantity-1:0};
            }

            return {...state};
            default:
            return state;
    }


    function subtractQuantity(item){
        let items = JSON.parse(localStorage.getItem("cart"));
        const index = items.findIndex(existingItem => existingItem._id === item._id);
        if (index !== -1) {
            items[index] = item;
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }
    function plusQuantity(item){
        let items = JSON.parse(localStorage.getItem("cart"));
        const index = items.findIndex(existingItem => existingItem._id === item._id);
        if (index !== -1) {
            items[index] = item;
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }
    function remove(item){
        let items = JSON.parse(localStorage.getItem("cart"));
        items = items.filter((i)=>
            i._id != item._id
        )
        localStorage.setItem("cart", JSON.stringify(items));

    }

    function add(item) {

        console.log("items: ", item);
        let items = JSON.parse(localStorage.getItem("cart"));


        if (items) {
            const idExists = items.some(i => i._id === item._id);
            if(!idExists){
                items = [...items, item];
                localStorage.setItem("cart", JSON.stringify(items));
            }

        } else {
                items = [item];
                localStorage.setItem("cart", JSON.stringify(items));

        }
    }
};

// Create a Cart Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    const [saveC,setSaveC] = useState()
    // Function to add item to cart
    const addToCart = (item) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
    };

    // Function to remove item from cart
    const removeFromCart = (item) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: item });
    };
    const plusQuantity = (item) => {
        dispatch({ type: "PLUS_QUANTITY", payload: item });
    };
    const subtractQuantity = (item) => {
        dispatch({ type: "SUBTRACT_QUANTITY", payload: item });
    };

    // Retrieve cart data from local storage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        console.log("savedCArt: ",savedCart)
        if (savedCart) {
                console.log('This will run after 1 second!')
                dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
        }
    }, []);


    return (
        <CartContext.Provider
            value={{ cartItems: state.cartItems, addToCart, removeFromCart,plusQuantity,subtractQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Component that displays the Cart
export const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);

    // Function to handle Remove from Cart button click
    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
    };

    function buy(){
        const items = JSON.parse(localStorage.getItem("cart"));

        console.log("cart: ",items)
    }

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.name}{" "}
                        <button onClick={() => handleRemoveFromCart(item)}>
                            Remove from Cart
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={()=>{buy()}}>buy</button>
        </div>
    );
};


// Component that uses the Cart Context
export const ProductItem = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    // Function to handle Add to Cart button click
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <a className="card" href='#' onClick={handleAddToCart}>
            <div className="image">
                <div>
                    <img
                        src='https://media.istockphoto.com/id/1207976129/vi/anh/cận-cảnh-gà-rán-trên-đĩa-trắng-cách-ly-trên-bàn-nhìn-yummy-và-màu-vàng-vàng.jpg?s=612x612&w=0&k=20&c=HqgqDDPQJgee2FZRLCUuKu8Rp36VQT_QinNFE97UPcA='></img>
                </div>

            </div>
            <div className="name">
                <span>Crsipy Rava </span>
            </div>
            <div className="infor">
                <div className='container'>
                    <div className='box'>
                        <span style={{marginTop: "5px", color: "grey", fontSize: "10px"}}>Price</span>
                        <span>{product.price}</span>
                    </div>
                    <div className="line"></div>
                    <div className='box'>
                        <span style={{marginTop: "5px", color: "grey", fontSize: "10px"}}>Rate</span>
                        <span>{product.rate} <span className='icon'></span></span>
                    </div>
                    <div className="line"></div>
                    <div className='box'>
                        <span style={{marginTop: "5px", color: "grey", fontSize: "10px"}}>Ordered</span>
                        <span>{product.Ordered}</span>
                    </div>

                </div>

            </div>
        </a>

    );
};
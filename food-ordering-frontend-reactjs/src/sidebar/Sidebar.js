/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faSearch,
    faEnvelope,
    faBell,
    faUser,
    faCartShopping,
    faPizzaSlice,
    faCircleInfo,
    faUtensilSpoon,
    faUtensils,
    faMessage
} from "@fortawesome/free-solid-svg-icons";
import './Sidebar.css'
import {Link} from "react-router-dom";
// const Sidebar = () => {
//     const [choose, setChoose] = useState("Home");
//
//     const [displayCart,setDisplayCart] = useState(false);
//     const toggleIcon = (x) => {
//         setChoose(x);
//     };
//
//     return (
//         <ul className="list_icon">
//             <li >
//                 <a href="#"
//                     style={{ borderLeft: choose === "Home" ? "2px solid white" : "" }}
//                     onClick={() => toggleIcon("Home")}
//                 >
//                     <FontAwesomeIcon icon={faHome} style={{ color: "white" }} />
//                 </a>
//             </li>
//             <li>
//                 <a href="#"
//                     style={{ borderLeft: choose === "Pizza" ? "2px solid white" : "" }}
//                     onClick={() => toggleIcon("Pizza")}>
//                     <FontAwesomeIcon icon={faPizzaSlice} style={{ color: "white" }} />
//                 </a>
//             </li>
//             <li>
//                 <a href="#"
//                     style={{ borderLeft: choose === "faUtensils" ? "2px solid white" : "" }}
//                     onClick={() => toggleIcon("faUtensils")}>
//                     <FontAwesomeIcon icon={faUtensils} style={{ color: "white" }} />
//                 </a>
//             </li>
//             <li>
//                 <Link to="/management/Items"
//                       style={{ borderLeft: choose === "faUtensils" ? "2px solid white" : "" }}
//                       onClick={() => toggleIcon("faUtensils")}
//                       choose={choose}
//                 >
//                     <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} />
//                 </Link>
//                 <a href="#"
//                     style={{ borderLeft: choose === "Cart" ? "2px solid white" : "" }}
//                     onClick={() => toggleIcon("Cart")}
//                 >
//                 </a>
//             </li>
//             <li>
//                 <a href="#"
//                     style={{ borderLeft: choose === "Infor" ? "2px solid white" : "" }}
//                     onClick={() => toggleIcon("Infor")}>
//                     <FontAwesomeIcon icon={faCircleInfo} style={{ color: "white" }} />
//                 </a>
//             </li>
//         </ul>
//     );
// };


const Sidebar = () => {
    const [choose, setChoose] = useState("Home");

    const toggleIcon = (x) => {
        setChoose(x);
    };


    useEffect(()=>{
        console.log("choose: ",choose)
    })


    return (
        <ul className="list_icon">
            <li >
                <Link to="/"
                      style={{ borderLeft: choose === "Home" ? "2px solid white" : "" }}
                      onClick={() => toggleIcon("Home")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faHome} style={{ color: "white" }} />
                </Link>
            </li>
            <li>
                <Link to=""
                      style={{ borderLeft: choose === "Pizza" ? "2px solid white" : "" }}
                      onClick={() => toggleIcon("Pizza")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faPizzaSlice} style={{ color: "white" }} />
                </Link>
            </li>
            <li>
                <Link to="/cart"
                      style={{ borderLeft: choose === "faUtensils" ? "2px solid white" : "" }}
                      onClick={() => toggleIcon("faUtensils")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} />

                </Link>
            </li>

            <li>
                <Link to="/chat"
                      style={{ borderLeft: choose === "Cart" ? "2px solid white" : "" }}
                      onClick={() => toggleIcon("Cart")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
                </Link>
            </li>
            <li>
                <Link to="/order"
                   style={{ borderLeft: choose === "Infor" ? "2px solid white" : "" }}
                   onClick={() => toggleIcon("Infor")}
                   choose={choose}
                >
                    <FontAwesomeIcon icon={faCircleInfo} style={{ color: "white" }} />
                </Link>
            </li>
        </ul>
    );
};
export default Sidebar;

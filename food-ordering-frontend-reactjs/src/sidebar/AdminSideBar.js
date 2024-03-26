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
    faEdit, faMessage, faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import './Sidebar.css'
import {Link} from "react-router-dom";
const AdminSideBar = () => {
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
                <Link to="/management/"
                   style={{ borderLeft: choose === "Home" ? "2px solid white" : "" }}
                   onClick={() => toggleIcon("Home")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faHome} style={{ color: "white" }} />
                </Link>
            </li>
            <li>
                <Link to="/management/add"
                   style={{ borderLeft: choose === "Pizza" ? "2px solid white" : "" }}
                   onClick={() => toggleIcon("Pizza")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faPizzaSlice} style={{ color: "white" }} />
                </Link>
            </li>
            <li>
                <Link to="/management/Items"
                   style={{ borderLeft: choose === "faUtensils" ? "2px solid white" : "" }}
                   onClick={() => toggleIcon("faUtensils")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faUtensils} style={{ color: "white" }} />
                </Link>
            </li>

            <li>
                <Link to="/management/chat"
                      style={{ borderLeft: choose === "Cart" ? "2px solid white" : "" }}
                      onClick={() => toggleIcon("Cart")}
                      choose={choose}
                >
                    <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
                </Link>
            </li>
            <li>
                <a href="/management/order"
                   style={{ borderLeft: choose === "Infor" ? "2px solid white" : "" }}
                   onClick={() => toggleIcon("Infor")}
                   choose={choose}
                >
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: "white" }} />
                </a>
            </li>
        </ul>
    );
};

export default AdminSideBar;

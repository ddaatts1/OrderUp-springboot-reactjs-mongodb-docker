import {Outlet, Router} from "react-router";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import AddItem from "./AddEditItem/AddItem";
import Login from "../GoogleRecaptcha/LoginForm";
import RegisterForm from "../Register/RegisterForm";
import OTPForm from "../Register/OTPForm";
import FoodDetail from "../FoodDetail/FoodDetail";
import AdminSideBar from "../sidebar/AdminSideBar";
import AdminNavbar from "./AddEditItem/AdminNavbar";


function AdminManagement(){

    return(
        <>
        <div>

            <AdminSideBar/>
            <AdminNavbar/>
            <Outlet/>

        </div>



        </>

    )
}

export default AdminManagement;
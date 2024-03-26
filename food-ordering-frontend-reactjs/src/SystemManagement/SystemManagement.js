import AdminSideBar from "../sidebar/AdminSideBar";
import AdminNavbar from "../Admin/AddEditItem/AdminNavbar";
import {Outlet} from "react-router";
import SystemSideBar from "../sidebar/SystemSideBar";


function SystemManagement(){

    return(
        <div>

            <SystemSideBar/>
            <AdminNavbar/>
            <Outlet/>

        </div>
    )
}

export default SystemManagement;
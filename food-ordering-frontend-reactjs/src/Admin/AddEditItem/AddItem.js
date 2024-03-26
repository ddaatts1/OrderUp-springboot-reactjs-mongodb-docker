import AdminNavbar from "./AdminNavbar";
import AddBox from "./AddBox";
import AdminSideBar from "../../sidebar/AdminSideBar";


function  AddItem(){

    return(
        <div>
            <AdminSideBar/>
            <AdminNavbar/>
            <AddBox/>
        </div>
    )
}


export  default AddItem;
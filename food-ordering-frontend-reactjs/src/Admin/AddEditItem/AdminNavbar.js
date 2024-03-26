import './AddItemNavbar.css'
import {useAuth} from "../../Context/useAuth";

const AdminNavbar = () => {

    const  {logout} = useAuth();

    const doLogout=()=>{
        logout();
    }

    return (
        <div className="AddItemNavbar">
            <div className='Name'>
                <span>OrderUp!</span>
            </div>
            <span className="infor"><button type="button" onClick={doLogout}>logout</button></span>
        </div>
    )

}

export default AdminNavbar;
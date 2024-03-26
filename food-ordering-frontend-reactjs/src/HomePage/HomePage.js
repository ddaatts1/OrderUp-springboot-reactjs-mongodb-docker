import Catolog from "../Catolog/Catolog";
import Listfood from "../Listfood/Listfood";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import {Outlet} from "react-router";


const HomePage = () => {

    return (

        <div className="App">
            <Sidebar/>
            <Navbar/>
            <Outlet/>

        </div>
    );
}

export default HomePage;
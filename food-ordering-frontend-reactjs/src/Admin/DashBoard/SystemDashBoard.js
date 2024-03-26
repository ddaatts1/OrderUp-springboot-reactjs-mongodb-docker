import './DashBoard.css'
import {useEffect, useState} from "react";
import axios from "axios";

function SystemDashBoard(){
    const  [stats,setStats] = useState({})
    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{

        const token = localStorage.getItem("token")
        axios.get(process.env.REACT_APP_URL_SYSTEM_GET_ALL_STAT,{
            headers: {
                authorization:
                    `Bearer ${token}`
            },
        })
            .then((response)=>{
                console.log(response)
                setStats(response.data.data)
            })
    },[])

    useEffect(()=>{
        console.log("stats: ",stats)
    },[stats])
    return(
        <div className="dashboard">

            <div className="order">
                <div className="div1">
                <span className="icon_product">
                </span>
                    <span className="title">
                    <span className="text" style={{color:"green"}}>
                        Nhà hàng
                    </span>
                    <span className="number" >
                        {stats.resCount}
                    </span>
                </span>
                </div>

                <div className="div2">
                <span className="text_div2" style={{color:"green"}}>
                    RESTAURANTS
                </span>
                </div>

            </div>

            <div className="order">
                <div className="div1">
                <span className="icon_order">
                </span>
                    <span className="title">
                    <span className="text">
                        Sản phẩm
                    </span>
                    <span className="number">
                        {stats.itemCount}
                    </span>
                </span>
                </div>

                <div className="div2">
                <span className="text_div2">
                    PRODUCTS
                </span>
                </div>

            </div>


            <div className="order">
                <div className="div1">
                <span className="icon_viewer">
                </span>
                    <span className="title">
                    <span className="text" style={{color: "#17096D"}}>
                        Nhà hàng mới
                    </span>
                    <span className="number">
                        {stats.newResCount}
                    </span>
                </span>
                </div>

                <div className="div2">
                <span className="text_div2" style={{color: "#17096D"}} >
                    NEW RESTAURANTS
                </span>
                </div>

            </div>


        </div>

    )
}


export  default SystemDashBoard;
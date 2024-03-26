import './DashBoard.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import { ReactComponent as Loader } from './load.svg'

function DashBoard() {


    const [stats, setStats] = useState({})
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        const token = localStorage.getItem("token")
        axios.get(process.env.REACT_APP_URL_ADMIN_GET_STATS, {
            headers: {
                authorization:
                    `Bearer ${token}`
            },
        })
            .then((response) => {
                console.log(response)
                setStats(response.data.data.stats)
            })
    }, [])

    useEffect(() => {
        console.log("stats: ", stats)
    }, [stats])

    async  function exportReport() {
        setIsLoading(true)
        const token = localStorage.getItem("token")
      await  axios.get(process.env.REACT_APP_URL_ADMIN_GET_REPORT, {
            headers: {
                authorization:
                    `Bearer ${token}`
            },
        })
            .then((response) => {
                setIsLoading(false)
                console.log(response)
                alert(response.data.data)
            })
    }

    return (
        <div className="dashboard">
            <div className="order">
                <div className="div1">
                <span className="icon_order">
                </span>
                    <span className="title">
                    <span className="text">
                        Đơn Hàng
                    </span>
                    <span className="number">
                        {stats.order}
                    </span>
                </span>
                </div>

                <div className="div2">
                <span className="text_div2">
                    ORDERS
                </span>
                </div>

            </div>

            <div className="order">
                <div className="div1">
                <span className="icon_product">
                </span>
                    <span className="title">
                    <span className="text" style={{color: "green"}}>
                        Sản Phẩm
                    </span>
                    <span className="number">
                        {stats.product}
                    </span>
                </span>
                </div>

                <div className="div2">
                <span className="text_div2" style={{color: "green"}}>
                    PRODUCTS
                </span>
                </div>

            </div>

            <div className="order">
                <div className="div1">
                <span className="icon_viewer">
                </span>
                    <span className="title">
                        {!isLoading ?<span onClick={exportReport} className="text" style={{color: "#17096D", cursor: "pointer"}}>
                        Nhấn vào để xuất báo cáo
                    </span> : <Loader className="spinner"/>}

                    <span className="number">

                    </span>
                </span>
                </div>

                <div className="div2">
                <span className="text_div2" style={{color: "#17096D"}}>
                    REPORT
                </span>
                </div>

            </div>


        </div>

    )
}

export default DashBoard;
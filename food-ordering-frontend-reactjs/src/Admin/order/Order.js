import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";


function Order() {


    const [res, setRes] = useState()
    const [totalPage, setTotalPage] = useState(5);
    const [pageContent, setPageContent] = useState()
    const [page, setPage] = useState(0)
    const [empty, setEmpty] = useState(false)
    const options = ['PENDING', 'DELIVERY', 'RECEIVED',"DELETE"];
    const [status, setStatus] = useState("PENDING")
    const [showPopup, setShowPopup] = useState(false);

    const handleMouseDown = () => {
        setShowPopup(true);
    };

    const handleMouseUp = () => {
        setShowPopup(false);
    };


    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
        setStatus(event.target.value)
    }
    const handlePageChange = (page) => {

    };


    function fetchData() {

        const token = localStorage.getItem("token")
        console.log("token", token)
        axios
            .get(`${process.env.REACT_APP_URL_ADMIN_GET_LIST_ORDER}?status=${status}`, {
                headers: {
                    authorization:
                        `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log("data: ", response.data.data.listOrder);
                setRes(response.data.data.listOrder);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [status])


    useEffect(() => {

        console.log("data:", res)
        console.log("totalPages: ", totalPage)

    }, [totalPage])

    // useEffect(() => {
    //     handlePageChange(0);
    // }, []);


    function changeStatus(id, status) {

        const requestData = {
            _id: id,
            status: status
        }
        const token = localStorage.getItem("token")
        console.log("requestData: ", requestData)
        axios.post(process.env.REACT_APP_URL_ADMIN_CHANGE_ORDER_STATUS, requestData, {
                headers: {
                    authorization:
                        `Bearer ${token}`,
                },
            }
        ).then((response) => {
            console.log("on off response: ", response)
            if (response.data.code == 1) {
                alert("thanh cong ")
                fetchData()
            } else {
                alert("that bai!")
            }
        }).catch((error) => {
            alert("that bai")
        })

    }


    function deleteItem(_id) {

        const token = localStorage.getItem("token")
        console.log("item delete: ", _id)
        axios.post(`${process.env.REACT_APP_URL_ADMIN_DELETE_ITEM}?id=${_id}`, "", {
                headers: {
                    authorization:
                        `Bearer ${token}`,
                },
            }
        ).then((response) => {
            console.log("delete response: ", response)
            if (response.data.code == 1) {
                alert("delete thanh cong ")
                fetchData()
            } else {
                alert("delete that bai!")
            }
        }).catch((error) => {
            alert("delete that bai")
        })

    }


    return (
        <>
            <div className="adminListItemContainer">


                <table className="adminListItem">
                    <header>
                        <select onChange={onOptionChangeHandler}>

                            <option>Chọn</option>
                            {options.map((option, index) => {
                                return <option defaultValue="PENDING" key={index}>
                                    {option}
                                </option>
                            })}
                        </select>
                    </header>

                    <th className="Item_header">
                        <td style={{"flexGrow": "1", width: "50px"}}>STT</td>
                        <td style={{width: "200px"}}>TÊN</td>
                        <td style={{"flexGrow": "2", width: "100px"}}>SDT</td>
                        <td style={{"flexGrow": "2", width: "100px"}}>TRẠNG THÁI</td>
                        <td style={{"flexGrow": "5"}}></td>
                    </th>
                    {res && res.map((item, i) => {
                        return (
                            <tr key={i} className="Item">
                                <td style={{"flexGrow": "1", width: "50px"}}>{i + 1}</td>
                                <td style={{"flexGrow": "5", width: "200px"}}>{item.customerName}</td>
                                <td style={{"flexGrow": "2", width: "100px"}}>{item.customerPhone}</td>
                                <td style={{"flexGrow": "2", width: "100px"}}>{item.orderStatus}</td>
                                <td style={{"flexGrow": "5"}}>
                                    <button onClick={() => {
                                        changeStatus(item.foodOrderId, item.orderStatus === "PENDING" ? "DELIVERY" : item.orderStatus == "DELIVERY" ? "RECEIVED" : "")
                                    }} disabled={item.orderStatus == "RECEIVED" ||item.orderStatus == "DELETE" }
                                            style={item.status == "ON" ? {"background": "#C7390C"} : {"background": "#245618"}}>{item.orderStatus == "PENDING" ? "Duyệt" : item.orderStatus == "DELIVERY" ? "Đã giao" :item.orderStatus == "DELETE"? "Đã hủy":"Đã giao"}</button>

                                    {/*{showPopup && <div>Popup content goes here</div>}*/}
                                    <Popup open={showPopup} trigger={<button
                                        style={{ background: '#7F4F40' }}
                                        onMouseDown={handleMouseDown}
                                        onMouseUp={handleMouseUp}

                                    >detail</button>} position="bottom center">
                                        <div className='popup'>
                                            <ul>
                                                {item.foodOrderList.map((f)=>{
                                                    return(
                                                        <li style={{fontWeight:"bold"}}>Tên : {f.name} Giá: {f.price} Số lượng: {f.quantity}</li>

                                                    )
                                                })}
                                                <li>Địa chỉ: {item.customerAddress}</li>
                                                <li>Thời gian đặt hàng : {item.orderDatetime}</li>
                                                <li>Phương thức nhận hàng: {item.method == "rétaurant"? "tại cửa hàng":"tại nhà"}</li>
                                            </ul>
                                        </div>
                                    </Popup>

                                    <button  onClick={() => {
                                        changeStatus(item.foodOrderId,"DELETE")
                                    }} style={{"background": "#000000",display:item.orderStatus == "PENDING"?"":"none"}}>hủy
                                    </button>

                                </td>
                            </tr>
                        )
                    })}

                    {/*<div className="pagination" >*/}

                    {/*    {  [...Array(totalPage)].map((i, index) => {*/}
                    {/*        return (*/}
                    {/*            <button className={`pageButton ${page === index ? 'active' : ''}`} key={index} onClick={() => setPage(index)}>*/}
                    {/*                {index + 1}*/}
                    {/*            </button>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</div>*/}

                </table>


            </div>


        </>
    )
}


export default Order;

import "./AdminListItems.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

function AdminListItems(){


    const [res,setRes] = useState()
    const [totalPage,setTotalPage] = useState(5);
    const [pageContent, setPageContent] = useState()
    const [page, setPage] = useState(0)
    const [empty, setEmpty] = useState(false)
    const navigate = useNavigate()
    const handlePageChange = (page) => {

    };



    function fetchData(){

        const token = localStorage.getItem("token")
        axios
            .get(`${process.env.REACT_APP_URL_ADMIN_GET_ITEMS}?page=${page}`, {
                headers: {
                    authorization:
                    `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log("data: ", response.data.data);
                setRes(response.data.data);
                const totalPages = response.data.data.totalPages ;
                if (totalPages <= 42) {
                    console.log("totalPages test: ",totalPages)
                    setTotalPage(totalPages);
                } else {
                    console.log("totalPages test: ",totalPages)


                    setTotalPage(42);
                }            })
            .catch((error) => {
                console.log(error);
                navigate("/login")
            });
    }
    useEffect(()=>{
       fetchData()
    },[page])


    useEffect(()=>{

        console.log("data:",res)
        console.log("totalPages: ",totalPage)

    },[totalPage])

    // useEffect(() => {
    //     handlePageChange(0);
    // }, []);


    function changeStatus(id,status){

        const requestData = {
            _id:id,
            status: status
        }
        const token = localStorage.getItem("token")
        console.log("requestData: ",requestData)
        axios.post(process.env.REACT_APP_URL_ADMIN_ON_OFF_ITEM,requestData,{
                headers: {
                    authorization:
                        `Bearer ${token}`,
                },
            }
            ).then((response)=>{
                console.log("on off response: ",response)
                if(response.data.code == 1){
                    alert("thanh cong ")
            fetchData()
                }
                else {
                    alert("that bai!")
                }
        }).catch((error)=>{
            alert("that bai")
        })

    }



    function deleteItem(_id){

        const token = localStorage.getItem("token")
        console.log("item delete: ",_id)
        axios.post(`${process.env.REACT_APP_URL_ADMIN_DELETE_ITEM}?id=${_id}`,"",{
                headers: {
                    authorization:
                        `Bearer ${token}`,
                },
            }
        ).then((response)=>{
            console.log("delete response: ",response)
            if(response.data.code == 1){
                alert("delete thanh cong ")
                fetchData()                }
            else {
                alert("delete that bai!")
            }
        }).catch((error)=>{
            alert("delete that bai")
        })

    }


    return (
        <>
        <div className="adminListItemContainer">


            <table className="adminListItem">
                <th className="Item_header">
                    <td style={{"flexGrow":"1",width:"50px"}} >STT</td>
                    <td style={{width:"200px"}}>TÊN</td>
                    <td style={{"flexGrow":"2",width:"100px"}}>GIÁ</td>
                    <td style={{"flexGrow":"2",width:"100px"}}>TRẠNG THÁI</td>
                    <td style={{"flexGrow":"5"}}></td>
                </th>
                {res && res.content.map((item,i)=>{
                    return(
                        <tr key={i} className="Item">
                            <td style={{"flexGrow":"1",width:"50px"}}>{i+1}</td>
                            <td style={{width:"200px"}}>{item.name}</td>
                            <td style={{"flexGrow":"2",width:"100px"}}>{item.price}</td>
                            <td style={{"flexGrow":"2",width:"100px"}}>{item.status}</td>
                            <td style={{"flexGrow":"5"}}>
                                <button onClick={()=>{changeStatus(item._id,item.status==="ON"?"OFF":"ON")}}  style={item.status == "ON"?{"background":"#C7390C"}:{"background":"#245618"}}>{item.status == "ON"? "off":"on"}</button>
                                <button style={{"background":"#7F4F40"}} ><Link style={{"color":"white"}} to={`EditItem?_id=${item._id}`}>edit</Link></button>

                                <button onClick={()=>{deleteItem(item._id)}} style={{"background":"#000000"}}>delete</button>

                            </td>
                        </tr>
                    )
                })}

                <div className="pagination" >

                    {  [...Array(totalPage)].map((i, index) => {
                        return (
                            <button className={`pageButton ${page === index ? 'active' : ''}`} key={index} onClick={() => setPage(index)}>
                                {index + 1}
                            </button>
                        )
                    })}
                </div>

            </table>


            </div>


        </>
    )
}


export default AdminListItems;
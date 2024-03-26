import React, {useEffect, useRef, useState} from "react";
import validator from "validator";
import "./AddBox.css"
import axios from "axios";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import {useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router";
import Select from "react-select";



function  SystemEdit(){

    const [image, setImage] = useState(null);
    const filepickerRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [item,setItem] =useState(null)
    const  [name,setName ]= useState("");
    const [price,setPrice] = useState(0);
    const [detail,setDetail] = useState("");
    const[ restaurant_id,setRestaurant_id ]= useState("");
    const [images,setImages] = useState([]);
    const [token,setToken] = useState(null);
    const navigate = useNavigate()
    const [selected, setSelected] = useState([]);


    const [options,setOptions] = useState()
    const [categories,setCategories] = useState([])
    const firebaseConfig = {
        apiKey: "AIzaSyBeKFJZLSF6n3eVckKjD3DoNTc-lVvMPCo",
        authDomain: "orderup-1678757977213.firebaseapp.com",
        projectId: "orderup-1678757977213",
        storageBucket: "orderup-1678757977213.appspot.com",
        messagingSenderId: "79812574000",
        appId: "1:79812574000:web:f8cc2cd153302428e6e6f5",
        measurementId: "G-TVS2KTGT6C"
    };

    firebase.initializeApp(firebaseConfig);

    const storage = firebase.storage();


    function getItem(_id){

        const id = searchParams.get("_id")
        const token = localStorage.getItem("token")
        axios.get(`http://localhost:8081/api/admin/OrderUp/GET_ITEM?id=${_id}`,"",{
            headers:{
                authorization:
                    `Bearer ${token}`
            }
        }).then((response)=>{
            console.log("get item response: ",response)
            setItem(response.data.data)
            setImage(response.data.data.image)
        }).catch((error)=>{

        })
    }

    useEffect(()=>{
        console.log("item: ",item)

        if(item!=null){
            setName(item.name)
            setPrice(item.price)
            setDetail(item.detail)
        }




    },[item])
    const uploadImage = (e) => {
        const file = e.target.files[0];
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(`Upload progress: ${progress}%`);
            },
            (error) => {
                // error function
                console.error(error);
            },
            () => {
                // complete function
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        setImage(url);
                        console.log(`image URL: ${url}`);
                    });
            }
        );
    };

    const [requestData,setRequestData] = useState({
        name:"",
        price:0,
        detail:"",
        categories:[],
        images:[],
        _id:searchParams.get("_id")
    });





    useEffect(()=>{
        getItem(searchParams.get("_id"))
        setToken('Bearer '+localStorage.getItem("token"))
        console.log("edit id: ", searchParams.get("_id"))


    },[])

    useEffect(()=>{
        axios.get(`http://localhost:8081/api/OrderUp/GET_ALL_CATEGORIES`)
            .then((response)=>{
                console.log(response.data.data)
                const  op = response.data.data.map((o)=>{
                    return({label:o.name,
                        value:o.code
                    })
                })

                console.log("item: ",item)
                const sel =item.categories == null? []: item.categories.map((i)=>{
                    console.log("op:",op)
                    const result = op.find((obj) => obj.value === i);
                    console.log("result: ", result)

                    return result;
                })
                console.log("sel: ", sel)
                setSelected(sel)

                setOptions(op)
            })



    },[item])

    useEffect(()=>{
        console.log("selected: ",selected)
    },[selected])


    const editItem = async () => {
        console.log(requestData)
        if (
            isValid(requestData)
        ) {
            console.log("request data: ", requestData)
            console.log("token: ",token)
            axios.post(process.env.REACT_APP_URL_ADMIN_EDIT_ITEM, requestData, {
                headers: {
                    Authorization: token
                }
            })
                .then((response) => {
                    console.log(response);
                    if(response.data.code == 1){
                        alert("edit thanh cong ")
                        navigate("/management/Items")
                    }else {
                        alert("edit that bai")
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        }

    };


    const isValid = (requestData) => {

        if (validator.isEmpty(requestData.name)) {
            alert("Please input your itemName");
            return false;
        }
        if (requestData.price == 0) {
            alert("Please input your price");
            return false;
        }
        if (requestData.detail == 0) {
            alert("Please input your detail");
            return false;
        }
        if(requestData.images.at(0) == null ){
            alert("Please input your image");
            return false;
        }


        // if (requestData.images.) {
        //     alert("Please input your image");
        //     return false;
        // }
        if (validator.isEmpty(requestData.restaurant_id)) {
            alert("Please input your id");
            return false;
        }

        return true;
    };


    useEffect(()=>{

        requestData.detail = detail;
        requestData.name = name;
        requestData.price = price;
        requestData.categories= categories;
        requestData.images = [image];
    },[name,price,detail,image,categories])



    useEffect(()=>{
        requestData.restaurant_id = "63f32452db59e56a489911ef"
    },[])



    useEffect(()=>{

        const cat = selected.map((selected)=>{
            return(selected.value)
        })
        setCategories(cat)
    },[selected])



    useEffect(()=>{
        console.log("option: ",options)
    },[options])





    return (
        <div className="addBox">
            <div className="addbox">
                <div className="addBoxTitle">
                    <div className="addBox_Title">Sửa </div>
                </div>
                <div className="addBox__subtitle"></div>
                <div className="addBox__form">
                    {image && (
                        <div
                            className="addBox_image"
                            onClick={() => filepickerRef.current.click()}
                        >
                            <img src={image} alt="avatar"/>
                        </div>
                    )}
                    {!image && (
                        <div
                            onClick={() => filepickerRef.current.click()}
                            className="addBox__upload-container"
                        >
                            Choose File
                        </div>
                    )}
                    <input
                        className="addBox__upload-image"
                        hidden
                        onChange={uploadImage}
                        ref={filepickerRef}
                        type="file"
                    />
                    <input type="text" placeholder="Tên món ăn " value={name}  onChange={(e)=>{setName(e.target.value)}}/>
                    <input type="number" placeholder="Giá tiền " value={price}  onChange={(e)=>{setPrice(e.target.value)}}/>
                    {/*{options&&<MultiSelect*/}
                    {/*    options={options}*/}
                    {/*    value={selected}*/}
                    {/*    onChange={setSelected}*/}
                    {/*    labelledBy={"Select"}*/}
                    {/*    isCreatable={true}*/}
                    {/*/> }*/}

                    {options &&<Select
                        isMulti
                        value={selected}
                        onChange={setSelected}
                        options={options}
                        placeholder="danh muc"
                    />}

                    <textarea
                        value={detail}
                        className="addBox__about"
                        placeholder="Mô tả ..."
                        onChange={(e)=>{setDetail(e.target.value)}}
                    ></textarea>
                    <button className="addBox__btn" onClick={editItem}>
                        Sửa
                    </button>
                </div>
            </div>
        </div>
    );
}


export default SystemEdit;
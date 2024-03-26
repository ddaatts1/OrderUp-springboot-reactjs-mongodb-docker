import React, {useEffect, useRef, useState} from "react";
import "./ListItems.css"

import 'firebase/compat/storage';




const ListItems = () => {



    return (
        <div className="addBox">
            <div className="addbox">
                <div className="addBoxTitle">
                    <div className="addBox_Title">Danh sách sản phẩm   </div>
                </div>
                <div className="addBox__subtitle"></div>
                <div className="addBox__form">

                    <div className="element">
                        <div className="id">id</div>
                        <div className="name">Tên sản phẩm</div>
                        <div className="price">Giá</div>
                        <div className="status">Trạng thái</div>
                        <div className="button">

                        </div>

                    </div>
                    {Array.of(1,2,3,4,5,4,5).map((i)=>{
                        return(
                            <div className="element">
                                <div className="id">{i}</div>
                                <div className="name">Bánh mỳ Sài Gòn</div>
                                <div className="price">43000</div>
                                <div className="status">Còn hàng </div>
                                <div className="button">
                                    <button className="btnoff" type="button" >off</button>
                                    <button className="btnedit" type="button">edit</button>
                                    <button className="btndelete" type="button">delete</button>
                                </div>
                            </div>

                        )
                    })}


                </div>

            </div>


        </div>
    );
};

export default ListItems;
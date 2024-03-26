/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import {useEffect, useState} from 'react';
import './Catolog.css'


const Catolog = ({onCategorySelect}) => {

    const [choose, setChoose] = useState("BUN");

    const toggleChoose = (x) => {
        setChoose(x);
        onCategorySelect(x)
    }
    const arr = [
        {name :"Bún",code:"BUN",imageURL:"https://cdn-icons-png.flaticon.com/512/4727/4727368.png"},
        {name :"Cháo",code:"CHAO",imageURL:"https://cdn-icons-png.flaticon.com/512/2714/2714041.png"},
        {name :"Gà",code:"GA",imageURL:"https://cdn-icons-png.flaticon.com/512/837/837606.png"},
        {name :"Tra sữa",code:"TRASUA",imageURL:"https://cdn-icons-png.flaticon.com/512/3361/3361216.png"},
        {name :"Ăn vặt",code:"ANVAT",imageURL:"https://cdn-icons-png.flaticon.com/512/3814/3814614.png"},
        {name :"Burger",code:"BURGER",imageURL:"https://cdn-icons-png.flaticon.com/128/3075/3075977.png"},
        {name :"Pizza",code:"PIZZA",imageURL:"https://cdn-icons-png.flaticon.com/512/1404/1404945.png"}

    ];

    const [selectedValue, setSelectedValue] = useState("topsale");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }



    useEffect(()=>{



    },[selectedValue])


    return (
        <div className="Catolog">
            <div className='top'>
                <span className='slogan'>Find your best food <span className='icon1'></span></span>
                <div className='right'>
                    <div
                        className="select-box"
                        style={{ backgroundColor: "rgb(248, 248, 248)", color: "rgb(187, 187, 187)" }}
                    >
                        <select className='selectBox' value={selectedValue} onChange={handleChange}>
                            <option value="topsale">Top sale</option>
                            <option value="option2">Recent</option>
                        </select>
                        <div className="arrow-icon">&#x25BC;</div>
                    </div>
                </div>

            </div>
            <ul className="Listcategory">

                {arr.map((x,i) => {
                    return (
                        <li key={i} className="Category" >
                            <a href='#' className='aCategory' onClick={() => toggleChoose(x.code)}>
                                <div className="image" style={{ backgroundColor: choose === x.code ? "rgb(255, 250, 199)" : " " }}>
                                    <div style={{ backgroundColor: choose === x.code ? "rgb(240, 235, 180)" : " " }}>
                                        <img src={x.imageURL}></img>
                                    </div>

                                </div>
                                <div className="Categoryname" style={{ backgroundColor: choose === x.code ? "rgb(255, 250, 199)" : " " }}>
                                    <span>{x.name}</span>
                                </div>
                            </a>
                        </li>
                    )
                })}




            </ul>

        </div>
    )
}

export default Catolog;
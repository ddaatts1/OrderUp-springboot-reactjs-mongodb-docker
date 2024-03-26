import Catolog from "../Catolog/Catolog";
import Listfood from "./Listfood";
import {useState} from "react";


function UserListFood(){

    const [selectedCategory, setSelectedCategory] = useState(null);

    function handleCategorySelect(category) {
        setSelectedCategory(category);
    }

    return(
        <>
            <Catolog onCategorySelect={handleCategorySelect}/>
            <Listfood selectedCategory={selectedCategory}/>
        </>
    )
}

export default UserListFood;
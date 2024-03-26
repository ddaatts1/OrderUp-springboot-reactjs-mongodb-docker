import React from "react";
import {Cart, CartProvider, ProductItem} from "./Cart";

const CartE = () => {
    // Dummy product data
    const products = [
        { id: 1, name: "Product 1", price: "$10",rate:4.5,Ordered:54 },
        { id: 2, name: "Product 2", price: "$20",rate:3.4,Ordered:4 },
        { id: 3, name: "Product 3", price: "$30",rate:5,Ordered:554 },
        { id: 4, name: "Product 4", price: "$340",rate:3.6,Ordered:44 },
        { id: 5, name: "Product 5", price: "$30",rate:4.5,Ordered:54 },
    ];

    return (
        <div>
            <h1>E-commerce App</h1>
            <CartProvider>
                <div>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
                <Cart/>
            </CartProvider>
        </div>
    );
};

export default CartE;





// app 2

// App.js
// import React from "react";
// import {Cart, CartProvider} from "./Cart";
// import * as PropTypes from "prop-types";
//
// function ProductItem(props) {
//     return null;
// }
//
// ProductItem.propTypes = {product: PropTypes.any};
// const CartE = () => {
//     // Dummy product data
//     const products = [
//         { id: 1, name: "Product 1", price: "$10" },
//         { id: 2, name: "Product 2", price: "$20" },
//         { id: 3, name: "Product 3", price: "$30" }
//     ];
//
//     return (
//         <div>
//             <h1>E-commerce App</h1>
//             <CartProvider>
//                 <div>
//                     {products.map((product) => (
//                         <ProductItem key={product.id} product={product} />
//                     ))}
//                 </div>
//                 <Cart />
//             </CartProvider>
//         </div>
//     );
// };
//
// export default CartE;

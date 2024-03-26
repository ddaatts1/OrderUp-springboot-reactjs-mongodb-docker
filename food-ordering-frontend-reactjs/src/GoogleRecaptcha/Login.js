// // import React from "react";
// // import ReCAPTCHA from "react-google-recaptcha";
// //
// // const Login = () => {
// //     const sitekey = "6LdDKQIlAAAAAL92a26HF7td3BM3Z39eJBs4fNoD";
// //
// //     function onSubmit(token) {
// //         console.log("Token:", token);
// //         // do something with the token, like send it to the server
// //     }
// //
// //     return (
// //         <div>
// //             <form onSubmit={onSubmit}>
// //                 <ReCAPTCHA
// //                     sitekey={sitekey}
// //                     onChange={onSubmit}
// //                 />
// //                 <br/>
// //                 <button type="submit">Submit</button>
// //             </form>
// //         </div>
// //     );
// // };
// //
// // export default Login;
//
//
// import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
//
// const Login = () => {
//     const [verified, setVerified] = useState(false);
//
//     function onChange(value) {
//         console.log("Captcha value:", value);
//         setVerified(true);
//     }
//
//     function handleSubmit(event) {
//         event.preventDefault();
//         // perform form submission here
//     }
//
//     return (
//         <div className="d-flex flex-column align-items-center justify-content-center h-100 mt-4">
//             <h1 className="mb-3">Re Captach Tutorial</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3" style={{ width: 500 }}>
//                     <label htmlFor="exampleInputEmail1" className="form-label">
//                         Email address
//                     </label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         id="exampleInputEmail1"
//                         aria-describedby="emailHelp"
//                     />
//                 </div>
//                 <ReCAPTCHA
//                     sitekey="6LfHLvwkAAAAALp4W4i3Yr4c1A70Mqy3_ik58Uga"
//                     onChange={onChange}
//                 />
//                 <button
//                     type="submit"
//                     className="btn btn-primary mt-3"
//                     disabled={!verified}
//                 >
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;

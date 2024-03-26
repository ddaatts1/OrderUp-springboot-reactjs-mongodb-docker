import {useEffect} from "react";
import {decodeToken, useJwt} from "react-jwt";


function JwtDecrypt(){
    const  token = "eyJhbGciOiJIUzI1NiJ9.eyJyZXN0YXVyYW50TmFtZSI6IkNow6FvIERpbmggRMaw4buhbmcgQ2FvIEPhuqVwIFNhbyBMYSIsInJvbGUiOiJNQU5BR0VSIiwic3ViIjoiZG9kYXQ3NDNAZ21haWwuY29tIiwiaWF0IjoxNjgyOTMxNjkyLCJleHAiOjE2ODM3OTU2OTJ9.J5nkJy3t78ENZeX0StQcU1vY10NwY6_dGtnhlTZDH5k";

    const { decodedToken, isExpired } = useJwt(token);
    const myDecodedToken = decodeToken(token);


    useEffect(()=>{

        console.log("decodedToken: ",myDecodedToken.role)
        console.log("isExpired: ",isExpired)
    },[])
    return(
        <div>
  token
        </div>
    )

}


export default JwtDecrypt;
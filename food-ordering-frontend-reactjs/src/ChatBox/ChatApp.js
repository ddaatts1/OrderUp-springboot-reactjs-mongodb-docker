import ChatBox from "./ChatBox";
import "./ChatApp.css"
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./firebaseConfig";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import ChatBoxTest from "./ChatBoxTest";
import axios from "axios";



function ChatApp(){

    const [user] = useAuthState(auth)
    const [toUser,setToUser] = useState();
    const [listUserId,setListUserId] = useState([])
    const [listUser,setListUser] = useState([])
    const [choose, setChoose] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const getMessages = async () => {
                    const querySnapshot1 = await getDocs(query(collection(db, 'messages'),
                        where('uid', '==', user.uid)
                    ));

                    console.log("querySnapshot1: ",querySnapshot1)
                    const querySnapshot2 = await getDocs(
                        query(
                            collection(db, 'messages'),
                            where('toUser', '==', user.uid),
                        )
                    );
                    console.log("querySnapshot2: ",querySnapshot2)

                    const querySnapshot = querySnapshot1.docs.concat(querySnapshot2.docs)
                    console.log("querySnapshot: ",querySnapshot)
                    const messageData = querySnapshot.map((doc) => ({ ...doc.data(), id: doc.id }));
                    console.log("docs: ",querySnapshot)
                    // const uniqueUser = querySnapshot.docs.reduce((users,curr)=>{
                    //     let user = {
                    //         uid: curr.data().uid,
                    //         displayName: curr.data().displayName,
                    //     };
                    //
                    //     axios.get(`http://localhost:8081/api/admin/OrderUp/GET_RESTAURANT_BY_GOOGLE_UID?uid=${user.uid}`)
                    //         .then((response)=>{
                    //             console.log("response: ",response)
                    //             if(response.data.data != null){
                    //                 user = {...user,displayName: response.data.data}
                    //                 console.log("user: ",user)
                    //
                    //             }
                    //         })
                    //
                    //     if (!users.some((u) => u.uid === user.uid && u.displayName === user.displayName)) {
                    //         users.push(user);
                    //     }
                    //
                    //     return users;
                    // },[]);

                    const uniqueUser1 = await Promise.all(querySnapshot.map(async (curr) => {
                        let user = {
                            uid: curr.data().uid,
                            displayName: curr.data().displayName,
                        };

                        const response = await axios.get(`${process.env.REACT_APP_URL_USER_GET_RESTAURANT_BY_GOOGLE_UID}?uid=${curr.data().uid}`);
                        if (response.data.data != null) {
                            user = { ...user, displayName: response.data.data };
                        }

                        return user;
                    }));

                    const uniqueUser2 = await Promise.all(querySnapshot.map(async (curr) => {
                        let user = {
                            uid: curr.data().toUser,
                            displayName: curr.data().displayName,
                        };

                        const response = await axios.get(`${process.env.REACT_APP_URL_USER_GET_RESTAURANT_BY_GOOGLE_UID}?uid=${curr.data().toUser}`);
                        if (response.data.data != null) {
                            user = { ...user, displayName: response.data.data };
                        }

                        return user;
                    }));

                    const uniqueUser = uniqueUser1.concat(uniqueUser2)
                    console.log("uniqueUser: ",uniqueUser)



                    const uniqueUserFiltered = uniqueUser.filter((user, index, self) =>
                        index === self.findIndex((u) => u.uid === user.uid && u.displayName === user.displayName)
                    );

                    console.log("data: ",querySnapshot)
                    console.log("uniqueUser: ",uniqueUserFiltered)
                    setListUserId(uniqueUserFiltered)
                };
                getMessages();
            }
        });

        return unsubscribe;
    }, []);

    useEffect(()=>{
      setChoose("asasas")

    },[])


    function onSelectChange(e){

        setToUser(e.target.value)
        setChoose(e.target.value)
        console.log(e.target.value)

    }
    useEffect(()=>{
        console.log("to user: ",toUser)
    },[toUser])




    return(
        <div className="ChatAppParent">
            <div className="selectContainer">
                <div className="selectContainer1">
                    <div className="select" tabIndex="1">
                        {listUser && listUserId.map((v,i)=>{
                            return(
                                <div key={i}>
                                    <input
                                        className="selectopt"
                                        name="test"
                                        type="radio"
                                        id={v.uid}
                                        value={v.uid}
                                        checked={choose === v.uid}
                                        onChange={onSelectChange}
                                    />
                                    <label  htmlFor={v.uid} className="option">
                                        {v.displayName}
                                    </label>

                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>


            {/*{choose != null? <ChatBoxTest id={choose}/>:"chua chon"}*/}

             <ChatBox toUser={toUser}/>

        </div>
    )
}


export  default ChatApp;
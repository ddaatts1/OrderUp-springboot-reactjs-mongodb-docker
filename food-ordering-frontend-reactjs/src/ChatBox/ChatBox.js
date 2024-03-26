
import {auth, db} from "./firebaseConfig"
import {useEffect, useRef, useState} from "react";
import {addDoc, collection, getDocs, query, where, orderBy, onSnapshot} from "@firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAuthState} from "react-firebase-hooks/auth";
import "./ChatBox.css"
import * as PropTypes from "prop-types";
import axios from "axios";



function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
}

export  default  function ChatBox(props){

    const [user] = useAuthState(auth)

    return (
            <div className="ChatApp">


                <header>
                    <h1>OrderUp!</h1>
                    <SignOut/>
                </header>

                <section>

                    {props.toUser &&user ? <ChatRoom toUser={props.toUser} /> : <SignIn />}

                    {
                        console.log("toUser: ",props.toUser)
                }
                    <div>{user? user.displayName:"chua dang nhap"}</div>
                </section>

            </div>

    );
}

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img className="chatImg" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}

ChatMessage.propTypes = {message: PropTypes.any};

// function ChatRoom(props){
//
//     const [user] = useAuthState(auth)
//
//     const dummy = useRef();
//     const [formValue, setFormValue] = useState('');
//     const messagesRef = collection(db,"messages")
//     const [messages,setMessages] = useState([]);
//     const querySnapshot =  getDocs(query(messagesRef,
//             where('uid', 'in', [user.uid,props.toUser]),
//             where("toUser","in",[user.uid,props.toUser]),
//             orderBy("createdAt","asc")
//         ),
//
//     );
//
//
//
//     useEffect(() => {
//         const getMessages = async () => {
//
//             const messageData = (await querySnapshot).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//             console.log("messageData: ",messageData)
//             setMessages(messageData);
//         };
//
//         getMessages();
//     },[props.toUser]);
//
//     useEffect(()=>{
//         console.log(messages)
//
//         console.log("uid: ",auth.currentUser.uid)
//         console.log("name: ",auth.currentUser.displayName)
//     },[])
//
//         const sendMessage = async (e) => {
//             e.preventDefault();
//
//             const { uid, photoURL,displayName } = auth.currentUser;
//
//             await addDoc(collection(db, "messages"), {
//                 text: formValue,
//                 createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//                 uid,
//                 displayName,
//                 toUser: props.toUser,
//                 photoURL
//             });
//
//
//             setFormValue('');
//             dummy.current.scrollIntoView({ behavior: 'smooth' });
//         }
//
//         useEffect(()=>{
//
//         },[messages])
//
//     return(<>
//             <main>
//
//                 {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
//
//                 <span ref={dummy}></span>
//
//             </main>
//
//             <form onSubmit={sendMessage}>
//
//                 <input className="chatBoxInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="chat" />
//
//                 <button className="sendMessage" type="submit" disabled={!formValue}>🕊️</button>
//
//             </form>
//         </>
//     )
// }

function ChatRoom(props) {
    const [user] = useAuthState(auth);
    const dummy = useRef();
    const [formValue, setFormValue] = useState('');
    const messagesRef = collection(db, "messages");
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     // Listen for changes to the messages collection in real time
    //     const unsubscribe = query(messagesRef,
    //         where('uid', 'in', [user.uid, props.toUser]),
    //         where("toUser", "in", [user.uid, props.toUser]),
    //         orderBy("createdAt", "asc")
    //     ).onSnapshot((querySnapshot) => {
    //         const messageData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         setMessages(messageData);
    //     });
    //
    //     // Unsubscribe from the listener when the component unmounts
    //     return unsubscribe;
    // }, [props.toUser]);

    //
    // useEffect(() => {
    //     const unsubscribe1 = onSnapshot(
    //         query(
    //             messagesRef,
    //             where('uid', '==', user.uid),
    //             where('toUser', '==', props.toUser),
    //             orderBy('createdAt', 'asc') // Order by createdAt in ascending order
    //         ),
    //         (querySnapshot) => {
    //             const messages1 = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //             console.log('messages1: ', messages1);
    //             // Update messages state with messages1
    //             setMessages((prevMessages) => [...prevMessages, ...messages1]);
    //         }
    //     );
    //
    //     const unsubscribe2 = onSnapshot(
    //         query(
    //             messagesRef,
    //             where('uid', '==', props.toUser),
    //             where('toUser', '==', user.uid),
    //             orderBy('createdAt', 'asc') // Order by createdAt in ascending order
    //         ),
    //         (querySnapshot) => {
    //             const messages2 = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //             console.log('messages2: ', messages2);
    //             // Update messages state with messages2
    //             setMessages((prevMessages) => [...prevMessages, ...messages2]);
    //         }
    //     );
    //
    //     // Unsubscribe from the listeners when the component unmounts
    //     return () => {
    //         unsubscribe1();
    //         unsubscribe2();
    //     };
    // }, [props.toUser]);
    //



    useEffect(() => {
        // Listen for changes to the messages collection in real time
        const unsubscribe = onSnapshot(    query(messagesRef,
            where('uid', 'in', [user.uid, props.toUser]),
            where("toUser", "in", [user.uid, props.toUser]),
            orderBy("createdAt", "asc")
        ),(querySnapshot) => {
            const messageData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log("messageData: ",messageData)
            console.log("uid:",user.uid)
            console.log("touser:",props.toUser)
            setMessages(messageData);
        });

        // Unsubscribe from the listener when the component unmounts
        return unsubscribe;
    }, [props.toUser]);



    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL, displayName } = auth.currentUser;

        await addDoc(collection(db, "messages"), {
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            toUser: props.toUser,
            photoURL
        });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </main>
            <form className="chatForm" onSubmit={sendMessage}>
                <input className="chatBoxInput" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="chat" />
                <button className="sendMessage" type="submit" disabled={!formValue}>🕊️</button>
            </form>
        </>
    )
}


function SignIn() {

    const [prov,setProv] = useState()
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("user: ",user)
            console.log("uid: ",user.uid)

            const token = localStorage.getItem("token")

            axios.post(`${process.env.REACT_APP_URL_ADD_GOOGLE_UID}?uid=${user.uid}&email=${user.email}`,{},{
                headers :{
                    Authorization: "Bearer "+token
                }
            }).then((response)=>{
                console.log("response: ",response)
            })
        });

        return unsubscribe;
    }, []);



    return (
        <>
            <button className="sign-in" onClick={signInWithGoogle}>Đăng nhập bằng Google</button>
            <p>Đăng nhập để trò chuyện cùng nhà hàng!</p>
        </>
    )

}

import { Avatar, Icon, IconButton } from '@material-ui/core';
import React,{ useState, useEffect} from 'react';
import "./Chat.css";
import {SearchOutlined,MoreVert,AttachFile, InsertEmoticon, Mic} from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
import {useParams} from "react-router-dom";
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import firebase from "firebase";
function Chat() {
    // this is for Avatar changing
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    //upgrade chat
    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId]);
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
     },[]);
    // input store here
    const [input, setInput] = useState("");
    const sendMessage = (e) => {
        e.preventDefault();
        //console.log("you typed", input);


        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput(""); // this is for clean input field after type and then enter the message
    }
    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
              <div className="chat_headerRight">
                <IconButton>
                <SearchOutlined/>
                </IconButton>
                <IconButton>
                <AttachFile/>
                </IconButton>
                <IconButton>
                <MoreVert/>
                </IconButton>
            </div>
           </div>
           <div className="chat_body">
           
           {messages.map(message => (
                    <p className={`chat_message ${ true && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                        <span className="chat_timestemp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
           </div>
           <div className="chat_footer">
               <InsertEmoticon/>
               <form>
                   <input 
                   value={input}
                   onChange={e=> setInput(e.target.value) }
                   type="text" placeholder="Type a messeger here...."/>
                   <button onClick={sendMessage}> Send a message</button>
               </form>
               <Mic/>
               
           </div>
            
        </div>
    )
}

export default Chat

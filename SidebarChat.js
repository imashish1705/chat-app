import { Avatar } from '@material-ui/core';
import React,{ useEffect,useState} from 'react';
import "./SidebarChat.css";
import {Avatat} from '@material-ui/core';
//import React,{useEffect,useState} from "react";
import db from "./firebase";
import { Link } from "react-router-dom";
function SidebarChat({id,name,addNewChat}) {
    var [seed, setSeed] = useState("");

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);
    const [messages, setMessages] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);
    
    const createChat =()=>{
        const roomName= prompt("Enter your name for chat");
        if(roomName) {
            // do some database stuff
            // add new chat in real time 
            db.collection("rooms").add({
                name:roomName, 
            });
        }  
    };
    return !addNewChat ?(
        <Link to={`/rooms/${id}`} key={id}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>
            <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
        </div>
    </Link>
       
    ) :(
       <div onClick={createChat}>
           <h2 className="sidebarChat">Add New Chat</h2>
       </div>
       
    );
}

export default SidebarChat

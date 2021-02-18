//import React from 'react';
import "./Sidebar.css";
import "./SidebarChat";
//import { Avatar, IconButton } from '@material-ui/icons';
import FaceIcon from '@material-ui/icons/Face';
//import IconButton from '@material-ui/icons/IconButton';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import React,{ useState, useEffect} from 'react';
import {useStateValue} from './StateProvider';
function Sidebar() {
    const [rooms, setRooms]= useState([]);
    const [{user},disppatch] =useStateValue();
     useEffect(()=> {
       const removeChat= db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return () => {
            removeChat(); // this is for remove chat whenever the user want 
        }
     }, []);
        return (
        <div className="sidebar">
            <div className="sidebar_header">
              
            <Avatar src={user ?.photoURL}/> 
            <div className="sidebar_headerRight">
                <IconButton>
                <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                <ChatIcon/>
                </IconButton>
                <IconButton>
                <MoreVertIcon/>
                </IconButton>
            </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
             <SearchIcon/>
             <input type="text" placeholder="Search or Start New Chat"/>
            </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat key={room.id} id={room.id}
                    name={room.data.name}/>
                ))}
            </div>

        </div>
    )
}

export default Sidebar;

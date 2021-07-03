import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import {Room, SearchOutlined} from "@material-ui/icons";
import SidebarChat from "../sidebar_chat/SidebarChat";
import useFetch from "../../useFetch";

interface Room {
  id: number;
  name: string;
  lastMessage?: string | undefined;
}

const Sidebar: React.FC = () => {
  const data = useFetch("http://localhost:8000/rooms");
  const [rooms, setRooms] = useState<Room[]>(data);

  useEffect(() => {
    if (data !== undefined) {
      setRooms(data);
    }
  }, [data]);

  const createChat =  async () => {
    let roomName = prompt("Enter Room Name");
    if (roomName) {

      let newRoom : Room = {
        id: rooms.length+1,
        name: roomName,
        lastMessage: 'There You go ',
      };

      await fetch('http://localhost:8000/rooms', {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify( newRoom)
      });


      await setRooms([
        ...rooms,newRoom
      ]);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={createChat}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">

        { (rooms !== undefined && rooms.length !== 0 ) ? rooms.map((room: Room) => {
          return (
              <SidebarChat
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  lastMessage={room.lastMessage}
              />
          );
        }) : (
            <div className="SidebarChat" onClick={createChat}> Craete new Chat</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

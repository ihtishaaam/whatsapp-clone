import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../sidebar_chat/SidebarChat";
import useFetch from "../../useFetch";
import SidebarchatHeader from "../sidebarchat_header/SidebarchatHeader";
import SidebarSearch from "../sidebar_search/SidebarSearch";

interface Room {
  id: number;
  name: string;
  lastMessage?: string | undefined;
}

interface Roomm {
  roomId: number,
  setRoomId : React.Dispatch<React.SetStateAction<number>>,
}


const Sidebar: React.FC <Roomm> = ( { roomId, setRoomId } : Roomm ) => {

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
      <SidebarchatHeader createChat={createChat}/>
      <SidebarSearch />
      <SidebarChat rooms={rooms} setRoomId={setRoomId} createChat={ createChat }/>
    </div>
  );
};

export default Sidebar;
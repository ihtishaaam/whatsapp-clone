import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import useFetch from "../../useFetch";

interface Room {
  id: number;
  name: string;
  lastMessage?: string | undefined;
}

type message = {
  id: number,
  name: string,
}

const SidebarChat: React.FC<Room> = ({ id, name, lastMessage}: Room) => {

  let check : string = "";
  const data = useFetch(`http://localhost:8000/rooms/${id}/messages?_sort=id&_order=desc&_limit=1`);

  if ( data !== undefined ){
    data.map( (item : any) => {
      check = item.message;
    });
  }

  const [seed, setSeed] = useState<number>(0);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/room/${id}`}>
      <div className="SidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2> {name} </h2>
          <p> { check }</p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;

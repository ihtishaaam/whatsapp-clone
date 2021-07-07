import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import useFetch from "../../useFetch";

interface Room {
  id: number;
  name: string;
  lastMessage?: string | undefined;
  setRoomId: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarChat: React.FC<Room> = ({
  id,
  name,
  lastMessage,
  setRoomId,
}: Room) => {
  const [seed, setSeed] = useState<number>(0);
  const data = useFetch(
    `http://localhost:8000/rooms/${id}/messages?_sort=id&_order=desc&_limit=1`
  );

  if (data !== undefined) {
    data.map((item: any) => {
      lastMessage = item.message;
    });
  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <>
      <div className="SidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info" onClick={() => setRoomId(id)}>
          <h2> {name} </h2>
          <p> {lastMessage}</p>
        </div>
      </div>
    </>
  );
};

export default SidebarChat;

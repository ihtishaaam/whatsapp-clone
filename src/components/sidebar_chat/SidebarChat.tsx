import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import useFetch from "../../useFetch";

interface Room {
  id: number;
  name: string;
  lastMessage?: string | undefined;
}

interface Rooms {
  rooms: Room[];
  createChat: (event: React.MouseEvent<HTMLDivElement>) => void;
  setRoomId: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarChat: React.FC<Rooms> = ({
  rooms,
  createChat,
  setRoomId,
}: Rooms) => {
  return (
    <div className="sidebar__chats">
      {rooms !== undefined && rooms.length !== 0 ? (
        rooms.map((room: Room) => {
          return (
            <div className="SidebarChat" key={room.id}>
              <Avatar />
              <div
                className="sidebarChat__info"
                onClick={() => setRoomId(room.id)}
              >
                <h2> {room.name} </h2>
                <p> {"This looks great !!"}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="SidebarChat" onClick={createChat}>
          Create new Chat
        </div>
      )}
    </div>
  );
};

export default SidebarChat;

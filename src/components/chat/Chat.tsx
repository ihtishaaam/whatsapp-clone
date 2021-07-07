import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import useFetch from "../../useFetch";
import Conversation from "../conversation/Conversation";
import ChatHeader from "../chat_header/ChatHeader";
import ChatFooter from "../chat_footer/ChatFooter";

interface Message {
  id: number;
  roomId: number;
  sender: string;
  message: string;
}

interface RoomId {
  roomId: number;
}

const Chat: React.FC<RoomId> = ({ roomId }: RoomId) => {
  const room = useFetch(`http://localhost:8000/rooms/${roomId}`);
  const data = useFetch(`http://localhost:8000/messages?roomId=${roomId}`);
  const [messages, setMessages] = useState<Message[]>(data);

  useEffect(() => {
    if (data !== undefined) {
      setMessages(data);
    }
  }, [data, roomId, room]);

  useEffect(() => {
    let elem = document.getElementById("chat_body");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  });



  return (
    <div className="chat">
      <ChatHeader name={room !== undefined && room.name} />
      <Conversation messages={messages} />
      <ChatFooter roomId={roomId} messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default Chat;

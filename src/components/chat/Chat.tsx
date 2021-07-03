import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import useFetch from "../../useFetch";

interface Message {
  id: number,
  roomId: number,
  sender: string,
  message: string,
}

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState(0);
  const { roomId }: any = useParams();
  const [roomName, setRoomName] = useState<string>("");
  const room = useFetch(`http://localhost:8000/rooms/${roomId}`);
  const data = useFetch(`http://localhost:8000/messages?roomId=${roomId}`);
  const roomMessages = useFetch(`http://localhost:8000/messages`);

  const [ messages, setMessages ] = useState<Message[]>(data);

  useEffect(() => {
    setTimeout( () => {
      if ( data !== undefined ){
        setMessages(data);
      }
    }, 1000 );
  }, [data, roomId]);

  const sendMessage =  async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let index = input.indexOf(":");
    let name = input.substr(0, index);
    let message = input.substr(index + 1);

    if (name === "") {
      name = "me";
    }

    let newMessage : Message = {
      id : roomMessages.length+1,
      roomId: parseInt( roomId ),
      sender: name,
      message: message,
    };

    console.log( "new Message", newMessage );

    await fetch('http://localhost:8000/messages', {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify( newMessage )
    });

    await setMessages([ ...messages,{
      id: messages.length+1,
      roomId: roomId,
      sender: name,
      message: message
    } ]);


    let elem = document.getElementById("chat_body");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className="chat__headerInfo">
          <h3> {room !== undefined && room.name} </h3>
          <p> Last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body" id="chat_body">
        {
          messages === undefined ? <p className="default_message"> Send a new Message </p> : ''
        }

        { messages !== undefined && messages.map((message) => {
          return (
            <p
              key={message.id}
              className={`chat__message ${
                message.sender === "me" && "chat__receiver"
              }`}
            >
              <span className="chat__name"> {message.sender} </span>
              {message.message}
              {/*<span className="chat__timestamp">3:52pm</span>*/}
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form>
          <input
            type="text"
            value={input}
            placeholder="Type a message"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>

        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;

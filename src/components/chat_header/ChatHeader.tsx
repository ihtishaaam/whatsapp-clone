import React from "react";
import "./ChatHeader.css";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface Room {
  name: string;
}

const ChatHeader: React.FC<Room> = ({ name }: Room) => {
  return (
    <div className="chat__header">
      <Avatar />
      <div className="chat__headerInfo">
        <h3> {name !== undefined && name} </h3>
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
  );
};

export default ChatHeader;

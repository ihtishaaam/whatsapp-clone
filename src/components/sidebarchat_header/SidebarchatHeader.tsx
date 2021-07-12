import React from 'react';
import './SidebarchatHeader.css';
import {Avatar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface Chat {
    createChat: ( event: React.MouseEvent<HTMLButtonElement>) => void
}

const SidebarchatHeader : React.FC < Chat > = ({ createChat } : Chat ) => {
    return (
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
    );
};

export default SidebarchatHeader;
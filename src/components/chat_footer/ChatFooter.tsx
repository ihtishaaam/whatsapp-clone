import React, {useEffect, useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import useFetch from "../../useFetch";

interface MessageObject {
    id: number,
    roomId: number,
    sender: string,
    message: string,
}

interface Message {
    messages: MessageObject[],
    setMessages: React.Dispatch<React.SetStateAction<{
        id: number,
        roomId: number,
        sender: string,
        message: string,
    }[]>>
    roomId: number,
}

interface NewMessage {
    id: number,
    roomId: number,
    sender: string,
    message: string,
}

const ChatFooter : React.FC < Message> = ({ roomId, messages, setMessages } : Message ) => {
    const [input, setInput] = useState("");
    const roomMessages = useFetch(`http://localhost:8000/messages`);
    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let index = input.indexOf(":");
        let name = input.substr(0, index);
        let message = input.substr(index + 1);

        if (name === "") {
            name = "me";
        }

        let newMessage: NewMessage = {
            id: roomMessages.length + 1,
            roomId: parseInt(String(roomId)),
            sender: name,
            message: message,
        };

        await fetch("http://localhost:8000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(newMessage),
        });

        await setMessages([
            ...messages,
            {
                id: messages.length + 1,
                roomId: roomId,
                sender: name,
                message: message,
            },
        ]);
        setInput("");
    };

    return (
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
    );
};

export default ChatFooter;

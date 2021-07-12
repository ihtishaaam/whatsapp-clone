import React from 'react';

import './Conversation.css';

interface Message {
    id: number,
    roomId: number,
    sender: string,
    message: string,
}

interface Conversationn {
    messages : Message[]
}

const Conversation : React.FC < Conversationn >  = ( { messages } : Conversationn ) => {

    return (
        <div className="chat__body" id="chat_body">
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
                        <span className="chat__timestamp">3:52pm</span>
                    </p>
                );
            })}
        </div>
    );
};

export default Conversation;
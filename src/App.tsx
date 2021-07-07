import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";

const App: React.FC = () => {
  const [roomId, setRoomId] = useState<number>(0);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar roomId={roomId} setRoomId={setRoomId}/>
        {roomId !== 0 && <Chat roomId={roomId} />}
      </div>
    </div>
  );
};

export default App;

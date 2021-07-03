import React  from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App: React.FC = () => {

  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/room/:roomId" component={Chat} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import './SidebarSearch.css';
import {SearchOutlined} from "@material-ui/icons";


const SidebarSearch : React.FC  = () => {
    return (
        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchOutlined />
                <input type="text" placeholder="Search or start new chat" />
            </div>
        </div>
    );
};

export default SidebarSearch;
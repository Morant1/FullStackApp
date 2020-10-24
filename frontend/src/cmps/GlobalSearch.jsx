import React from 'react';
// import SearchIcon from '@material-ui/icons/Search';
import {  BusService } from '../services/event-bus-service';
import { withRouter } from "react-router";

function _GlobalSearch(props) {
    return (
        <div className="global-search">
            {/* {props.location.pathname === '/' && <SearchIcon />} */}
            <input className="navbar-input"
                type="text"
                name="title"
                autoComplete='off'
                onChange={(ev) => {
                    BusService.emit('searchUpdated', ev)}}
                    placeholder = "Search for your event" />
        </div>

    )
}

export const GlobalSearch = withRouter(_GlobalSearch)


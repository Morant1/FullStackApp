import React from 'react';
import { BusService } from '../services/event-bus-service';


export function GlobalSearch(props) {
    return (
        <div className="search-input">

            <input 
                type="text"
                name="title"
                autoComplete='off'
                onChange={(ev) => {
                    BusService.emit('searchUpdated', ev)
                }}
                placeholder="Search for your event" />

            <i className="fas fa-search icon"></i>
        </div>
    )
}




import React, { Component } from 'react';
import { withRouter } from "react-router";

import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { BusService } from '../services/event-bus-service'



export class _EventiFilter extends Component {
    state = {
        filter: {
            date: 'all',
            sort: 'date',
            title: ''

        }
    }

    filterRef = React.createRef();
    unsubscribe;
    timeout;

    
    componentDidMount() {
        this.unsubscribe = BusService.on('searchUpdated',this.handleChange);
        this.timeout = setTimeout(() => {
            this.filterRef.current.classList.add('trans');
            
        }, 100);
    }
    
    componentWillUnmount() {
        this.unsubscribe()
        clearTimeout(this.timeout);

    }
    
    handleChange = ({ target }) => {
        const field = target.name;
        let value = target.value;
      

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }),
            () => {
                this.props.onSetFilter(this.state.filter)
            });

    }

    redirectClick = (tag) => {
        this.props.history.push(`/${tag}`)
    }


    render() {
        const { date, sort } = this.state.filter
        return (
            <section className="main-filter-container" ref={this.filterRef}>
                <ul className="tag-list">
                    <li className="user-events" onClick={(ev) => { this.redirectClick('yours') }}>Your events</li>
                    <li className="user-events" onClick={(ev) => { this.redirectClick('attend') }}>Attending</li>
                    <li onClick={(ev) => { this.redirectClick('buisness') }}>Buisness</li>
                    <li onClick={(ev) => { this.redirectClick('holywood') }}>Holywood</li>
                    <li onClick={(ev) => { this.redirectClick('politics') }}>Politics</li>
                    <li onClick={(ev) => { this.redirectClick('sports') }}>Sports</li>
                    <li onClick={(ev) => { this.redirectClick('all') }}>All</li>

                </ul>
      
                <div className="form-container">
                    <FormControl>
                        <InputLabel id="date">Date</InputLabel>
                        <Select labelId="date" id="date" name="date" value={date} onChange={this.handleChange}>
                            <MenuItem value="all">Any Time</MenuItem>
                            <MenuItem value="today">Today</MenuItem>
                            <MenuItem value="week">This week</MenuItem>
                            <MenuItem value="month">This month</MenuItem>
                            <MenuItem value="year">This year</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="sort">Sort By</InputLabel>
                        <Select labelId="sort" id="sortby" name="sort" value={sort} onChange={this.handleChange}>
                            <MenuItem value="date">Date</MenuItem>
                            <MenuItem value="participants">Nu. of participants</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </section>
        )
    }
}

export const EventiFilter = withRouter(_EventiFilter)





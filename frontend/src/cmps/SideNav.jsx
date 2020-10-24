import React, { Component } from 'react';
import { EventiFilter } from './EventiFilter'
import { withRouter } from "react-router";


export class _SideNav extends Component {

    componentDidMount() {
        setTimeout(() => {
            document.querySelector('.side-nav').classList.add('trans');

        }, 200);
    }
    redirectClick = (tag) => {
        this.props.history.push(`/${tag}`)
    }

    render() {
        const { onSetFilter } = this.props;
        return (
            <section className="side-nav">
                <ul className="tag-list">
                    <li className="my-events" onClick={(ev) => { this.redirectClick('your_events') }}>My events</li>
                    <li onClick={(ev) => { this.redirectClick('TVShows') }}>TV shows</li>
                    <li onClick={(ev) => { this.redirectClick('Sport') }}>Sport</li>
                    <li onClick={(ev) => { this.redirectClick('Movies') }}>Movies</li>
                    <li onClick={(ev) => { this.redirectClick('Comics') }}>Comics</li>
                    <li onClick={(ev) => { this.redirectClick('Books') }}>Books</li>
                    <li onClick={(ev) => { this.redirectClick('Art') }}>Art</li>
                    <li onClick={(ev) => { this.redirectClick('All') }}>All</li>

                </ul>
                <EventiFilter onSetFilter={onSetFilter} />
            </section>
        )
    }

}

export const SideNav = withRouter(_SideNav)


import React, { Component } from 'react'
import { EventiPreview } from './EventiPreview'


export class EventiList extends Component {

    componentDidMount() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    render() {
        const { eventis } = this.props;
        return (
            <section className="main-list-container">
                <ul className="eventis-list-grid">
                    {
                        eventis.map(eventi => <EventiPreview eventi={eventi} key={eventi._id} />)
                    }
                </ul>

            </section>
        )
    }
}


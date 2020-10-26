import React from 'react'
import { EventiPreview } from './EventiPreview'



export function EventiList({eventis}) {


        return (
            <React.Fragment>

            <section className="main-list-container">
                <ul className="eventis-list-grid">
                    {
                        eventis.map(eventi => <EventiPreview eventi={eventi} key={eventi._id} />)
                    }
                </ul>

            </section>
            </React.Fragment>
        )
}


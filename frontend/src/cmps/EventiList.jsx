import React from 'react'
import { EventiPreview } from './EventiPreview'



export function EventiList({eventis,updateLikes,isLike}) {


        return (
            <React.Fragment>

            <section className="main-list-container">
                <ul className="eventis-list-grid">
                    {
                        eventis.map(eventi => <EventiPreview isLike={isLike} eventi={eventi} key={eventi._id} updateLikes={updateLikes}/>)
                    }
                </ul>

            </section>
            </React.Fragment>
        )
}


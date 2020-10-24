import React from 'react'
import { Link } from 'react-router-dom'



export function EventiUpComing({ eventi, currTag }) {
    return (
            <React.Fragment>
                <Link to={`/${currTag}/${eventi._id}`}>
                    <li>{eventi.title}, {new Date(eventi.startsAt).toDateString()}</li>
                </Link>
            </React.Fragment>


    )
}

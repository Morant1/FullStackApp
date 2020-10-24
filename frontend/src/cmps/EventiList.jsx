import React, { Component } from 'react';
import { EventiPreview } from './EventiPreview'
import { withRouter } from "react-router";



export class _EventiList extends Component {

    componentDidMount() {
        window.scroll({
            top: 0, 
            left: 0
          });
    }

    redirectClick = (tag) => {
        this.props.history.push(`/${tag}`)
      }

    render() {
        const { events ,currTag} = this.props;
        // if (!"preview-grid") return <div className="">Oh no there is nothing to show</div>
    return (
        <ul className="preview-grid">
            {
                events.map(eventi => <EventiPreview eventi={eventi} key={eventi._id} currTag={currTag} />)
            }
        </ul>
    )
}
}

export const EventiList = withRouter(_EventiList)


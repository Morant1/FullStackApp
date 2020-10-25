import React, { Component } from 'react'
import { EventiPreview } from './EventiPreview'
export class PreviewScroll extends Component {

    componentDidMount() {
    }
    render() {
        const { topEventis } = this.props;
        return (
            <section className="stripe">
                <div className="stripe-title">Top Events</div>
                <div className="card-container">
                    {
                        topEventis.map(eventi => <div className="scroller" key={eventi._id}><EventiPreview eventi={eventi} key={eventi._id} /></div>)
                    }
                </div>
             </section>
        )
    }
}

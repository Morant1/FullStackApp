import React from 'react'
import { Component } from 'react'
import { Statistics } from './Statistics'

export class Info extends Component{

    state = {
        isStatistic:false
    }

    onStatistic = () => {
        this.setState({isStatistic:!this.state.isStatistic})
    }
    render() {
        const {eventis} = this.props;
    return (
        <React.Fragment>
            <section className="info info-intro">
                <h3>HashTag<span className="dote-intro">.</span><span className="hashtag-intro"> &#35;StrongWomen</span></h3>
                <p>Don't forget to leave a comment in your favorite event and selecting events by our many <span className="hashtag"> &#35;hashtags</span>
                </p>
                <img src={require('../assets/img/animted.jpg')}  alt="info"/>
            </section>
            <section className="info">
                <h3>With you on our side, we'll be even Stronger<span className="dote">.</span></h3>
                <p>Connect with influencial women around the globe in one click and make our strong women community even bigger.
                There's no limit to shared knowledge and no capacity for capturing wisdom.</p>
                <p className="join">Join our story today.</p>
                <p onClick={this.onStatistic}
                className="btn">Our Statistics</p>
            </section>
                {this.state.isStatistic && <Statistics eventis={eventis}/>}
        </React.Fragment>

    )
}
}

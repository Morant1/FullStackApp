import React, { Component } from 'react';


export class StarRate extends Component {

  state = {
    colorStar: Infinity,
    rank: this.props.rank
  }

  addRank = (rank) => {
    this.setState({colorStar:rank,rank:rank})
  }

  render() {
    const stars = []
    for (let i = 1; i <= Math.round(this.props.rank); i++) {
      stars.push(<div key={i} className={`star fas fa-star ${this.state.colorStar <= i-1? 'gray-star': 'star-yellow'}`} onClick={(ev)=>{this.addRank(i)}}/>)
    }
    // <div onClick={this.addRank} className="star fas fa-star"></div>
    // adding the gray stars (so there is 5 stars but some are gray)
    // and when pressed they add +1 rate and change color
    // change color of star can be done with ::before and ::after content https://codepen.io/depy/pen/EQoGeG
    return (
      <div className="star-rating">

        {stars}<span>({this.state.rank})</span>
      </div>
    );

  }
}





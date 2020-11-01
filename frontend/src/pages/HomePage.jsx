import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadEventis } from '../store/actions/eventiActions'
import { signup } from '../store/actions/userActions'
import { utils } from '../services/utils';
import { EventisGrid } from '../cmps/EventisGrid'
import { Header } from '../cmps/Header';
import { Info } from '../cmps/Info';
import { PreviewScroll } from '../cmps/PreviewScroll';
import { About } from '../cmps/About';


export class _HomePage extends Component {


  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.props.loadEventis();
    this.createGuest()

  }

  createGuest = () => {
    if (!this.props.loggedInUser) {
      const signupCreds =
      {
        password: '123456',
        username: `Guest-${utils.makeId()}`,
        isGuest: true
      };

      this.props.signup(signupCreds);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser !== this.props.loggedInUser) {
      this.createGuest()
  }}

  getTopEventis = () => {
    const eventis = [...this.props.eventis]
    return eventis.sort((a, b) => b.participants.length - a.participants.length).slice(0, 10);
  }


  render() {
    const topEventis= this.getTopEventis();
    if (!topEventis) return <div className="loading"><img src={require('../assets/img/loading.gif')}/></div>
    return (
      <React.Fragment>

        <Header />
        <EventisGrid />
        <PreviewScroll topEventis={topEventis} />
        <Info eventis={this.props.eventis} />
        <About/>

      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventis: state.eventiReducer.eventis,
    loggedInUser: state.userReducer.loggedInUser
  };
};
const mapDispatchToProps = {
  loadEventis,
  signup
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)



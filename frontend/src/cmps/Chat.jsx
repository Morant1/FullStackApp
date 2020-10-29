import React, { Component } from 'react';
import socketService from '../services/socketService';
import { Avatar, Button, TextField } from '@material-ui/core';

export class Chat extends Component {
  state = {
    typeMsg: '',
    msg: { from: this.props.user.username, txt: '' },
    msgs: [],
    topic: this.props.eventi._id
  };

  componentDidMount() {
    socketService.setup();
    socketService.emit('chat topic', this.state.topic);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('chat history', msgs => {
      this.setState({ msgs: msgs[this.state.topic] || [] });

    })
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
  }


  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
  };


  sendMsg = ev => {
    ev.preventDefault();
    socketService.emit('chat newMsg', this.state.msg);
    this.setState({ msg: { ...this.state.msg, txt: '' }, typeMsg: '' }, () => console.log(this.state));
  };

  msgHandleFocus = ev => {
    const typingMsg = `${this.props.user.username} is typing...`;
    socketService.emit('typing Msg', typingMsg);
    this.setState({ typeMsg: typingMsg })
  }

  msgHandleBlur = ev => {
    const typingMsg = '';
    socketService.emit('typing Msg', typingMsg);
    this.setState({ typeMsg: typingMsg })
  }

  msgHandleChange = ev => {
    const { name, value } = ev.target;
    console.log(name,value)

    this.setState(prevState => {
      return {
        msg: {
          ...prevState.msg,
          [name]: value
        }
      };
    });
  };

  render() {
    return (
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i>Leave a massege to {this.props.eventi.createdBy.username}
        </div>
          <div className="msger-header-options">
            <span onClick={this.props.openChat}><i className="far fa-times-circle"></i></span>
          </div>
        </header>
        <main className="msger-chat">
          {this.state.msgs && this.state.msgs.map((msg, idx) => {
            return (
              <div className={`msg left`} key={idx}>
                <div
                  className="msg-img"
                  style={{
                    backgroundImage:
                        `url(${require('../assets/img/women.svg')})`
                  }}>
                </div>

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name"><Avatar>{msg.from[0].toUpperCase()}</Avatar></div>
                    <div className="msg-info-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>

                  <div className="msg-text">
                    {msg.txt}
                  </div>
                </div>
              </div>)
          })}
        </main>

        <form className="msger-inputarea" onSubmit={this.sendMsg}>
          <div className='typing' style={{ minHeight: '25px', color: 'black' }}>{this.state.typeMsg ? this.state.typeMsg : ''}</div>
          <input
            className='msger-input'
            style={{ color: 'black' }}
            type="text"
            value={this.state.msg.txt}
            onChange={this.msgHandleChange}
            onFocus={this.msgHandleFocus}
            onBlur={this.msgHandleBlur}
            name="txt"
            autoComplete='off'
            placeholder="Enter your message..."
          />
          <button type="submit" className="msger-send-btn">Send</button>
        </form>
      </section>
    )
  }
}

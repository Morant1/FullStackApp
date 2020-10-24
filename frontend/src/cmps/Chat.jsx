import React, { Component } from 'react';
import socketService from '../services/socketService';
import { Avatar, Button, TextField } from '@material-ui/core';

export class Chat extends Component {
  state = {
    typeMsg: '',
    serverSideTyping: '',
    msg: { from: this.props.user, txt: '' },
    msgs: [],
    topic: this.props.eventi._id
  };

  componentDidMount() {
    socketService.setup();
    socketService.emit('chat topic', this.state.topic);
    socketService.on('chat addMsg', this.addMsg);
    socketService.on('typing Msg', this.serverSideTyping);
    socketService.on('chat history', msgs => {
      this.setState({ msgs: msgs[this.state.topic] || [] });

    })
  }

  componentWillUnmount() {
    socketService.off('chat addMsg', this.addMsg);
    socketService.terminate();
  }

  serverSideTyping = msg => {
    this.setState({ serverSideTyping: msg });
  }
  addMsg = newMsg => {
    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }));
  };


  sendMsg = ev => {
    ev.preventDefault();
    console.log("ev", ev)
    socketService.emit('chat newMsg', this.state.msg);
    this.setState({ msg: { ...this.state.msg, txt: '' }, typeMsg: '' }, () => console.log(this.state));
  };

  msgHandleFocus = ev => {
    const typingMsg = `${this.state.msg.from.username} is typing...`;
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
            <i className="fas fa-comment-alt"></i> Chat with your Host
        </div>
          <div className="msger-header-options">
            <span onClick={this.props.openChat}><i className="far fa-times-circle"></i></span>
          </div>
        </header>
        <main className="msger-chat">
          {this.state.msgs && this.state.msgs.map((msg, idx) => {
            return (
              <div className={`msg ${idx % 2 === 0 ? 'left' : 'right'}-msg`}key={idx}>
                <div
                  className="msg-img"
                  style={{
                    backgroundImage:
                      `url(${idx % 2 === 0 ? 'https://image.flaticon.com/icons/svg/327/327779.svg'
                        : 'https://image.flaticon.com/icons/svg/145/145867.svg'})`
                  }}>
                </div>

                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name"><Avatar>{this.state.msg.from.username[0].toUpperCase()}</Avatar></div>
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
          <div className='typing' style={{ minHeight: '25px', color: 'black' }}>{this.state.serverSideTyping ? this.state.serverSideTyping : ''}</div>
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

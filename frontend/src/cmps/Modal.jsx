import React, { Component } from 'react';
import {EventiEdit} from '../pages/EventiEdit'


export class Modal extends React.Component {
    state = {
        isShown: true
    }
    closeModal = () => {
        this.setState({ isShown: !this.state.isShown },()=>{
            this.props.onModal(!this.state.isShown);
        })
    }
    componentDidMount() {
        
    }

    render() {
        const { isShown } = this.state
        return (
            <div className={ `modal-wrapper ${isShown ? '' : 'hide'}` } onClick={ this.closeModal } >
                <div className="modal-content" onClick={ (ev) => ev.stopPropagation() }>
                    <button onClick={ this.closeModal }>X</button>
                    <EventiEdit _id={this.props._id}/>
                </div>
            </div >
        )
    }
}


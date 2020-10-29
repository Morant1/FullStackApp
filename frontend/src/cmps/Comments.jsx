import React from 'react'
import { Avatar } from '@material-ui/core';
import { Component } from 'react';


export class Comments extends Component{

    state ={
        txt:''
    }
    

    handleChange = ({target}) => {
        const {value} = target;
        this.setState({txt:value});
    }

    addComment = () => {
        this.props.addComment(this.state.txt)
        this.setState({txt:''});


    }
    render() {
        const {comments,user} = this.props;
    return (
        <div className="comments-list">

            <div className="input">
                <input type="text" onChange={this.handleChange} autoComplete="off"
                name="txt" value={this.state.txt} placeholder="Insert your comment..." />
                <i onClick={this.addComment} className="fas fa-plus-circle"></i>
            </div>

            {comments.map(comment => (
                <div className="comment-box" key={comment.id}>
                    <div className="comment-head" key={comment.id}>
                        <Avatar className="avatar">{comment.createdBy.username[0].toUpperCase()}</Avatar>
                        <h6 className="comment-name">{comment.createdBy.username}</h6>
                        <span className="time">{new Date(comment.createdAt).toLocaleDateString('he-IL')}</span>
                        {comment.createdBy._id === user._id && <span onClick={()=>{this.props.removeComment(comment.id)}} className="remove"><i class="fas fa-trash"></i></span>}
                    </div>
                    <h3 className="comment-content">{comment.txt}
                    </h3>
                </div>
            )
            )}
        </div>
    )
            }
}

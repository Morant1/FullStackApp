import React from 'react'
import { Avatar } from '@material-ui/core';

export function Comments({ comments }) {
    return (
        <div className="comments-list">

            <div className="input">
                <input type="text" name="comment" placeholder="Insert your comment..." />
                <i className="fas fa-plus-circle"></i>
            </div>

            {comments.map(comment => (
                <div className="comment-box" key={comment.id}>
                    <div className="comment-head" key={comment.id}>
                        <Avatar className="avatar">{comment.createdBy.username[0].toUpperCase()}</Avatar>
                        <h6 className="comment-name">{comment.createdBy.username}</h6>
                        <span>{new Date(comment.createdAt).toLocaleDateString('he-IL')}</span>
                    </div>
                    <h3 className="comment-content">{comment.txt}
                    </h3>
                </div>
            )
            )}
        </div>
    )
}

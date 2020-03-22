import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from './Message';

export default function ChatRoom(props) {
    // Sends message
    const onMessageSubmit = e => {
        e.preventDefault();
        let messageBox = document.getElementById('messageBox');
        // If message has content
        if (messageBox.value.length) {
            props.sendMessage(messageBox.value, `${new Date().getHours()}:${new Date().getMinutes()}`, props.users.self.name);
            messageBox.value = '';
        }
    },
        // Checks if a message has been typed
        onMessageChange = e => {
            document.getElementById('sendBtn').style.visibility = e.currentTarget.value.length ? 'visible' : 'hidden';
        }

    // Deletes user on unmount
    useEffect(() => {
        return () => props.deleteSelf(props.users.self.id);
    });

    return (
        <div id='chatRoom'>
            <header>
                <p><span>•</span> You {props.users.users.filter(user => user.name !== props.users.self.name).map(value => { return `,${value.name} ` })}</p>
                <Link to='/'><button /></Link>
            </header>
            <div id='chat'>
                {console.log(props.messages)}
                {props.messages.list.map((mes, index) =>
                    <Message key={index} message={mes} selfName={props.users.self.name} />
                )}
            </div>
            <form onSubmit={onMessageSubmit} autoComplete='off'>
                <input type='text' onChange={onMessageChange} placeholder='Enter message' id='messageBox' />
                <button id='sendBtn' />
            </form>
        </div>
    );
}
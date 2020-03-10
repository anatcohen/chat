import React from 'react';
import { Link } from 'react-router-dom';
import Message from './Message';

export default function ChatRoom(props) {
    // Sends message
    const onMessageSubmit = e => {
        e.preventDefault();
        let messageBox = document.getElementById('messageBox');
        props.sendMessage(messageBox.value, `${new Date().getHours()}:${new Date().getMinutes()}`, props.users.self.name);
        messageBox.value = '';
    },
        // Checks if a message has been typed
        onMessageChange = e => {
            document.getElementById('sendBtn').style.visibility = e.currentTarget.value.length ? 'visible' : 'hidden';
        }



    return (
        <>
            <>
                <p>{props.users.users.map(value => { return `${value.name}, ` })} are in the chat</p>
                <Link to='/'><button onClick={() => props.deleteSelf(props.users.self.id)}>Exit</button></Link>
            </>
            <>
                {props.messages.list.map((mes, index) =>
                    <Message key={index} message={mes.content} timeStamp={mes.timeStamp} user={mes.user} />
                )}
            </>
            <form onSubmit={onMessageSubmit} autoComplete='off'>
                <input type='textbox' onChange={onMessageChange} placeholder='Enter message' id='messageBox' />
                <button id='sendBtn' style={{ visibility: 'hidden' }}>Send</button>
            </form>
        </>
    );
}
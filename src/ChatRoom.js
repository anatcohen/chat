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
        };

    useEffect(() => document.getElementById('messageBox').focus())

    return (
        <div id='chatRoom'>
            <header>
                <p><span>•</span> You{props.users.list.filter(user => user.name !== props.users.self.name).map(value => { return `, ${value.name} ` })}</p>
                <Link to='/messenger' onClick={() => props.deleteSelf(props.users.self.id)}><button /></Link>
            </header>
            <div id='chatBody'>
                {props.messages.list.map((mes, index) => {
                    // Checks who sent message and if previous message was sent by same user
                    let userName = (mes.user === props.users.self.name) ? 'YOU' : mes.user.toUpperCase(),
                        sameUser = (index > 1) ? (props.messages.list[index - 1].user === mes.user) : false;

                    return mes.type === 'message' ?
                        <Message key={index} message={mes} userName={userName} sameUser={sameUser} /> :
                        <p key={index} id='newUser'>{`${userName} ${mes.content}`}</p>
                })}
            </div>
            <footer>
                <form onSubmit={onMessageSubmit} autoComplete='off'>
                    <input type='text' onChange={onMessageChange} placeholder='Enter message' id='messageBox' />
                    <button id='sendBtn' />
                </form>
            </footer>
        </div>
    );
}
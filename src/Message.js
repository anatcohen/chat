import React from 'react';

export default function Message(props) {
    return (
        <>
            <p>{props.timeStamp}</p>
            <h3>{props.message}</h3>
        </>
    );
}
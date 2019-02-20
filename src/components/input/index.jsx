import React from 'react';

const input = (props) => (
    <input className={'form-input'} name={props.name} onChange={props.change} placeholder={props.placeholder} value={props.value} />
)

export default input;
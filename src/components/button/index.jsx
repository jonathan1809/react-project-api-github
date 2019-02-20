import React from 'react';
import './index.scss';
const button = (props) =>
    (
        <button className={'btn ' + props.btnColor} onClick={props.click} > {props.text}</button >
    )

export default button;

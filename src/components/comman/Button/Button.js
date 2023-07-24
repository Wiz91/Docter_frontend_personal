import React from "react";

const Button = (props) => {
    return (
        <>
            <button onClick={props.onClick} className={`p-4 text-white font-semibold hover:bg-black bg-${props.background}`}>{props.text}</button>
        </>
    )
}

export default Button;

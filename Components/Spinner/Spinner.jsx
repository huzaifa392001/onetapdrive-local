import React from 'react'
import "./Spinner.scss"

function Spinner() {
    return <span className="loader" >
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
    </span>
}

export default Spinner
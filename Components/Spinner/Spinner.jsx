import React from 'react'
import "./Spinner.scss"

function Spinner() {
    return <span class="loader" >
        <div class="dot" />
        <div class="dot" />
        <div class="dot" />
    </span>
}

export default Spinner
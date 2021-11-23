import React from 'react'

function Header(props) {
    return (
        <div>
            <h1 className="font-weight-light display-1 text-center">{props.title}</h1>
        </div>
    )
}

export default Header

import React from 'react'

export const AbilityCreator = ({ callBackF, iconCmp, name }) => {

    return (
        <button className="btn abilities" onClick={callBackF}>
            <span className="icon">
                {React.createElement(iconCmp, {})}
            </span>
            <span className="ability">{name}</span>
        </button>
    )
}


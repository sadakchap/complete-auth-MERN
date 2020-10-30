import React from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'


const PanelsContainer = ({ changeMode }) => {
    return (
        <div className="panels-container">
            <LeftPanel changeMode={changeMode} />
            <RightPanel changeMode={changeMode} />
        </div>
    )
}

export default PanelsContainer

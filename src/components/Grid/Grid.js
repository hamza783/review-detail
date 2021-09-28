import React from 'react';
import './Grid.css';

const Grid = ({children}) => (
    <div className="wrapper">
        <div className="content">{children}</div>
    </div>
)

export default Grid;
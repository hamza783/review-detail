import React from "react";
import './Header.css'
import { Link } from "react-router-dom";

const Header = () => (
    <div className="header">
        <Link style={{textDecoration:'none', color:'white'}} to='/'>
            <h3>Reviews</h3>
        </Link>
    </div>
)

export default Header;
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import '../styles/Header.css'
import LocationSearch from './LocationSearch'

class Header extends Component {
    render() {
        return (
            <div>
                <div className="header">
                    <div className="logo">
                        <h1>KALICOS</h1>
                    </div>
                    <div className="headersearch">
                        <LocationSearch />
                    </div>
                </div>
                <div className="navbar">
                    <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/maps">Maps</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)


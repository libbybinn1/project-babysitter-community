import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import logo from '../img/logo5.png';

export default function NavBar(props) {
 
    let currentUser = window.localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);

    return (

        <header id="Home">
            <nav class="flexbox-header" ><br />
                <div class="dot">
                    <div className="content"><h2></h2></div>
                    <div className="navbar">
                        <div className="navbar-logo">

                        </div>
                        <div id="navWrapper">
                            <ul class="active" className="navbar-social">
                                <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/logOut">Log out</NavLink>{" "}
                                <NavLink style={{ color: "rgb(255 174 0)" }} activeclassname="active" className="navigation nav-link" exact="true" to="/main">Pass as a user</NavLink>
                                <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/manager/signInReqests">See sign in requests</NavLink>
                                <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/manager/exceptionRequests">See exception requests</NavLink>
                                <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/manager/members">Members</NavLink>
                                <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/manager/sendEmail">Send email 💌</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
              
            </nav>
            <img src={logo} id="logo" style={{marginLeft: 73}}></img>

        </header>
    );
}


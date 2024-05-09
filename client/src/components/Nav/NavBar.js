import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import './nav.css';
import logo from '../img/logo5.png';


export default function NavBar(props) {
    let currentUser = window.localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    const [points, setPoints] = useState(currentUser.Personal_Hours);

    async function getPoints() {
        try {
           let points = await fetch(`http://localhost:8080/api/user/${currentUser.ID}/getPoints`)
            points = await points.json();
            setPoints(points[0].Personal_Hours);
            window.localStorage.setItem("currentPoints", points[0].Personal_Hours)
        }
        catch (err) {
            alert("filed to get points")
        }
    }


    useEffect(() => {
        getPoints()
    }, [])


    return (
        <>
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
                                    {currentUser.manager ? <NavLink style={{ color: "rgb(255 174 0)" }} className="navigation nav-link" activeclassname="active"  exact="true" to="/main/managerNavBar">Pass as a manager</NavLink> : ''}
                                    <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/babysitter/history">History</NavLink>
                                    <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/babysitter/exceptionRequest">Exception request</NavLink>
                                    <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/babysitter/myCommitment">See commitments</NavLink>
                             
                                    <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/babysitter/myReqests">See my reqests</NavLink>
                                    <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/babysitter/addReqest">Add reqest</NavLink>
                                    <NavLink activeclassname="active" className="nav-link navigation" exact="true" to="/main/babysitter/reqests">See all reqests</NavLink>
                             
                                    <NavLink activeclassname="active" className="nav-link" class="navigation" exact="true" to="/main/babysitter/chat">💬</NavLink>
                                    <h2 id="my_name" >My points: {points}</h2>
                                </ul>
                            </div>
                        </div>

                    </div>
                </nav>
            </header>
            <img src={logo} id="logo"></img>

        </>
    );
}
















import React from 'react'
import { useNavigate } from 'react-router';


export default function Logout() {

    const navigate = useNavigate();
    setTimeout(() => {
        localStorage.removeItem("currentUser")
        navigate("/login")
    }, 1500);

    return (
        <div>
            <p>good bye ✋</p>
        </div>)
}
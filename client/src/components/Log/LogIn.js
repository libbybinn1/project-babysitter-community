import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './log.css';
import { CheckPassword, CheckEmail } from '../validation'
import { UserLink } from '../links'
// import back2 from '../img/2.jpg';
import back from '../img/1.jfif';

export default function LogIn(props) {
    let navigate = useNavigate();

    function getToSign() {
        navigate('/signIn');
    }
    function handleSubmit(event) {
        event.preventDefault();
        isValid(event);
    }

    async function isValid(event) {
        let person = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        }
        if (CheckPassword(person.password) && CheckEmail(person.email)) {
            try {
                let response = await fetch(`${UserLink()}/logIn`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(person), mode: 'cors'
                });
                let dataUser = await response.json();
                if (!dataUser[0])
                    throw "Sorry, you need to check your details or sign in :( ";
                window.localStorage.setItem("currentUser", JSON.stringify(dataUser[0]));
                if (dataUser[0].manager)
                    navigate('/main/managerNavBar');
                else
                    navigate('/main');
            } catch (err) {
                alert(err)
            }
        }
        else {
            navigate('/logIn');

        }
    }

    return (
        <div>
            <div>
                <div className="login-box">
                    <h2>Login</h2>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="user-box">
                            <input name="name"  type="text" required />
                            <label>LastName</label>
                        </div>
                        <div className="user-box">
                            <input name="email"  type="email" required />
                            <label>email</label>
                        </div>
                        <div className="user-box">
                            <input name="password" type="password" required />
                            <label >Password</label>
                            <input type="submit" className="sub" /><span /> <span /> <span /> <span />
                        </div>
                        <input type="button" placeholder="sign in" onClick={() => getToSign()}></input>
                    </form>
              
                </div>
                <div class="bg"></div>
                    <div class="bg bg2"></div>
                    <div class="bg bg3"></div>
                    <div class="content">
                    </div>
            </div>
        </div>

    );
}


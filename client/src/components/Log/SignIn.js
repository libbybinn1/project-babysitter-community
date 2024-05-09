import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './log.css';
import { CheckPassword, CheckEmail } from '../validation'
import {UserLink} from '../links'



export default function LogIn(props) {
    let navigate = useNavigate();

    const [flag, setFlag] = useState(false)

    function getTolog() {
        navigate('/logIn');
    }

    function handleSubmit(event) {
        event.preventDefault();
        isValid(event);
    }

    async function isValid(event) {
        try {
            let user = {
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
                address: event.target.address.value
            }
            if (CheckPassword(user.password) && CheckEmail(user.email)) {
                let data = await fetch(`${UserLink()}/signIn`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user), mode: 'cors'
                });

                if (data.status === 400)
                    alert('you need to log in')
                else {
                    setFlag(true)
                    setTimeout(() => {
                        setFlag(false)
                    }, 3000)
                 
                }
                
            }
            else {
                navigate('/signIn');
            }

            
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div>
            <div>
                {flag && <div className="login-box">
                    <h1>Your request has been sent to the system !!</h1>
                    <h1>we will send you an email with the answer </h1>
                </div>}
                {!flag && <div className="login-box">
                    <h2>SignIn</h2>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <div className="user-box">
                        
                            <input name="name" placeholder="name" type="text" />
                            <label>Lastname</label>
                        </div>
                        <div className="user-box">
                            
                            <input name="email" placeholder="email" type="email" />
                            <label>email</label>
                        </div>
                        <div className="user-box">
                          
                            <input name="password" placeholder="password" type="password" />
                            <label >Password</label>
                            <div className="user-box">
                            
                                <input name="address" placeholder="address" type="text" />
                                <label>address</label>
                            </div>
                            <input type="submit" id="sub" /><span /> <span /> <span /> <span />

                        </div>
                        <input type="button" placeholder="sign in" onClick={() => getTolog()}></input>
                    </form>
                </div>}
            </div>
            <div class="bg"></div>
                    <div class="bg bg2"></div>
                    <div class="bg bg3"></div>
                    <div class="content">
                    </div>
        </div>

    );
}


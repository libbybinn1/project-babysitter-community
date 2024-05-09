import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import home from '../img/home.png'

import { ManagerLink } from '../links'



export default function Email() {
    let navigate = useNavigate();

    async function handleSubmit(event) {
        let item = {
            email: event.target.email.value,
            text: event.target.text.value,
            subject: event.target.subject.value
        }
        let data = await fetch(`${ManagerLink()}/sendMail`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item), mode: 'cors'
        });
        navigate('/main/managerNavBar')
    }



    return (


        <div className="back">
            
            <div className="center" style={{height: 423}} >
                <h2 style={{color: "#050f3b"}}>enter details:</h2>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="inputbox">
                
                        <input name="email" placeholder="email@outlook.co.il" type="email" required />
                        
                    </div>
                    <div className="inputbox">
                        <input name="text" placeholder="text" type="text" required />
                     
                    </div>
                    <div className="inputbox">
                        <input name="subject" placeholder="subject" type="text" />
                        </div>
                        <div className="inputbox">  <input type="submit"  placeholder="sent the email" /><span /> <span /> <span /> <span /></div>
                    
                </form>
           
            </div>
            <input type="image" src={home} onClick={() => navigate('/main/managerNavBar')} className="getHome"></input>
        </div >
    );
}























        {/* <div class="center">
  <h1>Our Newsletter</h1>
  <form>
    <div class="inputbox">
      <input type="text" required="required">
      <span>Email</span>
    </div>
    <div class="inputbox">
      <input type="text" required="required">
      <span>Password</span>
    </div>
    <div class="inputbox">
      <input type="button" value="submit">
    </div>
  </form>
</div> */}
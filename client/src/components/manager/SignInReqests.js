import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {ManagerLink} from '../links'
import home from '../img/home.png'



export default function SignInReqests() {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

    let navigate = useNavigate();


    async function add(reqest) {
        let data = await fetch(`${ManagerLink()}/approveSignInReqest`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqest), mode: 'cors'
        });
        data = await data.json()
        setRequests(data);
     
    }

    async function reject(item) {
        let data = await fetch(`${ManagerLink()}/rejectSignInReqest`, {
            method: 'DELETE', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item), mode: 'cors'
        });
        data = await data.json()
        setRequests(data);
     
    }
    const [requests, setRequests] = useState(['']);


    const getData = async () => {
        try {
            let response = await fetch(`${ManagerLink()}/signInReqests`, { method: 'GET' })
            response = await response.json()
            if (!response) throw "ERROR"
            setRequests(response);
        } catch (msg) {
            alert(msg)
        }

    }
    useEffect(() => {
        getData();
    }, [])


    return (

        <div >
             <h1 className="titel">Sign in reqests:</h1>
     <input  type="image" src={home} onClick={() => navigate('/main/managerNavBar')} className="getHomeTop" ></input>
            <div className="todo">
                {requests.map(
                    item =>
                        <div key={item.ID_reqest} className="item">
                            <h1><u>family name:</u> {item.LastName}</h1>
                            <h1><u>mail:</u> {item.Mail}</h1>
                            <h1><u>address: </u>{item.Address}</h1>
                            <button type="button" className="get btn" onClick={() => add(item)} >add</button>
                            <button type="button" className="get btn" onClick={() => reject(item)} >reject</button>
                        </div>)}
            </div>
        </div >
    );
}

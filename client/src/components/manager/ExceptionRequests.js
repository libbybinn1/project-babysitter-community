
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import home from '../img/home.png'
import {ManagerLink} from '../links'


export default function ExceptionRequests() {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));

    let navigate = useNavigate();

    const [requests, setRequests] = useState(['']);


    const getData = async () => {
        try {
            let response = await fetch(`${ManagerLink()}/exceptionRequests`, { method: 'GET' })
            let data = await response.json()
            if (!data) throw "ERROR"
            setRequests(data);
        } catch (msg) {
            alert(msg)
        }

    }
    async function approve(id) {
        try {
            let data = await fetch(`${ManagerLink()}/approveExceptionRequest`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id:id}), mode: 'cors'
            });
             data = await data.json()
            if (!data) throw "ERROR"
            setRequests(data);
        } catch (msg) {
            alert(msg)
        }
    }

    useEffect(() => {
        getData();
    }, [])



    return (

        <div >
          <h1 className="titel">exception reqests:</h1>
     <input  type="image" src={home} onClick={() => navigate('/main/managerNavBar')} className="getHomeTop" ></input>
            <div className="todo" style={{ height: "2000px", overflowY: "auto" }}>
                {requests.map(
                    item =>
                        <div key={item.ID_reqest} className="item" style={{height: 530}}>
                            <h1><u>family name:</u> {item.lastname}</h1>
                            <h1><u>mail:</u> {item.mail}</h1>
                            <h1><u>address: </u>{item.address}</h1>
                            <h1><u>points: </u>{item.Personal_Hours}</h1>
                            <h1>-----------------</h1>
                            <h1><u>date: </u>{item.b_date}</h1>
                            <h1><u>time:</u> {item.b_time}</h1>
                            <h1><u>amount of hours:</u> {item.hours}</h1>
                            <h1><u>amount of children:</u> {item.childrenamount}</h1>
                            {item.comments ? <h1><u>comments:</u> {item.comments}</h1> : ''}
                            <h1>-----------------</h1>
                            <h1><u>exception reason: </u>{item.exceptionReason}</h1>
                            <button type="button" className="get btn" onClick={() => approve(item.ID_reqest)} >approve this reqest</button>
                        </div>)}
             
            </div>
        </div >
    );
}
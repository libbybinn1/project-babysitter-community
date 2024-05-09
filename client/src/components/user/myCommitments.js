import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {BabysitterLink} from '../links'
import home from '../img/home.png'




export default function MyCommitments() {
       let navigate = useNavigate();
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    
    async function cancel(req) {
        let data = await fetch(`${BabysitterLink()}/myCommitments/cancle`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req), mode: 'cors'
        });
        let arr = [...requests]
        arr = arr.filter(i => i.ID_reqest != req.item.ID_reqest)
        setRequests(arr);
    }
    const [requests, setRequests] = useState(['']);


    const getData = async () => {
        try {
            let response = await fetch(`${BabysitterLink()}/${currentUser.ID}/myCommitments`, { method: 'GET' })
            let data = await response.json()
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
             <h1 className="titel">All my commitments:</h1>
             <input  type="image" src={home} onClick={() => navigate('/main')} className="getHomeTop" ></input>
            <div className="todo">
                {requests.map(
                    item =>
                        <div key={item.ID_reqest} className="item" >

                            <h1><u>family name:</u> {item.lastname}</h1>
                            <h1><u>mail:</u> {item.mail}</h1>
                            <h1><u>address: </u>{item.address}</h1>
                            <h1>-----------------</h1>
                            <h1><u>date: </u>{item.b_date}</h1>
                            <h1><u>time:</u> {item.b_time}</h1>
                            <h1><u>amount of hours:</u> {item.hours}</h1>
                            <h1><u>amount of children:</u> {item.childrenamount}</h1>
                            {item.comments ? <h1><u>comments:</u> {item.comments}</h1> : ''}
                            <button type="button" className="get btn" onClick={() => cancel({ item: item, cID: currentUser.ID })} >cancel</button>
                        </div>)}
            </div>
        </div >
    );
}

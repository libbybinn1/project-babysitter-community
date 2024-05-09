
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { BabysitterLink } from '../links'
import home from '../img/home.png'



export default function MyHistory() {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const listInnerRef = useRef();
    let navigate = useNavigate();

    const [end, setEnd] = useState(5);
    const [requests, setRequests] = useState(['']);

    const getData = async () => {
        try {
            let response = await fetch(`${BabysitterLink()}/myHistory?id=${currentUser.ID}&end=${end}`, { method: 'GET' })
            let data = await response.json()
            if (!data) throw "ERROR"
            setRequests(data);
        } catch (msg) {
            alert(msg)
        }
    }

    useEffect(() => {
        getData();
    }, [end])

    function onScroll() {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                let tmp = end + 5
                setEnd(tmp);
            }
        }
    }


    return (

        <div >
             <h1 className="titel">My old reqests:</h1>
     <input  type="image" src={home} onClick={() => navigate('/main')} className="getHomeTop" ></input>
            <div className="todo" style={{ height: "2000px", overflowY: "auto" }} onScroll={onScroll} ref={listInnerRef}>
                {requests.map(
                    item =>
                        <div key={item.ID_reqest} className="item" >
                            <h1><u>date: </u>{item.B_Date}</h1>
                            <h1><u>time:</u> {item.B_Time}</h1>
                            <h1><u>amount of hours:</u> {item.hours}</h1>
                            <h1><u>amount of children:</u> {item.childrenAmount}</h1>
                            {item.comments ? <h1><u>comments:</u> {item.comments}</h1> : <br />}
                            <h1><u>status:</u> {item.ID_memberRecieve ? '👍' : '👎'}</h1>
                        </div>)}
            </div>
        </div >
    );
}
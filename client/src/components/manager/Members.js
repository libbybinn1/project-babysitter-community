
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ManagerLink } from '../links'
import home from '../img/home.png'




export default function Members() {
    let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    const listInnerRef = useRef();
    let navigate = useNavigate();

    const [end, setEnd] = useState(5);
    const [requests, setRequests] = useState(['']);

    const removeMember = async (item) => {
        try {
            await fetch(`${ManagerLink()}/removeMember`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item), mode: 'cors'
            });
            let data = [...requests]
            data = data.filter(i => i.ID != item.ID)
            if (!data) throw "ERROR"
            setRequests(data);
        } catch (msg) {
            alert(msg)
        }
    }

    const getData = async () => {
        try {
            let response = await fetch(`${ManagerLink()}/members?id=${currentUser.ID}&end=${end}`, { method: 'GET' })
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

    const searchName = async (item) => {
        try {
            let response = await fetch(`${ManagerLink()}/members/searchName?name=${item.target.value}&id=${currentUser.ID}`, { method: 'GET' })
            let data = await response.json()
            if (!data) throw "ERROR"
            setRequests(data);
        } catch (msg) {
            alert(msg)
        }
    }

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
             <h1 className="titel">Members:</h1>
     <input  type="image" src={home} onClick={() => navigate('/main/managerNavBar')} className="getHomeTop" ></input>
            <form>
                <h2 style={{color: "#01408f" ,marginTop: -78}}>enter family name to search:</h2>
                <input type="text" name="name" className="date" placeholder="name" onChange={searchName} ></input>
            </form>

            <div className="todo" style={{ height: "2000px", overflowY: "auto" }} onScroll={onScroll} ref={listInnerRef}>
                {requests.map(
                    item =>
                        <div key={item.ID} className="item">
                            <h1><u>family name:</u> {item.LastName}</h1>
                            <h1><u>mail:</u> {item.Mail}</h1>
                            <h1><u>address: </u>{item.Address}</h1>
                            <h1><u>personal Hours: </u>{item.Personal_Hours}</h1>
                            <button onClick={() => removeMember(item)}>remove member</button>
                        </div>)}
    
            </div>
        </div >
    );
}
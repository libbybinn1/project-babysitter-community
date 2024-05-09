
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { BabysitterLink } from '../links'
import home from '../img/home.png'




export default function GetRequest() {
  let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  const listInnerRef = useRef();
  let navigate = useNavigate();

  const [end, setEnd] = useState(5);
  const [requests, setRequests] = useState(['']);

  async function tookBabysitter(ids) {

    let data = await fetch(`${BabysitterLink()}/tookReqest`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids), mode: 'cors'
    });
    let arr = [...requests]
    arr = arr.filter(item => item.ID_reqest != ids.id_reqest)
    setRequests(arr);
  }

  const getData = async () => {
    try {
      let response = await fetch(`${BabysitterLink()}/requests?idAsk=${currentUser.ID}&end=${end}`, { method: 'GET' })
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
        let tmp = end
        setEnd(tmp + 5);
      }
    }
  }



  async function search(e) {
    try {
      let date = e.currentTarget.value;
      let response = await fetch(`${BabysitterLink()}/searchReqests?date=${date}&id=${currentUser.ID}`, { method: 'GET' })
      let data = await response.json()
      if (!data) throw "ERROR"
      setRequests(data)
    } catch (msg) {
      alert(msg)
    }
  }

  return (

    <div >
      <div>
      <h1 className="titel">All relevant requests</h1>
      <input  type="image" src={home} onClick={() => navigate('/main')} className="getHomeTop" ></input>
      </div>
      <h2 style={{color: "#01408f" ,marginTop: -78}}>enter date to search:</h2>
      <input type="date" className="date" name="date" onChange={search}></input>
     
      <div className="todo" style={{ height: "2000px", overflowY: "auto" }} onScroll={onScroll} ref={listInnerRef}>
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
              {item.comments ? <h1><u>comments:</u> {item.comments}</h1> : <div ></div>}
              <button type="button" className="get btn" onClick={() => tookBabysitter({ id_reqest: item.ID_reqest, cID: currentUser.ID })} >get this babysiter</button>
            </div>)}
          
      </div>
    </div >
  );
}
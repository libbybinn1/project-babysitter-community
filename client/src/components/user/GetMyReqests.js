
import { useEffect, useState } from 'react';
import UpdataRequest from './UpdateReqest';
import { useNavigate } from "react-router-dom";
import { BabysitterLink } from '../links'
import home from '../img/home.png'


export default function GetMyRequests() {
  let currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
  let navigate = useNavigate();
  const [requests, setRequests] = useState([''])
  const [details, setDetails] = useState([''])
  const [item, setItem] = useState(null)
  const [count, setCount] = useState(0)

  async function deleteRequest(it) {
    let res = await fetch(`${BabysitterLink()}/deleteRequest`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(it), mode: 'cors'
    });
    let arr = [...requests]
    arr = arr.filter(item => item.id_reqest != it.id_reqest)
    setRequests(arr)
  }
  function updateRequest(i) {
    setItem(i);
  }

  const getData = async () => {

    try {

      let response = await fetch(`${BabysitterLink()}/myRequests/${currentUser.ID}`, { method: 'GET' })
      response = await response.json();
      if (!response) throw "ERROR in getting list"
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
     <h1 className="titel">My baby sitter reqests:</h1>
     <input  type="image" src={home} onClick={() => navigate('/main')} className="getHomeTop" ></input>
      {item && <UpdataRequest item={item} />}
      <div className="todo" >
        {!item && requests.map(
          item =>
            <div className="item" key={item.id} >
              <h1><u>date: </u>{item.b_date}</h1>
              <h1><u>time:</u> {item.b_time}</h1>
              <h1><u>amount of hours:</u> {item.hours}</h1>
              <h1><u>amount of children:</u> {item.childrenamount}</h1>
              {item.comments ? <h1><u>comments:</u> {item.comments}</h1> : <br />}
              <h1><u>status:</u> {item.ID_memberRecieve ? '👍' : '👎'}</h1>
              {item.ID_memberRecieve ? <h1><u>name:</u> {item.lastname}</h1> : <br />}
              {item.ID_memberRecieve ? <h1><u>mail:</u> {item.mail}</h1> : <br />}


              <button onClick={() => deleteRequest(item)} className="sub get">delete</button>
              {!item.ID_memberRecieve ? <button onClick={() => updateRequest(item)} className="sub get">update</button> : ''}

            </div>)}
        
      </div>
    </div >
  );
}
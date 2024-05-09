import { useEffect, useState } from 'react';
import {BabysitterLink} from '../links'


export default function UpdataRequest(props) {
    let details = props.item;

    async function update(e) {
        let request = {
            hours: e.target.hours.value,
            time: e.target.time.value,
            date: e.target.date.value,
            children: e.target.children.value,
            comments: e.target.comments.value
        }
        let result = await fetch(`${BabysitterLink()}/myRequests/${props.item.ID_reqest}/updataRequest`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request), mode: 'cors'
        });
    }

    return (

        <div >
            <div className="todo">
                <form onSubmit={(e) => update(e)}>
                    <input type="date" placeholder="date" name="date" defaultValue={details.b_date} required></input>
                    <input type="time" placeholder="time" name="time" defaultValue={details.b_time} required></input>
                    <input type="number" placeholder="amount of hours" defaultValue={details.hours} name="hours" required></input>
                    <input type="number" placeholder="amount of children" defaultValue={details.childrenamount} name="children" required></input>
                    <input type="text" placeholder="comments" name="comments" defaultValue={details.comments}></input>
                    <input type="submit" ></input>
                </form>
            </div>
        </div >
    );
}

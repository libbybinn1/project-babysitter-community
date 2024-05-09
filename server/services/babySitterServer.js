// Imports necessary modules for database operations, email sending, and configuration.
const db = require('./DB')
const email = require('../email')
const config = require('../config')

// Retrieves all babysitter requests that haven't been assigned a receiver.
async function getAllBabysitterReqests(item) {
    let data = await db.query(`select bs.ID_reqest, bs.id_memberask, bs.b_date , bs.b_time, bs.hours, bs.childrenamount,bs.comments, m.lastname, m.mail, m.address 
    from babyExchange.babysitterReqests bs join members m on m.id=bs.id_memberask where bs.ID_memberRecieve is null and bs.exception is false and bs.ID_memberAsk !=${item.idAsk} and B_Date>=CURDATE() limit 0,${item.end}`);
    return data;
}

// Retrieves all babysitter commitments of a specific member.
async function getAllmyBabysitterCommitments(id) {
    let data = await db.query(`select bs.ID_reqest, bs.id_memberask, bs.b_date , bs.b_time, bs.hours,
    bs.childrenamount,bs.comments, m.lastname, m.mail, m.address  from babyExchange.babysitterReqests bs join babyExchange.members m on m.id=bs.ID_memberAsk
     where  ID_memberRecieve=${id} and bs.b_date>=curdate()`);
    return data;
}

// Retrieves babysitter requests submitted by a specific member.
async function getMyBabysitterReqests(id) {
    let data = await db.query(`select bs.id_reqest,bs.id_memberask, bs.ID_memberRecieve, bs.b_date , bs.b_time, bs.hours, bs.childrenamount,bs.comments, m.lastname, m.mail 
    from babyExchange.babysitterReqests bs left join members m on m.id=bs.ID_memberRecieve where ID_memberAsk=${id} and bs.exception is false and B_Date>=CURDATE()`);
    return data;
}

// Cancels a babysitter request, updates member's personal hours, and sends a notification email.
async function cancleBabysitter(req) {
    // Cancellation logic...
}

// Retrieves all available babysitter requests for a given member.
async function AllBabysitterReqests(item) {
    let data = await db.query(`select bs.ID_reqest, bs.id_memberask, bs.b_date , bs.b_time, bs.hours, bs.childrenamount,bs.comments, m.lastname, m.mail, m.address 
    from babyExchange.babysitterReqests bs join members m on m.id=bs.id_memberask where bs.ID_memberRecieve is null and bs.exception is false and bs.ID_memberAsk !=${item} and B_Date>=CURDATE()`);
    return data;
}

// Updates a babysitter request by assigning it to a member and adjusting personal hours.
async function tookBabysitterReqest(user) {
    // Update database with assigned member ID for the request.
    await db.query(`UPDATE babyExchange.babysitterreqests SET ID_memberRecieve = ${user.cID} WHERE ID_reqest = ${user.id_reqest}`);

    // Retrieve details of the request.
    let details = await db.query(`select id_memberask,ID_memberRecieve, childrenAmount,hours from babyExchange.babysitterReqests where ID_reqest=${user.id_reqest}`);
    let points = details[0].hours;

    // Calculate points based on the number of children.
    if (details[0].childrenAmount > 3 && details[0].childrenAmount < 6) {
        points = details[0].hours * 1.5;
    }
    else if (details[0].childrenAmount > 6) {
        points = details[0].hours * 2;
    }

    // Update personal hours for the assigned member.
    await db.query(`UPDATE babyExchange.babysitterreqests bs join babyExchange.members m on bs.ID_memberAsk=m.ID SET m.Personal_Hours = m.Personal_Hours+${points} where m.ID=${user.cID}`);
    // Update personal hours for the member who submitted the request.
    await db.query(`UPDATE babyExchange.babysitterreqests bs join babyExchange.members m on bs.ID_memberAsk=m.ID SET m.Personal_Hours = m.Personal_Hours-${points} where m.ID=${details[0].id_memberask}`);

    let data = await AllReqests(user.cID);
    return data;
}

// Adds a new babysitter request to the database.
async function addBabysitterReqest(user) {
    let points = await db.query(`select Personal_Hours, ID,exception  from babyExchange.members join babyExchange.babysitterReqests where ID=${user.id}`);
    if (points[0].Personal_Hours  < -10 && !user.exception) {
        return 0;
    }

    await db.query(`insert into babyExchange.babysitterreqests value (default,${points[0].ID},default,'${user.date}','${user.time}',${user.hours},${user.children},'${user.comments}',${user.exception},'${user.reason}')`);
    return 1;
}

// Deletes a babysitter request submitted by a member.
async function deleteMyBabysitterReqest(items) {
    let points = items.hours;
    if (items.ID_memberRecieve) {
        if (items.childrenamount > 3 && items.childrenamount < 6) {
            points = items.hours * 1.5;
        }
        else if (items.childrenamount > 6) {
            points = items.hours * 2;
        }
        await db.query(`UPDATE babyExchange.babysitterreqests bs join babyExchange.members m on bs.ID_memberAsk=m.ID SET m.Personal_Hours =m.Personal_Hours+${0.8 * points} where m.ID=${items.id_memberask}`);
        await db.query(`UPDATE babyExchange.babysitterreqests bs join babyExchange.members m on bs.ID_memberAsk=m.ID SET m.Personal_Hours =m.Personal_Hours-${0.8 * points} where m.ID=${items.ID_memberRecieve}`);

        const item = {
            managerEmail: config.emailAcount.email,
            managerEmailPassword: config.emailAcount.emailPassword,
            receiver: items.mail,
            html: `<h1>Hello ${items.lastname},</h1><h2>we are sorry to let you know that your comitment to do the babyExchange in ${items.b_date} at ${items.b_time} has been cancled and you are free of doing it!!</h2><h2>have a good day😊</h2>`,
            subject: 'important!!! cancle from babyExchange system'
        }
        email.sendEmail(item);
    }
    await db.query(`delete from babyExchange.babysitterreqests where ID_reqest = ${items.id_reqest}`);
}

// Updates an existing babysitter request with new information.
async function updateBabysitterRequest(req) {
    const item = req.body;
    let res = await db.query(`UPDATE babyExchange.babysitterreqests SET b_date='${item.date}',b_time='${item.time}',hours=${item.hours},childrenamount=${item.children},comments='${item.comments}' WHERE ID_reqest = ${req.id}`);
    let points = req.item.hours;
    if (req.item.childrenamount > 3 && req.item.childrenamount < 6) {
        points = req.item.hours * 1.5;
    }
    else if (req.item.childrenamount > 6) {
        points = req.item.hours * 2;
    }
    await db.query(`UPDATE babyExchange.babysitterreqests bs join babyExchange.members m on bs.ID_memberAsk=m.ID SET m.Personal_Hours =m.Personal_Hours-${points} where bs.ID_memberRecieve=${req.cID}`);
    await db.query(`UPDATE babyExchange.babysitterreqests bs join babyExchange.members m on bs.ID_memberAsk=m.ID SET m.Personal_Hours =m.Personal_Hours+${points} where bs.id_memberask=${req.item.id_memberask}`);
    let data = await getAllmyBabysitterCommitments(req.cID);
    return data;
}

// Retrieves details of a specific babysitter request.
async function getBabysitterReqest(id) {
    let data = await db.query(`select  bs.b_date , bs.b_time, bs.hours, bs.childrenamount,bs.comments from babyExchange.babysitterReqests bs where ID_reqest=${id} and B_Date>=CURDATE()`);
    return data;
}

// Adds a babysitter exception request to the database.
async function addBabysitterException(data) {
    await db.query(`insert into babyExchange.babysitterreqests value (default,${data.ID},default,'${data.date}','${data.time}',${data.hours},${data.children},'${data.comments}')`);
}

// Searches for babysitter requests based on specified criteria.
async function searchReqests(item) {
    let data = await db.query(`select bs.ID_reqest, bs.id_memberask, bs.b_date , bs.b_time, bs.hours, bs.childrenamount,bs.comments, m.lastname, m.mail, m.address 
    from babyExchange.babysitterReqests bs join members m on m.id=bs.id_memberask where bs.ID_memberRecieve is null and bs.exception is false and bs.ID_memberAsk !=${item.id} and b_date='${item.date}'
     and B_Date>=CURDATE()`);
    return data;
}

// Retrieves the history of babysitter requests submitted by a member.
async function getMyHistory(item) {
    let data = await db.query(`select * from babyExchange.babysitterreqests where id_memberask=${item.id} and CURDATE()>b_date limit 0,${item.end}`);
    return data;

}

module.exports = {
    getAllBabysitterReqests,
    tookBabysitterReqest,
    getAllmyBabysitterCommitments,
    cancleBabysitter,
    addBabysitterReqest,
    getMyBabysitterReqests,
    deleteMyBabysitterReqest,
    updateBabysitterRequest,
    getBabysitterReqest,
    addBabysitterException,
    searchReqests,
    getMyHistory,
    AllBabysitterReqests
}
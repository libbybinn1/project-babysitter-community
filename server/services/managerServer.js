// Imports necessary modules for database operations, email sending, and configuration.
const db = require('./DB')
const email = require('../email')
const config = require('../config')

// Retrieves all babysitter exception requests from the database.
async function getAllBabysitterExceptionRequests() {
    try {
        let data = await db.query("select bs.ID_reqest,m.Personal_Hours,bs.exceptionReason, bs.b_date , bs.b_time, bs.hours, bs.childrenamount,bs.comments, m.lastname, m.mail, m.address  from babyExchange.babysitterReqests bs join members m on m.id=bs.id_memberask where bs.exception is true and B_Date>=CURDATE()");
        return data;
    } catch (err) {
        console.log(err)
    }
}

// Approves a babysitter exception request by updating the database.
async function approveBabysitterException(id) {
    try {
        await db.query(`update babyExchange.babysitterreqests set exception = 0 where id_reqest = ${id}`);
        return getAllExceptionRequests()
    } catch (err) {
        console.log(err)
    }
}

// Retrieves all sign-in requests from the database.
async function getAllSignInReqests() {
    try {
        let data = await db.query(`select * from babyExchange.signIn`);
        return data;
    } catch (err) {
        console.log(err)
    }
}

// Approves a sign-in request and sends a confirmation email to the user.
async function approveSignInReqest(user) {
    try {
        let data = await db.query(`insert into babyExchange.members value(default,'${user.LastName}','${user.Mail}',${user.M_password},'${user.Address}',default,default)`);
        await db.query(`delete from babyExchange.signIn where ID_signIn =${user.ID_signIn}`)
        const item = {
            managerEmail: config.emailAcount.email,
            managerEmailPassword: config.emailAcount.emailPassword,
            receiver: user.Mail,
            html: `<h1 >Hello ${user.LastName}!!!</h1><h2>we are glad to conform you that your reqest has been accepted and you have joined our system!</h2><h2>have a good day😊</h2>`,
            subject: 'answer from babyExchange system'
        }
        email.sendEmail(item);
        return getAllSignInReqests();
    } catch (err) {
        console.log(err)
    }
}

// Rejects a sign-in request and sends a rejection email to the user.
async function rejectSignInReqest(details) {
    try {
        await db.query(`delete from babyExchange.signIn where ID_signIn =${details.ID_signIn}`)
        const item = {
            managerEmail: config.emailAcount.email,
            managerEmailPassword: config.emailAcount.emailPassword,
            receiver: details.Mail,
            html: `<h1>Hello ${details.LastName},</h1><h2>we are sorry to let you know that your reqest to join our system has been reject ...</h2><h2>have a good day</h2>`,
            subject: 'answer from babyExchange system'
        }
        email.sendEmail(item);
        return getAllSignInReqests();
    } catch (err) {
        console.log(err)
    }
}

// Sends an email with specified details.
async function sendMail(details) {
    try {
        const item = {
            managerEmail: config.emailAcount.email,
            managerEmailPassword: config.emailAcount.emailPassword,
            receiver: details.email,
            html: `<h1>${details.text}</h1>`,
            subject: details.subject
        }
        email.sendEmail(item);
    } catch (err) {
        console.log(err)
    }
}

// Retrieves members from the database excluding the specified ID.
async function getMembers(item) {
    try {
        let data = await db.query(`select * from members where id!=${item.id} limit 0,${item.end}`);
        return data;
    } catch (err) {
        console.log(err)
    }
}

// Removes a member from the database.
async function removeMember(item) {
        await db.query(`delete from babyExchange.babysitterreqests  where ID_memberAsk=${item.ID}`)
        await db.query(`delete from babyExchange.members where mail='${item.Mail}'`)
}

// Searches for members in the database based on the provided name.
async function searchName(item) {
       let data= await db.query(`select * from babyExchange.members where lastname like '${item.name}%' and id!=${item.id}`)
        return data
}

// Exports all functions for use in other modules.
module.exports = {
    getAllBabysitterExceptionRequests,
    approveBabysitterException,
    getAllSignInReqests,
    approveSignInReqest,
    rejectSignInReqest,
    sendMail,
    getMembers,
    removeMember,
    searchName
}

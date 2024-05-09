// Imports the 'DB' module for database operations.
const db = require('./DB')

// Function to check if a user exists in the database for logging in.
async function checkLogIn(user) {
    let result = await db.query(`select * from babyExchange.members where Mail='${user.email}'`);
    return result;
}

// Function to check if a user exists in the database for signing in.
async function checkSignIn(user) {
    let result = await db.query(`select * from babyExchange.members  where Mail='${user.email}'`);
    return result;
}

// Function to insert a new record into the database for user sign-in.
async function signIn(user) {
    await db.query(`insert into babyExchange.signIn value (default,'${user.name}','${user.email}',${user.password},'${user.address}')`);
}

// Function to retrieve personal hours data from the database based on user's ID.
async function getPoints(id) {
    let result = await db.query(`select Personal_Hours from babyExchange.members where id=${id}`);
    return result;
}

// Exports the functions for use in other modules.
module.exports = {
    checkLogIn,
    checkSignIn,
    signIn,
    getPoints
}

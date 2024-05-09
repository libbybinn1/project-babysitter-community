const express = require('express')
const router = express.Router();
const userServie = require('../services/userServies')

router.post('/logIn', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await userServie.checkLogIn(req.body);
        res.send(data);
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/signIn', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await userServie.checkSignIn(req.body);
        if (!data[0]) {
            await userServie.signIn(req.body)
            res.status(200).json(null);
        }
        else
            res.status(400).json(null);
        res.end();
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/:id/getPoints', async (req, res) => {

    try {
        let data = await userServie.getPoints(req.params.id);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})




module.exports = router;

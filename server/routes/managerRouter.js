const express = require('express')
const router = express.Router();
const managerServie = require('../services/managerServer')
const Joi = require('joi');
router.get('/exceptionRequests', async (req, res) => {
    try {
        let data = await managerServie.getAllBabysitterExceptionRequests();
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})
router.get('/members', async (req, res) => {
    try {
        let data = await managerServie.getMembers(req.query);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})

router.put('/approveExceptionRequest', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await managerServie.approveBabysitterException(req.body.id);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/signInReqests', async (req, res) => {
    try {
        let data = await managerServie.getAllSignInReqests();
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})
router.post('/approveSignInReqest', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await managerServie.approveSignInReqest(req.body);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

})
router.delete('/rejectSignInReqest', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await managerServie.rejectSignInReqest(req.body);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }

})
router.post('/sendMail', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await managerServie.sendMail(req.body);
        res.send(null)
    }
    catch (err) {
        res.send(err)
    }
})
router.put('/removeMember', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
       await managerServie.removeMember(req.body);
        res.send(null)
    }
    catch (err) {
        res.send(err)
    }
})
router.get('/members/searchName', async (req, res) => {
    try {
        let data = await managerServie.searchName(req.query);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router;
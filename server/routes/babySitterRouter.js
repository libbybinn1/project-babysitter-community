const express = require('express')
const router = express.Router();
const babysitterServie = require('../services/babySitterServer')

router.get('/requests', async (req, res) => {
    try {
        let data = await babysitterServie.getAllBabysitterReqests(req.query);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})
router.get('/myHistory', async (req, res) => {
    try {
        let data = await babysitterServie.getMyHistory(req.query);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})


router.get('/:id/myCommitments', async (req, res) => {
    try {
        let data = await babysitterServie.getAllmyBabysitterCommitments(req.params.id);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})


router.put('/myCommitments/cancle', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await babysitterServie.cancleBabysitter(req.body);
        res.send(data);
    }
    catch (err) {
        res.send(err)
    }
})

router.put('/tookReqest', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        await babysitterServie.tookBabysitterReqest(req.body);
        res.send(null);
    }
    catch (err) {
        res.send(err)
    }
})


router.post('/addReqest', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
        let ans = await babysitterServie.addBabysitterReqest(req.body);
        if (!ans)
            res.status(400).json(null);
        else {
            res.status(200).json(null);
        }


    }
    catch (err) {
        res.send(err)
    }
})
router.get('/myRequests/:id', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        let data = await babysitterServie.getMyBabysitterReqests(req.params.id);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})

router.delete('/deleteRequest', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        await babysitterServie.deleteMyBabysitterReqest(req.body);
        res.send(null)
    }
    catch (err) {
        res.send(err)
    }
})

router.put('/myRequests/:id/updataRequest', async (req, res) => {
    try {
        if (!req.body)
            throw "ERROR---missing details"
        await babysitterServie.updataBabysitterRequest({ body: req.body, id: req.params.id });
        res.send(null)
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/exception', async (req, res) => {

    try {
        if (!req.body)
            throw "ERROR---missing details"
        await babysitterServie.addBabysitterReqest(req.body);
    }
    catch (err) {
        res.send(err)
    }
})
router.get('/searchReqests', async (req, res) => {
    try {
        let data = await babysitterServie.searchReqests(req.query);
        res.send(data)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;


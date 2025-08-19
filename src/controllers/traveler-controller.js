const {TravelerService}  = require('../services');
const {StatusCodes} = require('http-status-codes');


async function createTraveler(req,res){
    try {
        const response = await TravelerService.createTraveler({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        return res.json({
            message: 'request is successful',
            error: {},
            data:{response}
        });
    } catch (error) {
       return res.json({
            message: 'request is failed',
            error: {error}
        });
    }
}

async function destroyTraveler(req,res){
    try {
        const response = await TravelerService.destroyTraveler(req.params.id)
        return res.json({
            message: 'request is successful',
            error: {},
            data:{response}
        });
    } catch (error) {
        return res.json({
            message: 'request is failed',
            error: {error}
        });   
    }
}

async function getTraveler(req,res){
    try {
        const response = await TravelerService.getTraveler(req.params.id)
        return res.json({
            message: 'request is successful',
            error: {},
            data:{response}
        });
    } catch (error) {
        return res.json({
            message: 'request is failed',
            error: {error}
        });     
    }
}

async function getAllTraveler(req,res){
    try {
        const response = await TravelerService.getAllTraveler();
        return res.json({
            message: 'request is successful',
            error: {},
            data:{response}
        });
    } catch (error) {
        return res.json({
            message: 'request is failed',
            error: {error}
        });     
    }
}

async function updateTraveler(req,res){
    try {
        const response = await TravelerService.updateTraveler(req.params.id,req.body);
        return res.json({
            message: 'request is successful',
            error: {},
            data:{response}
        });
    } catch (error) {
        return res.json({
            message: 'request is failed',
            error: {error}
        });     
    }
}

module.exports = {
    createTraveler,
    destroyTraveler,
    getTraveler,
    getAllTraveler,
    updateTraveler
}
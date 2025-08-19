const {AuthService} = require('../services');
const {StatusCodes} = require('http-status-codes');

async function signup(req,res){
    try {
        const response = await AuthService.signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.json({
            success: true,
            message: 'Request is successfull',
            data:{response},
            error:{}
        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Request is failed',
            data:{},
            error:{error}
        })
    }
} 

async function login(req,res){
    try {
        const response = await AuthService.login({
            email: req.body.email,
            password: req.body.password
        })
        return res.json({
            success: true,
            message: 'Request is successfull',
            login:'Login Successful',
            data:{response},
            error:{}
        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Request is failed',
            login:'Login failed',
            data:{},
            error:{error}
        })
    }
} 

module.exports = {
    signup,
    login
}
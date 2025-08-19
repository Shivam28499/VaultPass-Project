const {AuthService} = require('../services');

async function validateAuthRequest(req,res,next){
    if(!req.body.email){
        return res
                .json({
                    success: false,
                    message: 'Email is not found'
                })
    }

    if(!req.body.password){
        return res
                .json({
                    success: false,
                    message: 'password is not found'
                })
    }
    next();
}

async function checkAuth(req,res,next){
    console.log(req.headers);
    try {
        const response = await AuthService.isAuthenticated(req.headers['authorization']);
        if(response){
            req.user = response;
            next();
        }
    } catch (error) {
        return res
                .json({
                    success: false,
                    message: 'Something wrong'
                })
    }
}

module.exports = {
    validateAuthRequest,
    checkAuth
}
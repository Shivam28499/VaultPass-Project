const {ReleaseService} = require('../services');
const {StatusCodes} = require('http-status-codes');

async function releaseLocker(req,res){
    try {
        const response = await ReleaseService.releaseLocker(req.body.lockerNumber);
         return res.json({
            success: true,
            message: 'request is successful',
            error: {},
            data:{response}
        });
    } catch (error) {
        return res.json({
            success: false,
            message: 'request is failed',
            error: {error}
        });
    }
}

module.exports = {
    releaseLocker
}
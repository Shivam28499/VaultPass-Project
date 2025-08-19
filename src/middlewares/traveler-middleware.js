const {StatusCodes} = require('http-status-codes');

async function checkCreateTraveler(req,res,next) {
   if(!req.body.name){
    return res.json({
        success: false,
        message: 'Name is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }
    if(!req.body.email){
    return res.json({
        success: false,
        message: 'Email is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }

    if(!req.body.password){
    return res.json({
        success: false,
        message: 'Password is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }
   next();
}

async function checkDistroyTraveler(req,res,next) {
    if(!req.params.id){
    return res.json({
        success: false,
        message: 'ID is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }
   next();
}

async function checkgetTraveler(req,res,next) {
    if(!req.params.id){
    return res.json({
        success: false,
        message: 'ID is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }
   next();
}

async function checkUpdateTraveler(req,res,next) {
    if(!req.params.id){
    return res.json({
        success: false,
        message: 'ID is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }

    if(!req.body.name || !req.body.email || !req.body.password){
    return res.json({
        success: false,
        message: 'RequestBody is required of the Traveler',
        statuscodes: StatusCodes.BAD_REQUEST
    })
   }

   next();
}

module.exports = {
    checkCreateTraveler,
    checkDistroyTraveler,
    checkUpdateTraveler,
    checkgetTraveler
}
const {TravelerRepository} = require('../repositories');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ServerConfig} = require('../config');


const travelerRepository = new TravelerRepository();
async function signup(data){
    const hashedPassword =  await bcrypt.hashSync(data.password, +ServerConfig.SALT_ROUND);
    data.password = hashedPassword;
    try {
     const traveler = await travelerRepository.create(data);
     return traveler;
    } catch (error) {
        throw error;
    }
}

async function login(data){
    const traveler = await travelerRepository.getEmailbyId(data.email);
    if(!traveler){
        throw new Error("Traveler not found");
    }

    const passwordMatch = bcrypt.compare(data.password,traveler.password);
    if(!passwordMatch){
        throw new Error('password Incorrect');
    }

    try {
        const token = jwt.sign(
        {id: traveler.id, email: traveler.email},
        ServerConfig.JWT_SECRET,
        {expiresIn: ServerConfig.JWT_EXPIRY}
    )
    return token;
    } catch (error) {
        throw error;
    }
}

async function isAuthenticated(token) {
    console.log(token);
    try {
        if(!token){
            throw new Error('Token is not found');
    }
    const actualToken = token.split(' ')[1];
     const response =   jwt.verify(actualToken,ServerConfig.JWT_SECRET);
     const traveler = await travelerRepository.get(response.id); 
     if(!traveler){
        throw new Error('Traveler is not found');
     }
     return traveler.id;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signup,
    login,
    isAuthenticated   
}
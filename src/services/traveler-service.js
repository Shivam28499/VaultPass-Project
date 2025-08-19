const {TravelerRepository} = require('../repositories');

const travelerRepository = new TravelerRepository();

async function createTraveler(data) {
    try{
        const response = await travelerRepository.create(data);
        return response;
    }catch(error){
        throw error;
    }
}

async function destroyTraveler(data){
    try {
        const response = await travelerRepository.destory(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getTraveler(data){
    try {
        const response = await travelerRepository.get(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getAllTraveler(){
    try {
        const response = await travelerRepository.getAll();
        return response;
    } catch (error) {
        throw error;
    }
}

async function updateTraveler(id,data){
    try {
        const response = await travelerRepository.update(id,data);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createTraveler,
    destroyTraveler,
    getTraveler,
    getAllTraveler,
    updateTraveler
}
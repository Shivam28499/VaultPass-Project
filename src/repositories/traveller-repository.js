const CrudRepository = require('./crud-repository.js');

const {Traveler} = require('../models');

class TravelerRepository extends CrudRepository {
    constructor(){
        super(Traveler);
    }
    async getEmailbyId(email){
        try {
            const response = await Traveler.findOne({
                where: {
                    email: email
                }
            })
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TravelerRepository;
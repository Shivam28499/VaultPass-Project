const CrudRepository = require('./crud-repository');

const {Locker} = require('../models');

class ReleaseRepository extends CrudRepository{
    constructor(){
        super(Locker);
    }
    async lockerFind(lockerNumber){
        try {
            const response = await Locker.findOne({
                where:{
                    lockerNumber:lockerNumber
                }
            })
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReleaseRepository;
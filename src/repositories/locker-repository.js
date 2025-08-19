const CrudRepository = require('./crud-repository');
const {Locker} = require('../models');
const { where } = require('sequelize');

class LockerRepository extends CrudRepository {
    constructor(){
        super(Locker);
    }
    async findByLockerNumber(data){
        try {
            const locker = await Locker.findOne({
                where: {
                    lockerNumber: data
                }
            }) 
            return locker;
        } catch (error) {
            throw error;
        }
    }

async update(id, data) {
  const locker = await Locker.findByPk(id); 

  if (!locker) {
    throw new Error('Locker not found');
  }

  const updatedLocker = await locker.update(data); 
  return updatedLocker;
}

async findByFilter(filter){
    try {
        const response = await Locker.findAll({
            where :filter
    })
        return response;
    } catch (error) {
        throw error;
    }
}

}

module.exports = LockerRepository;
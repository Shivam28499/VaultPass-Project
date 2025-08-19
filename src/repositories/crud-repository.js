const { response } = require("express");
const { StatusCodes } = require("http-status-codes");

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        console.log(data);
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async destory(data){
        try {
            const response = await this.model.destroy({
                where: {
                    id:data
                }
            })
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async get(id){
        console.log(id);
        try {
            const response = await this.model.findByPk(id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(){
        try {
            const response = await this.model.findAll()
            return response;
        } catch (error) {
            throw response;
        }
    }

    async update(id, data){
        console.log(" data = ",id," ",data);
        try {
            const response = await this.model.update(data, {
                where:{
                    id: id
                }
            })
            console.log("response : ",response);
            return response;
        } catch (error) {
            throw error;
        }
    }

}


module.exports = CrudRepository;
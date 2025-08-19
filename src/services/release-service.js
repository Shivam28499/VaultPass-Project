const {ReleaseRepository} = require('../repositories');

const releaseRepository = new ReleaseRepository();

async function releaseLocker(lockerNumber){
    try {
        const locker = await releaseRepository.lockerFind(lockerNumber);
        if(!locker){
            throw new Error("Locker not found");
        }

        if(locker.isAvailable){
            throw new Error("Locker is already available");
        }
            locker.travelerId = null
            locker.documentPath = null
        const response = await releaseRepository.update(locker.id,{
            isAvailable: true,
            travelerId: locker.travelerId,
            documentPath: locker.documentPath
        });
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    releaseLocker
}
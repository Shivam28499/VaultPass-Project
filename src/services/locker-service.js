const {LockerRepository} = require('../repositories');
  const fs = require('fs');
  const path = require('path');
  const archiver = require('archiver')
const lockerRepository = new LockerRepository();

async function create(data) {
    const { lockerNumber, travelerId, location } = data;
    try {
        const existinglocker = await lockerRepository.findByLockerNumber(data.lockerNumber);
        if(existinglocker){
                if(!existinglocker.isAvailable){
                throw new Error('Locker is already booked');
                }

                    const updatedlocker = await lockerRepository.update(existinglocker.id,{
                        isAvailable: false,
                        travelerId: data.travelerId
                    })
                    return updatedlocker;
        }
                const newlocker = await lockerRepository.create({
                        lockerNumber,
                        location,
                        travelerId,
                        isAvailable: false
                    })
                    return newlocker

     }catch(error){
        throw error;
     }
}

async function destroy(data) {
    try {
        const response = await lockerRepository.destroy(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function get(data) {
   try {
     const response = await lockerRepository.get(data);
    return response;
   } catch (error) {
        throw error;
   }
}

async function  getAll(){
    try {
        const response = await lockerRepository.getAll();
        return response;
    } catch (error) {
        throw error;
    }
}

async function update(id,data){
    try {
        const response = await lockerRepository.update(id,data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function updateDocumentPath(lockerId,data) {
    try {
        const response = await lockerRepository.update(lockerId,data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getDocumentByLockerNumber(lockerNumber){
    try {
        const locker = await lockerRepository.findByLockerNumber(lockerNumber);
        if(!locker){
            throw new Error('Locker is not found');
        }

        if(locker.isAvailable){
            throw new Error('please create locker');
        }

        if(!locker.documentPath){
            throw new Error('you do not submitted documents');
        }

        const documents = locker.documentPath.split(',');
        return documents;

    } catch (error) {
        throw error;
    }
}

async function deleteDocumentFromLocker(lockerNumber,filename){
    try {
        const locker = await lockerRepository.findByLockerNumber(lockerNumber);
        if(!locker){
            throw new Error('Locker Not found');
        }

        const allPaths = locker.documentPath?.split(',') || [];
        const matchedPath = allPaths.find(p => p.includes(filename));
        if(!matchedPath){
            throw new Error('File not found in locker');
        }

        const fullpath = path.resolve(matchedPath);
        if(fs.existsSync(fullpath)){
            fs.unlinkSync(fullpath);
        }

        const updatedPaths = allPaths.filter(p => !p.includes(filename));
        locker.documentPath = updatedPaths.join(',');

        const response = await lockerRepository.update(locker.id,{
           documentPath: locker.documentPath
        })

        return updatedPaths;

    } catch (error) {
        throw error;
    }
}

async function findByFilter(filter){
    try {
        const response = await lockerRepository.findByFilter(filter);
        const result = [];
        for(const locker of response){
            const rawPaths = locker.documentPath?.split(',') || [];

            const filenames = rawPaths.map(p=>path.basename(p));
            result.push({
                lockerNumber: locker.lockerNumber,
                location: locker.location,
                isAvailable: locker.isAvailable,
                documentFiles: filenames
            });
        } 
        return result;
    } catch (error) {
         throw error;
    }
}

async function bulkDeleteDocuments(lockerNumber,filenames){
    try {
        const locker = await lockerRepository.findByLockerNumber(lockerNumber);
        if(!locker){
            throw new Error('Locker not found');
        }

        const allPaths = locker.documentPath?.split(',') || [];

        const pathsToDelete = allPaths.filter(p => 
            filenames.some(filename => p.includes(filename))
        )

        for(const filePath of pathsToDelete){
            const fullPath = path.resolve(filePath);
            if(fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        const updatedPaths = allPaths.filter(p => 
            !filenames.some(filename => p.includes(filename))
        );

        locker.documentPath = updatedPaths.join(',');

        await lockerRepository.update(locker.id, {
            documentPath: locker.documentPath
        })
        return updatedPaths;
        } catch (error) {
        throw error;
    }
}

async function downloadAllDocumentsAsZip(lockerNumber,res){
        console.log("lockerNumber:  ",lockerNumber);
   try {
     const locker  = await lockerRepository.findByLockerNumber(lockerNumber);

     if(!locker || !locker.documentPath){
        throw new Error('Locker or documents not found');
     }

     const filePaths = locker.documentPath.split(',').filter(p => fs.existsSync(p));
     console.log(filePaths);

     if(filePaths.length === 0){
        throw new Error('No valid files found to zip');
     }

     const archive = archiver('zip', {zlib: {level: 9}});

     res.attachment(`${lockerNumber}_documents.zip`);
     archive.pipe(res);

     for(const filePath of filePaths){
        const fileName = path.basename(filePath);
        archive.file(filePath, {name: fileName});
     }

     await archive.finalize();

   } catch (error) {
    throw error;
   };

}

module.exports = {
    create,
    destroy,
    get,
    getAll,
    update,
    updateDocumentPath,
    getDocumentByLockerNumber,
    deleteDocumentFromLocker,
    findByFilter,
    bulkDeleteDocuments,
    downloadAllDocumentsAsZip
}
const {LockerService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const { error } = require('console');

async function createLocker(req,res){
    try {
        const response = await LockerService.create({
            lockerNumber: req.body.lockerNumber,
            location: req.body.location,
            travelerId : req.body.travelerId
        })
        return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'request is successfull',
                    data: {response},
                    error: {}
                });
    } catch (error) {
               return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'request is failed',
                    data: {},
                    error: 'locker is already booked'
                }); 
    }
}

async function destroyLocker(req,res) {
    try {
        const response = await LockerService.destroy(req.params.id);
        return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'request is successfull',
                    data: {response},
                    error: {}
                });
    } catch (error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'request is failed',
                    data: {},
                    error: {error}
                }); 
    }
}

async function getLocker(req,res) {
    try {
        const response = await LockerService.get(req.params.id);
        return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'request is successfull',
                    data: {response},
                    error: {}
                });
    } catch (error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'request is failed',
                    data: {},
                    error: {error}
                }); 
    }
}

async function getAllLocker(req,res) {
    try {
        const response = await LockerService.getAll();
        return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'All locker fetched successfully',
                    data: {response},
                    error: {}
                });
    } catch (error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Failed to fetch lockers',
                    data: {},
                    error: {error}
                }); 
    }
}

async function updateLocker(req,res){
    try {
        const response = await LockerService.update(req.params.id,req.body);
        return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'update locker successfull',
                    data: {response},
                    error: {}
                });
    } catch (error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Failed update request',
                    data: {},
                    error: {error}
                }); 
    }
}

async function updateDocumentPath(req,res) {
    console.log("req.file = ", req.files);
    try {
    if (!req.files) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'No file uploaded',
        data: {},
        error: {},
      });
    }
        const filepaths = req.files.map(file => file.path);
        const filePathString = filepaths.join(',');
        const response = await LockerService.updateDocumentPath(req.params.id,{
            documentPath: filePathString
        });
              return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'Document uploaded successfully',
                    data: {response},
                    error: {}
                });
    } catch (error) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Document is not uploaded',
                    data: {},
                    error: {error}
                }); 
    }    
}

async function getDocument(req,res){
    console.log("lockerNumber =  ",req.body);
    try {
        const response = await LockerService.getDocumentByLockerNumber(req.body.lockerNumber);
        console.log("all paths:", response);
        const filename = req.body.filename;
        const matchedPath = response.find(p=>p.includes(filename));
        if(!matchedPath || !fs.existsSync(matchedPath)) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
        return res.download(matchedPath);
    } catch (error) {
        console.log(error);
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Documents do not get',
                    data: {},
                    error: {error}
                }); 
    }
}

async function deleteDocument(req,res){
    try {
        const response = await LockerService.deleteDocumentFromLocker(req.body.lockerNumber,req.body.filename);
            return res
                .status(StatusCodes.ACCEPTED)
                .json({
                    success: true,
                    message: 'Document delete successful',
                    data: {response},
                    error: {}
                });
    } catch (error) {
             return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: 'Document do not deleted',
                    data: {},
                    error: {error}
                });
    }
}

async function findByFilter(req,res){
    const filter = {};
    try {
       if(req.query.isAvailable !==undefined) filter.isAvailable = req.query.isAvailable === 'true' || req.query.isAvailable===true;
       if(req.query.location) filter.location = req.query.location;
       if(req.query.lockerNumber) filter.lockerNumber = req.query.lockerNumber;
       const response = await LockerService.findByFilter(filter);
       return res 
            .json({
                success: true,
                message: 'Filtered data fetched successfully',
                data: {response},
                error: {}
            });
    } catch (error) {
         return res 
            .json({
                success: false,
                message: 'Failed to fetch Filtered data',
                data: {},
                error: {error}
            });
    }
}

async function bulkDeleteDocuments(req,res){
    const {lockerNumber , filenames} = req.body;
    if(!lockerNumber || !Array.isArray(filenames)) {
        return res.json({
            success: false,
            message: 'lockerNumber and filename[] are required',
            data:{},
            error:{}
        });

    }

    try {
        const response = await LockerService.bulkDeleteDocuments(lockerNumber,filenames);
        return res.json({
            success: true,
            message: 'Documents delete successfully',
            data:{response},
            error:{}
        })
    } catch (error) {
        return res.json({
            success: false,
            message: 'Failed to delete documents',
            data:{},
            error:{ error }
        }); 
    }
}

async function zipDownload(req,res){
    try {
         response = await LockerService.downloadAllDocumentsAsZip(req.body.lockerNumber,res);
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'Failed to download ZIP',
            error: {error}
        });
    }
}

module.exports = {
    createLocker,
    destroyLocker,
    getLocker,
    getAllLocker,
    updateLocker,
    updateDocumentPath,
    getDocument,
    deleteDocument,
    findByFilter,
    bulkDeleteDocuments,
    zipDownload
}
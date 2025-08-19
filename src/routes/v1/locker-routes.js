const express = require('express');
const {LockerController} = require('../../controllers');
const {UploadMiddleware} = require('../../middlewares');
const router = express.Router();

router.post('/',LockerController.createLocker);
router.delete('/:id',LockerController.destroyLocker);
router.get('/:id',LockerController.getLocker);
router.get('/',LockerController.getAllLocker);
router.patch('/:id',LockerController.updateLocker);
router.post('/:id/document',UploadMiddleware.uploadmultipleDocuments,LockerController.updateDocumentPath);
router.get('/download/document',LockerController.getDocument);
router.delete('/delete/document',LockerController.deleteDocument);
router.get('/filter/document',LockerController.findByFilter);
router.delete('/bulk-delete/documents',LockerController.bulkDeleteDocuments);
router.post('/download-zip',LockerController.zipDownload);
module.exports = router;
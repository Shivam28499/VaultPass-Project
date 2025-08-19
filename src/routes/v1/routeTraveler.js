const express = require('express');
const {ControllerTraveler} = require('../../controllers');
const {TravelerMiddleware} = require('../../middlewares');
const router = express.Router();
router.post('/',TravelerMiddleware.checkCreateTraveler,ControllerTraveler.createTraveler);

router.delete('/:id',TravelerMiddleware.checkDistroyTraveler,ControllerTraveler.destroyTraveler);

router.get('/:id',TravelerMiddleware.checkgetTraveler,ControllerTraveler.getTraveler);

router.get('/',ControllerTraveler.getAllTraveler);

router.put('/:id',TravelerMiddleware.checkUpdateTraveler,ControllerTraveler.updateTraveler);


module.exports = router;
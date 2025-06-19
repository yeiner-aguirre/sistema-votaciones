const express = require('express');
const router = express.Router();
const voterController = require('../controllers/voter.controller');
const basicAuth = require('../middlewares/basicAuth');

router.post('/', voterController.createVoter);                // público
router.get('/', voterController.getAllVoters);               // público
router.get('/:id', voterController.getVoterById);            // público
router.delete('/:id', basicAuth, voterController.deleteVoter); // ✅ protegido

module.exports = router;


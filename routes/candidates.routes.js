const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidate.controller');
const basicAuth = require('../middlewares/basicAuth');

router.post('/', candidateController.createCandidate);        // público
router.get('/', candidateController.getAllCandidates);       // público
router.get('/:id', candidateController.getCandidateById);    // público
router.delete('/:id', basicAuth, candidateController.deleteCandidate); // ✅ protegido

module.exports = router;


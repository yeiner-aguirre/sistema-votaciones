const express = require('express');
const router = express.Router();
const voteController = require('../controllers/vote.controller');
const basicAuth = require('../middlewares/basicAuth');

router.post('/', basicAuth, voteController.castVote);         // ✅ protegido
router.get('/', voteController.getAllVotes);                  // público
router.get('/statistics', voteController.getStatistics);      // público

module.exports = router;

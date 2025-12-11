const express = require('express');
const router = express.Router();
const skillTreeController = require('../controllers/skillTreeController');

router.get('/available', skillTreeController.getAvailableTrees);
router.get('/:treeId', skillTreeController.getSkillTree);
router.patch('/:treeId/nodes/:nodeId', skillTreeController.updateNodeStatus);

module.exports = router;

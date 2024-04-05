const router = require('express').Router();
const scenarioController = require('../controllers/scenario');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/', authenticateJWT, scenarioController.getOwnScenario);
router.put('/', authenticateJWT, scenarioController.updateScenario);

module.exports = router;

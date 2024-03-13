const router = require('express').Router();
const accountController = require('../controllers/account');

router.post('/', accountController.login);
router.post('/refresh/:token', accountController.refreshLogin);

module.exports = router;
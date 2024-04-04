const router = require('express').Router();
const accountController = require('../controllers/account');

router.post('/', accountController.login);

module.exports = router;
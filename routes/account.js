const router = require('express').Router();
const accountController = require('../controllers/account');
const authenticateJWT = require('../middleware/authenticateJWT');

// match controller options
router.get('/', authenticateJWT, accountController.getOwnAccount);
router.post('/', accountController.createAccount);
// router.put('/:id', accountController.updateAccount);
// router.delete('/:id', accountController.deleteAccount);

module.exports = router;

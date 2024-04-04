// recieve router and connect to controller
const router = require('express').Router();
const accountController = require('../controllers/account');
const authenticateJWT = require('../middleware/authenticateJWT');

// match controller options
router.get('/', authenticateJWT, accountController.getOwnAccount);
// router.get('/:id', accountController.getSingle);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;

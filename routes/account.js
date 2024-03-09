// recieve router and connect to controller
const router = require('express').Router();
const accountController = require('../controllers/account');

// match controller options
router.get('/', accountController.getAll);
router.get('/:id', accountController.getSingle);
router.post('/', accountController.createAccount);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;

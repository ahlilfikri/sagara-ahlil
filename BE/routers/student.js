const express = require('express');
const router = express.Router();
const Controller = require('../controllers/student');
const authenticateToken = require('../middleware/authentication'); // Assuming you save it in middleware folder

router.get('/', authenticateToken, Controller.get);
router.get('/filter/', authenticateToken, Controller.getFilter);
router.get('/:_id', authenticateToken, Controller.getOne);
router.post('/', authenticateToken,Controller.post);
router.put('/:_id', authenticateToken, Controller.put);
router.delete('/:_id', authenticateToken, Controller.delete);

module.exports = router;

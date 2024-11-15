const express = require('express');
const router = express.Router();
const { getAllCart, getCartById, postCart, updateCart, deleteCart } = require('../controllers/cartControllers.js');


router.get('/', getAllCart);

router.get('/:cartId', getCartById);

router.post('/', postCart);

router.patch('/:cartId', updateCart);  // Fixed this line

router.delete('/:cartId', deleteCart);



module.exports = router;
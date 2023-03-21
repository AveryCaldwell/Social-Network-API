const router = require('express').Router();
const thoughtRoutes = require('./courseRoutes');
const userRoutes = require('./studentRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;

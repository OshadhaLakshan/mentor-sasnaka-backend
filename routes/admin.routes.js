const express = require('express');
const { approveMentor, createGroup, loginAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/login', loginAdmin); // Admin Login Route
router.post('/approve-mentor/:id', approveMentor);
router.post('/create-group', createGroup);

module.exports = router;

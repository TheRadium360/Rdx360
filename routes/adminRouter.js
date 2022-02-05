const express = require("express");
const { login, signUp } = require("../controllers/adminController");
const router = express.Router();




router.post('/login', login) //admin login
router.post('/signUp', signUp) //admin sign up


module.exports = router;
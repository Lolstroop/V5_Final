const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
require('dotenv/config');

router.get('/login', (req, res)=> res.render('login'));

//Register Page
router.get('/register', (req, res)=> res.render('register'));

router.post('/register', async (req,res) => {

    // Data Validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        nome: req.body.nome,
        email: req.body.email,
        password: hashedPassword,
        telefone: req.body.telefone,
        date: req.body.date
    });
    try{
        const savedUser = await user.save();
        res.send({ user: user._id });
    }catch(err){
        res.status(400).send(err);
    }
    
});

//Login
router.post('/login', async (req,res) => {
    
    //Data Validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if the email already exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is wrong');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
});

module.exports = router;
const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verifyToken');
const Favoritos = require('../models/Favoritos');

router.get('/', verify ,(req,res) => {
    res.send(req.user);
});

router.post('/', verify, async (req,res) => {
    console.log("Sending token...")
    res.send(req.user);
    const favoritos = new Favoritos({
        filme: req.body.filme,
        realizador: req.body.realizador,
        ator: req.body.ator,
        email: req.body.email
    });
    try{
        const savedFav = await favoritos.save();    
        res.json(savedFav);
        console.log("Done!!");
    }catch(err){
        res.json({message: err});
    }
});

router.patch('/:favoritosId', async (req,res) => {
    try {
        const updateFav = await Favoritos.updateOne(
            {_id: req.params.favoritosId},
            {$set: {
                filme: req.body.filme,
                realizador: req.body.realizador,
                ator: req.body.ator,
            }}
        );
        res.json(updateFav);
    } catch(err){
        res.json({message: err});
    }
});

module.exports = router;
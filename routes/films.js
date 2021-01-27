const express = require('express');
const router = express.Router();
const Film = require('../models/Film');

// GET ALL FILMS
router.get('/', async (req, res) => {
    console.log("We are on films GET");
    try{
        const films = await Film.find();
        res.json(films);
    }catch(err){
        res.json({message:err});
    }   
});

//GET SPECIFIC FILM
router.get('/:filmId', async (req, res) => {
    try{
        const film = await Film.findById(req.params.filmId);
        res.json(film);
    }catch(err){
        res.json({message: err});
    }
});

// POST FILM
router.post('/', async (req,res) => {
    console.log("POST FILM");
    const film = new Film({
        nome: req.body.nome,
        descricao: req.body.descricao
    });
    try{
        const savedFilm = await film.save();
        res.json(savedFilm);
    }catch(err){
        res.json({message: err});
    }

    /*res.send('We are on films POST');*/
});

//DELETE FILM
router.delete('/:filmId', async (req,res) => {
    try{
        const removedFilm = await Film.remove({_id: req.params.filmId});
        res.json(removedFilm);
    }catch(err){
        res.json({message: err});   
    }
});

//UPDATE STUDIO
router.patch('/:filmId', async (req,res) => {
    try{
        const updateFilm = await Film.updateOne(
            {_id: req.params.filmId},
            {$set: {nome: req.body.nome} }
        );
        res.json(updateFilm);
    }catch(err){
        res.json({message: err});
    }
});


module.exports = router;
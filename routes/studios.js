const express = require('express');
const router = express.Router();
const Studio = require('../models/Studio');

//GET ALL STUDIOS
router.get('/', async (req, res) => {
    console.log("We are on studios GET");
    try{
        const studios = await Studio.find();
        res.json(studios);
    }catch(err){
        res.json({message:err});
    }   
});

//GET SPECIFIC STUDIO
router.get('/:studioId', async (req, res) => {
    try{
        const studio = await Studio.findById(req.params.studioId);
        res.json(studio);
    }catch(err){
        res.json({message: err});
    }
    
});

// POST STUDIO
router.post('/', async (req,res) => {
    console.log("We are on studios POST");
    const studio = new Studio({
        nome: req.body.nome,
        morada: req.body.morada,
        descricao: req.body.descricao
    });
    try{
        const savedStudio = await studio.save();
        res.json(savedStudio);
    }catch(err){
        res.json({message: err});
    }

    /*res.send('We are on studios POST');*/
});  

//DELETE STUDIO
router.delete('/:studioId', async (req,res) => {
    try{
        const removedStudio = await Studio.remove({_id: req.params.studioId});
        res.json(removedStudio);
    }catch(err){
        res.json({message: err});   
    }
});

//UPDATE STUDIO
router.patch('/:studioId', async (req,res) => {
    try{
        const updateStudio = await Studio.updateOne(
            {_id: req.params.studioId},
            {$set: {nome: req.body.nome} }
        );
        res.json(updateStudio);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;

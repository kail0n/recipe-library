const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipes');

// recipe index route
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.all;
        res.json(recipes);
    } catch(err) {
        res.status(500).json({err});
    };
});

// recipe show route
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(parseInt(req.params.id));
        res.json(recipe);
    } catch(err) {
        res.status(404).json({err});
    };
});

// create recipe route
router.post('/', async (req, res) => {
    try {
        const recipe = await Recipe.create(req.body.name, req.body.author, req.body.serves);
        res.json(recipe);
    } catch(err) {
        res.status(404).json({err});
    };
});

// destroy recipe route
router.delete('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(parseInt(req.params.id));
        await recipe.destroy();
        res.status(204).json('Recipe deleted');
    } catch(err) {
        res.status(500).json({err});
    };
});

module.exports = router;
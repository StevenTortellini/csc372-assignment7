"use strict";
const model = require('../models/JokeModel');


async function fetchJokes(req, res) {
    try {
    const category = req.params.category; 
    const jokes = await model.getJokesByCat(category);
    res.json(jokes);
  } catch (error) {
    console.error('Error fetching jokes by category:', error);
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }

}


async function fetchAllCategories(req, res) {
    try {
        const categories = await model.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function fetchRandomJoke(req, res) {
    try {
        const joke = await model.getRandomJoke();
        res.json(joke);
    } catch (err) {
        console.error('Error fetching random joke:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function createJoke(req, res) {
    try {
        const { joke_type, set_up, delivery } = req.body;

        if (!joke_type || !set_up || !delivery) {
            return res.status(400).json({ error: 'Missing required fields: joke_type, set_up, delivery' });
        }

        const newJoke = await model.addJoke(joke_type, set_up, delivery);
        res.status(201).json(newJoke);
    } catch (err) {
        console.error('Error creating joke:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    fetchJokes,
    fetchAllCategories,
    fetchRandomJoke,
    createJoke
};
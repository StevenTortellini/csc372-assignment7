"use strict";
const pool = require('./Db');
async function getAllJokes() {
    const queryText = "SELECT * FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getJokesByCat(category) {
    const queryText = "SELECT * FROM jokes WHERE joke_type = $1;";
    const result = await pool.query(queryText, [category]);
    return result.rows;
}

async function getAllCategories() {
    const queryText = "SELECT DISTINCT joke_type FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getRandomJoke() {
    
    const queryText1 = "SELECT COUNT(*) FROM jokes;";
    const response1 = await pool.query(queryText1);
    const numOfEntries= parseInt(response1.rows[0].count);
    const randomIndex =  Math.floor(Math.random() * numOfEntries) + 1; 
    
    
    
    const queryText2 = "Select * FROM jokes WHERE id = $1";
    const result  = await pool.query(queryText2,[randomIndex]);
    return result.rows
}

async function addJoke(joke_type,set_up,delivery) {
    const queryText = `
            INSERT INTO jokes (joke_type, set_up, delivery)
            VALUES ($1, $2, $3)
            RETURNING *;`;
        const values = [joke_type, set_up, delivery];
        const result = await pool.query(queryText, values);
        return result.rows[0];
    
}
module.exports = {
    getAllJokes,
    getAllCategories,
    getRandomJoke,
    addJoke,
    getJokesByCat
};



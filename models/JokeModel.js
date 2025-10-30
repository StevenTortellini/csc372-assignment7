"use strict";
const pool = require('/models/db');
async function getAllJokes() {
    const queryText = "SELECT * FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getAllCategories() {
    const queryText = "SELECT DISTINCT categories FROM jokes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getRandomJoke() {
    
    const queryText1 = "SELECT COUNT(*) FROM jokes;";
    const response1 = await pool.query(queryText1);
    numOfEntries= parseInt(response1.rows[0].count);
    randomIndex = 1;
    do{
        randomIndex =  Math.floor(Math.random() * numOfEntries) + 1; 
    }
    while(randomIndex == 0) // in the case that 0 is assigned we try again
    
    const queryText2 = "Select * FROM jokes WHERE id = $1";
    const result  = await pool.query(queryText2,randomIndex);
}



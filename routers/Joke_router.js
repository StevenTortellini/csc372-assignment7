"use strict";

const express = require("express");
const router = express.Router();
const { 
  fetchAllCategories, 
  fetchJokes, 
  fetchRandomJoke, 
  createJoke 
} = require("../controllers/JokeController");

router.get("/categories", fetchAllCategories);
router.get("/category/:category", fetchJokes);
router.get("/random", fetchRandomJoke);
router.post("/joke/add", createJoke);

module.exports = router;















/*app.get("/jokebook", async function (req, res) { 

    let type = req.params.type; 
    let price = req.query.price; if (type) 
    { let values = [type];
    let queryText = "SELECT * FROM products where type= $1 ";
    if (price) { queryText += " AND price <= $2"; values.push(price); }
        try { const result = await pool.query(queryText, values); 
                res.json(result.rows); } 
        catch (err) { console.error(err); res.status(500).send("Server error"); 
                return; } } 
    else { res.status(400).send("Missing required type param!");}});*/
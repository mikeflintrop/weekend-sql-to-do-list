const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
//
// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "id";';
    pool.query(queryText)
        .then((result) =>{
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('AY! error in GET query', error);
            res.sendStatus(500);
        })
});

// POST
router.post('/', (req, res) => {
    const newKoala = req.body;
    const queryText = `
        INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
        VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
    .then((result)=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('AY! error posting to db', error);
        res.sendStatus(500)
    })
});

// PUT
router.put('/:id', (req, res) => {
    let koalaId = req.params.id;
    console.log(koalaId);
    let queryText = 'UPDATE "koalas" SET "ready_to_transfer" = TRUE WHERE "id" = $1;';

    pool.query(queryText, [koalaId])
    .then((dbResponse)=>{
        res.send(dbResponse.rows)
    })
    .catch((error)=>{
        console.log(`AY! error updating with query ${queryText}: ${error}`);
        res.sendStatus(500);
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    let reqId = req.params.id
    console.log(`A delete request has been sent for ID ${reqId}`);
    let queryText = 'DELETE FROM "koalas" WHERE "id" = $1;';
    pool.query(queryText, [reqId])
        .then(() =>{
            console.log('koala deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`AY! error deleting with query ${queryText}: ${error}`);
            res.sendStatus(500); // a good server always responds
        })
});

module.exports = router;
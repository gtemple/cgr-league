const express = require('express');
const router = express.Router();
const users = require('../db/queries/seasons');


router.get('/', (req, res) => {
  users.getAllSeasons().then(data => {
    console.log(data);
    res.json({seasons: data});
  })
});

router.get('/:id', (req, res) => {
  const seasonId = req.params.id
  users.getSeasonResults(seasonId).then(data => {
    console.log(data);
    res.json({seasonResults: data});
  })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const users = require('../db/queries/race_results');


/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllRaceResults().then(data => {
    console.log(data);
    res.json({raceResults: data});
  })
});

module.exports = router;
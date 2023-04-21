const express = require('express');
const router = express.Router();
const users = require('../db/queries/teams');


/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllTeams().then(data => {
    console.log(data);
    res.json({teams: data});
  })
});


module.exports = router;
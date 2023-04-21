const express = require('express');
const router = express.Router();
const users = require('../db/queries/tracks');


/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllTracks().then(data => {
    console.log(data);
    res.json({tracks: data});
  })
});


module.exports = router;
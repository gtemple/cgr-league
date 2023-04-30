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

router.get('/:id', (req, res) => {
  const track_id = req.params.id
  users.getTrackById(track_id).then(data => {
    console.log(data)
    res.json({tracks: data});
  })
});


module.exports = router;
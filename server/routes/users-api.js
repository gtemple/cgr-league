const express = require('express');
const router = express.Router();
const users = require('../db/queries/users');


/* GET users listing. */
router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});

router.get('/:id', (req, res) => {
  const user_id = req.params.id
  users.getUserById(user_id).then(data => {
    res.json({user: data});
  })
});

router.get('/bio/:id', (req, res) => {
  const user_id = req.params.id
  users.getUserBioById(user_id).then(data => {
    console.log(data);
    res.json({user: data});
  })
});



module.exports = router;
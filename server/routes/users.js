const router = require('express').Router();

const users = ['Bob', 'Alex', 'Will', 'Tristan'];

router.get('/', (req, res) => {
    console.log('before')
    res.json(users);
    console.log('after')
});


module.exports = router;
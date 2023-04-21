let express = require('express');
let cors = require('cors')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let usersRouter = require('./routes/users-api');
let tracksRouter = require('./routes/tracks-api');
let raceResultsRouter = require('./routes/raceResults-api');
let teamsRouter = require('./routes/teams-api');



let app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);
app.use('/api/tracks', tracksRouter);
app.use('/api/race-results', raceResultsRouter);
app.use('/api/teams', teamsRouter);




module.exports = app;

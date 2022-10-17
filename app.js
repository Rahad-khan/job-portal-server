const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./Routes/v1/users.route');
const jobsRoute = require('./Routes/v1/jobs.route');
const managerRoute = require('./Routes/v1/manager.route');

// * Middleware

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Welcome to job portal")
});

app.use('/api/v1/user', userRoute);

app.use('/api/v1/jobs', jobsRoute);
app.use('/api/v1/manager/jobs', managerRoute);

app.use('*', (req, res) => {
    res.send("Ups This is the wrong route")
});

module.exports = app;

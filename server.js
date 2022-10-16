const colors = require('colors');
const app = require('./app');
const port = process.env.PORT || 5000;
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    dbName: "JobsDB"
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.'.red.bold)
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



app.listen(port, () => {
    console.log(`Port is running at ${port}`.yellow.bold)
})

const express  = require('express');
const mongoose = require('mongoose');
const router   = require('./lib/router');
const cors     = require('cors');
const config   = require('./config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = async () => {
    try {
        await mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        app.listen(config.port, () => {
            console.log(`Server has started on port ${config.port}`);
        })
    } catch (err) {
        console.log('Something went wrong: ', err);
    }
}

start();
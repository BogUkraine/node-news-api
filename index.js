const express = require('express');

const app = express();
const PORT = process.env.PORT || 8000;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`);
        })
    } catch (err) {
        console.log('Something went wrong: ', err);
    }
}

start();
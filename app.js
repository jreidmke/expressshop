const express = require('express');
const app = express();
const router = require('./router');

//allow req.body to recognize josn
app.use(express.json()); 

//set up router
app.use('/items', router);


//generic err handler
app.use((err, req, res, next) => {
    let status = err.status || 500;

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
})

module.exports = app
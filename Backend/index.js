const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const mySqlPool = require('./config/db');
const contentRouter = require('./routes/content');

const server = express();

server.use(cors());
server.use(morgan('combined'));
server.use(express.json());
server.use('/api',contentRouter);
server.get('/', (req, res) => {
    res.send("API connected successfully");
});
mySqlPool.query('SELECT 1').then(() =>{
    console.log("MySQL DB Connected");
    server.listen(8000, () => {
        console.log("server Started ");
    });
}).catch((error)=>{
    console.log(error);
});

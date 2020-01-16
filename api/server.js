const express = require('express');

const postsRouter = require('../posts/posts-router.js');

const server = express();
server.use(express.json());

const cors= require('cors');
server.use(cors());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


server.use('/api/posts', postsRouter);


module.exports = server;
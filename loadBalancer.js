const express = require('express');
const axios = require('axios')
const httpProxy = require('http-proxy')
const app = express();
const PORT = 8080;

const servers = [
    { url: 'http://localhost:3000', alive: true },
    { url: 'http://localhost:4000', alive: true },
    { url: 'http://localhost:5000', alive: true }
]

const checkServerHealth = async (server) => {
    try {
      await axios.get(`${server.url}/health`);
      server.alive = true;
    } catch (error) {
      server.alive = false;
    }
}
const healthCheck = () => {
    servers.forEach( server => checkServerHealth(server))
}

setInterval(healthCheck, 5000)

let currentServer = 0, server
const proxy = httpProxy.createProxyServer()

app.use((req, res) => {
    server = servers[currentServer]
    currentServer === servers.length -1? currentServer = 0 : ++currentServer
    
    if(server.alive){
        proxy.web(req, res, { target: server.url }, (e) => {
            if(e){
                res.status(500).send('Server error')
                console.log(e);
            }
        })
        return;
    }
})

app.listen(PORT, () => {
    console.log(`Load balancer running on port ${PORT}`)
})
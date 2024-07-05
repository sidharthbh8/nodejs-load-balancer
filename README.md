# Node.js Load Balancer

Simulating a Node.js-based load balancer that distributes incoming HTTP requests to multiple servers using a round-robin algorithm. It also includes health checks to ensure that only healthy servers receive traffic. Also added Nginx method can be tested independently without manual implementation 

## Features

- Round-robin request distribution
- Periodic health checks for backend servers
- Handles server failures gracefully
- Optional Nginx server proxy method
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const host = '10.0.0.247';

const server = http.createServer((req, res) => {
    console.log(`Запрошенный адрес: ${req.url}`);

    res.setHeader('Content-Type', 'text/html');

    const createPath = (page) => path.resolve(__dirname, `${page}.html`);

    let basePath = '';

    switch(req.url) {
        default:
            basePath = createPath('index');
            res.statusCode = 200;
            break;
    }
    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end();
        }
        else {
            res.write(data);
            res.end();
        }
    })

});

server.listen(PORT, host, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});
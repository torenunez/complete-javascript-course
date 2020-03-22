const fs = require('fs');
const http = require('http');
const url = require('url');


const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

//console.log(__dirname);
//console.log(laptopData);

const server = http.createServer((req, res) => {

    //console.log(req);
    //const query = url.parse(req.url, true);
    //console.log(query);
    const pathName = url.parse(req.url, true).pathname;
    //console.log(pathName);
    //const query = url.parse(req.url, true).query; parses multiple objects
    const id = url.parse(req.url, true).query.id;

    if (pathName === '/products' || pathName === '/'){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('This is the PRODUCTS page!');
    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`This is the LAPTOP page for laptop ${id}!`);
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('URL not found on the server!!!');
    }

    //console.log('Someone did access the server!');
    //res.writeHead(404, {'Content-type': 'text/html'});
    //res.writeHead(200, {'Content-type': 'text/html'});
    //res.end('This is the response!');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening to requests now.');
});
const fs = require('fs');
const http = require('http');
const url = require('url');


const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // this is synchronous
const laptopData = JSON.parse(json);

//console.log(__dirname);
//console.log(laptopData);

const server = http.createServer((req, res) => {

    //console.log(req);
    //const query = url.parse(req.url, true);
    //console.log(query);
    const pathName = url.parse(req.url, true).pathname;
    console.log(pathName);
    //const query = url.parse(req.url, true).query; parses multiple objects
    const id = url.parse(req.url, true).query.id;

    if (pathName === '/products' || pathName === '/'){
        res.writeHead(200, {'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) =>{
            let overviewOutput = data;

            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) =>{
                
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                //console.log(cardsOutput);
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

                res.end(overviewOutput);
            });
        });  

    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        //res.end(`This is the LAPTOP page for laptop ${id}!`);
        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) =>{
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        }); //this is asynchronous
    } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) =>{
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        }); //this is asynchronous

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

function replaceTemplate(originalHtml,laptop){
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
};
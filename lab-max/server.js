'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

const cowsay = require('cowsay');

const parseBody = require('./lib/parse-body');
const PORT = process.env.PORT || 3000;

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.method === 'GET' && req.url.pathname === '/'){
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write('hello world\n');
    res.end();
  }

  if (req.method === 'GET' && req.url.pathname === '/cowsay'){
    if (req.url.query.text){
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: req.url.query.text, f: req.url.query.f}));
      res.end();
    }
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write(cowsay.say({text: 'bad request\n try: localhost:3000/cowsay?text=howdy'}));
    res.end();
  }

  if(req.method === 'POST' && req.url.pathname === '/cowsay'){
    parseBody(req, function(err){
      if (err) return console.log('There is an error', err);
      if (req.body.text) {
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.write(cowsay.say({text: req.body.text, f: req.url.query.f}));
        res.end();
      }
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    });
  }
});

server.listen(PORT, function(){
  console.log('server is running dude *<:>*', 'port', PORT);
});

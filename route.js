const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {
    AccessControlConfig(res);
    if (!Prefligth(req, res)) {
        var Operation = require('./controller.js');
        const reqUrl = url.parse(req.url, true);
        let symbol = reqUrl.query['op'];

        if (reqUrl.pathname.toLowerCase() !== "/api/maths") {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.invalidUrl(req, res);
        }
        else if (symbol == undefined) {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.OpUndefinend(req, res);
        }
        else if (symbol == ' ' || symbol == '+' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.Addition(req, res);
        } else if (symbol == '-' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.Substraction(req, res);

        } else if (symbol == '*' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.Mutiplication(req, res);

        } else if (symbol == '/' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.Division(req, res);

        } else if (symbol == '%' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.Modulo(req, res);

        } else if (symbol == '!' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.Factor(req, res);

        } else if (symbol == 'p' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.IsPrime(req, res);

        } else if (symbol == 'np' && req.method === 'GET') {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.nPrime(req, res);

        } else {
            console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
            Operation.invalidOperation(req, res);
        }
    }
})


function AccessControlConfig(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
}
function Prefligth(req, res) {
    if (req.method === 'OPTIONS') {
        console.log('preflight CORS verifications');
        res.end();
        // request handled
        return true;
    }
    // request not handled
    return false;
}
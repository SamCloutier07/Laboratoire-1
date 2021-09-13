
const url = require('url');
let error = "";
let value;
let hasError = false;

function ErrorCheck(x, y, params) {
    error = "";
    if (Object.keys(params).length >= 4) { error = "Too many parameters"; return true; }
    else if (!('x' in params)) { error = "'x' parameter is missing"; return true; }
    else if (!('y' in params)) { error = "'y' parameter is missing"; return true; }
    else if (isNaN(x) && isNaN(y)) { error = "x and y are not numbers"; return true; }
    else if (isNaN(x)) { error = "x is not a number"; return true; }
    else if (isNaN(y)) { error = "y is not a number"; return true; }
}

function ErrorCheckN(n, params) {
    error = "";
    if (Object.keys(params).length >= 3) { error = "Too many parameters"; return true; }
    else if (!('n' in params)) { error = "'n' parameter is missing"; return true; }
    else if (isNaN(n)) { error = "n is not a number"; return true; }
    else if (!Number.isInteger(n)) { error = "y is not a integer (Number without decimals)"; return true; }
}

// ----- GET -----
exports.Addition = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const x = Number(reqParams['x']);
    const y = Number(reqParams['y']);

    hasError = ErrorCheck(x, y, reqParams);

    if (!hasError) { reqParams.op = "+"; reqParams.value = x + y; }

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}

exports.Substraction = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const x = Number(reqParams['x']);
    const y = Number(reqParams['y']);

    hasError = ErrorCheck(x, y, reqParams);

    if (!hasError) reqParams.value = x - y;

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}

exports.Mutiplication = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const x = Number(reqParams['x']);
    const y = Number(reqParams['y']);

    hasError = ErrorCheck(x, y, reqParams);

    if (!hasError) reqParams.value = x * y;

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}

exports.Division = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const x = Number(reqParams['x']);
    const y = Number(reqParams['y']);

    hasError = ErrorCheck(x, y, reqParams);
    CheckDivision(x, y);
    if (!hasError) reqParams.value = value;

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}

exports.Modulo = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const x = Number(reqParams['x']);
    const y = Number(reqParams['y']);

    hasError = ErrorCheck(x, y, reqParams);
    CheckModulo(x, y);
    if (!hasError) reqParams.value = value;

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}

exports.Factor = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const n = Number(reqParams['n']);

    hasError = ErrorCheckN(n, reqParams);

    if (!hasError) reqParams.value = Factoriel(n);

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}

exports.IsPrime = function (req, res) {
    const reqParams = url.parse(req.url, true).query;
    const n = Number(reqParams['n']);

    hasError = ErrorCheckN(n, reqParams);

    if (!hasError) reqParams.value = isPrime(n);

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}
exports.nPrime = function (req, res) {
    const reqParams = url.parse(req.url, true).query;

    const n = Number(reqParams['n']);

    hasError = ErrorCheckN(n, reqParams);

    if (!hasError) reqParams.value = FindNPrime(n);

    else reqParams.error = error

    hasError == false;

    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}
exports.OpUndefinend = function (req, res) {
    const reqParams = url.parse(req.url, true).query;
    reqParams.error = "'op' parameter is missing";
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}
// ----- INVALIDURL -----
exports.invalidUrl = function (req, res) {
    var response = [
        {
            "message": "Endpoint incorrect. Les options possibles sont "
        },
        availableEndpoints
    ]
    res.statusCode = 404;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
}
exports.invalidOperation = function (req, res) {
    const reqParams = url.parse(req.url, true).query;
    reqParams.error = "Unknown Operation";
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(reqParams));
}
// A faire --------------------------------------------------------------------
const availableEndpoints = [
    {
        method: "GET",
        Addition: "/math?op=+&x=1&y=1"
    },
    {
        method: "GET",
        Substraction: "/math?op=-&x=1&y=1"
    },
    {
        method: "GET",
        Multiplication: "/math?op=*&x=1&y=1"
    },
    {
        method: "GET",
        Division: "/math?op=/&x=1&y=1"
    },
    {
        method: "GET",
        Modulo: "/math?op=%&x=1&y=1"
    },
    {
        method: "GET",
        Factor: "/math?op=!&n=1"
    },
    {
        method: "GET",
        IsPrime: "/math?op=p&n=1"
    },
    {
        method: "GET",
        NPrime: "/math?op=np&n=1"
    },
]

function Factoriel(n) {
    return n > 1 ? n * Factoriel(n - 1) : 1;
}

function isPrime(n) {
    if (n <= 1) return false;
    if (n % 2 == 0 && n > 2) return false;
    const s = Math.sqrt(n);
    for (let i = 3; i <= s; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

function FindNPrime(n) {
    let primeCounter = 0;
    for (let i = 1; primeCounter < n; i++) {
        if (isPrime(i)) primeCounter++;
        if (primeCounter == n) return i;
    }
}

function CheckDivision(x, y) {
    if (x == 0 && y == 0) value = "NaN";
    else if (y == 0) value = "Infinity";
    else value = x / y;
}

function CheckModulo(x, y) {
    if (x == 0 && y == 0) value = "NaN";
    else if (y == 0) value = "NaN";
    else value = x % y;
}

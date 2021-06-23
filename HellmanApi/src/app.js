
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();
const router = express.Router();

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Carrega os Models
//const Project = require('./domain/aggregates/project/product');


// Carrega as Rotas
const indexRoute = require('./application/routes/index-route');
const grupoEtapaRoute = require('./application/routes/subroutes/grupo-etapa-route');
const projectRoute = require('./application/routes/subroutes/project-route');
const programaRoute = require('./application/routes/subroutes/programa-route');
const statusRoute = require('./application/routes/subroutes/status-route');


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/grupos', grupoEtapaRoute);
app.use('/projects', projectRoute);
app.use('/programas', programaRoute);
app.use('/status', statusRoute);

module.exports = app;
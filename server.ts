import http from 'http';
import express from 'express';
import config from './config/default';
import logging from './logger';
import apiRoute from './api/api.route';

const NAMESPACE = 'Server'
const port = config.port;
const host = config.host;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// logging request 
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], url - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], url - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// Routes
app.use('/api', apiRoute);

app.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    logging.info(NAMESPACE, `Server listing at http://${host}:${port}`);
});


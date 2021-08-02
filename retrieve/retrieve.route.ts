import express from 'express';
import retrieveController from './retrieve.controller';

const router = express.Router();

router.get('/get', retrieveController.retriveData);

export = router;
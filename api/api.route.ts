import express from 'express';
import apiController from './api.controller';

const router = express.Router();

router.post('/post/store', apiController.storeData);
router.get('/get/retrive', apiController.retriveData);

export = router;
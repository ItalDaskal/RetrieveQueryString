import express from 'express';
import storeController from './store.controller';

const router = express.Router();

router.post('/post', storeController.storeData);

export = router;
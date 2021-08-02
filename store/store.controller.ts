import { NextFunction, Request, Response } from "express";
import logging from '../logger';
import Entity from './store.interface';
import storeService from './store.service';

const NAMESPACE = 'Store Controller'

//post
const storeData = async (req:Request, res:Response, next:NextFunction) => {
    try{
        logging.info(NAMESPACE, 'api controller post route call')
        if(!req.body){
            return res.status(400).json({error: `data is not valid`});
        }

        var entity : Entity[] = req.body;
        const result = storeService.storeData(entity);

        return res.status(200).json(result);
    }catch(err){
        logging.error(NAMESPACE, `api controller error post route call - ${err}`)
        return res.status(500).json(err);
    }
};

export default {storeData};

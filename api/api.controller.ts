import { NextFunction, Request, Response } from "express";
import logging from '../logger';
import {QueryObj, Entity} from "./api.interface";
import apiService from "./api.service";
import url from 'url';
import urlParse from 'url-parse';

const NAMESPACE = 'api Controller'

//post
const storeData = async (req:Request, res:Response, next:NextFunction) => {
    try{
        logging.info(NAMESPACE, 'api controller post route call')
        if(!req.body){
            return res.status(400).json({error: `data is not valid`});
        }

        var entity : Entity[] = req.body;
        const result = await apiService.storeData(entity);

        return res.status(200).json(result);
    }catch(err){
        logging.error(NAMESPACE, `api controller error post route call - ${err}`)
        return res.status(500).json(err);
    }
};

//get
const retriveData = async (req:Request, res:Response, next:NextFunction) => {
    try{
        // const result : any[] = [];
        logging.info(NAMESPACE, 'api controller get route call')
        const urlQuery: { [key: string]: string | undefined} = urlParse(req.url, true).query;
        
        if(urlQuery["query"]){
            return res.status(200).json(apiService.initQuery(urlQuery["query"]));
        }

        return res.status(500).json('bad query');
    }catch(err){
        logging.error(NAMESPACE, `api controller error post route call - ${err}`)
        return res.status(500).json(err);
    }
};

export default {storeData, retriveData};
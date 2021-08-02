import { NextFunction, Request, Response } from "express";
import logging from '../logger';
import retrieveService from "./retrieve.service";
import urlParse from 'url-parse';

const NAMESPACE = 'retrieve Controller'

//get
const retriveData = async (req:Request, res:Response, next:NextFunction) => {
    try{
        // const result : any[] = [];
        logging.info(NAMESPACE, 'api controller get route call')
        const urlQuery: { [key: string]: string | undefined} = urlParse(req.url, true).query;
        
        if(urlQuery["query"]){
            return res.status(200).json(retrieveService.initQuery(urlQuery["query"]));
        }

        return res.status(500).json('bad query');
    }catch(err){
        logging.error(NAMESPACE, `api controller error get route call - ${err}`)
        return res.status(500).json(err);
    }
};

export default {retriveData};
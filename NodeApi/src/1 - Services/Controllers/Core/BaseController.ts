import { Response, Request } from 'express';
import { injectable } from "inversify";

@injectable()
export class BaseController
{
    public constructor()
    {
      
    }

    public async SendOk (res: Response, data: any, message: string ): Promise<any>
    {
        
        const response  =  {
            statusCode: 200,
            message: message,
            data: data
        };

       return res.json(response);
    }

    public async SendNotFound (res: Response, data: any, message: string ): Promise<any>
    {
        
        const response  =  {
            statusCode: 400,
            message: message,
            data: null
        };

       return res.json(response);
    }

    public async SendError (res: Response, ex: Error ): Promise<any>
    {
        const response  =  {
            statusCode: 500,
            message: ex.message,
            data:  ex.message,
        };
        
        return  res.json(response);
    }

    public async SendErr (res: Response, message: String ): Promise<any>
    {
        const response  =  {
            statusCode: 500,
            message: message,
            data:  message,
        };
        
        return  res.json(response);
    }


    public IsValid(req: Request): boolean
    {
        let valid: boolean = true;
        if(!req.body || Object.keys(req.body).length == 0) valid = false;
        return valid;
    }
}


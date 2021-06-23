import 'reflect-metadata';
import { inject } from "inversify";
import * as express from "express";
import { interfaces,response, controller, httpGet, httpPost, request, requestParam } from "inversify-express-utils";
import { ApiPath,ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost } from "swagger-express-typescript";
import {BaseController} from '@controllers/Core/BaseController';
import {StatusModel} from '@models/StatusModel';
import {IStatusAppService} from '@iapps/IStatusAppService';

@ApiPath({
    path: "/status",
    name: "Status",
    security: { basicAuth: [] }
})
@controller("/status")
export class StatusController extends BaseController implements interfaces.Controller
{

    public constructor(
        @inject("StatusAppService") private  _statusAppService: IStatusAppService
    ) {
        super();
    }

    @ApiOperationGet({
        path: "/GetStatus",
        description: "Get status list",
        summary: "Get status list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY}
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet("/GetStatus")
    public async GetStatus(@response() res: express.Response)
     {
        try 
        {
            let result = await this._statusAppService.GetAll();
            return this.SendOk(res, result, "");
        } 
        catch (ex)
        {
            return this.SendError(res, ex);
        }
    }

    @ApiOperationGet({
        path: "/GetStatusById/{id}",
        description: "Get Status By Id",
        summary: "Get Status By Id",
        parameters : {
            path: {
                id: {
                    description : "Status id",
                    type : SwaggerDefinitionConstant.Parameter.Type.NUMBER,
                    required : true
                }
            },
        },
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT}
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpGet('/GetStatusById/:id')
    public async GetStatusById(  @requestParam("id") id : number,
       @response() res: express.Response) 
    {

        try
        {
            let result = await this._statusAppService.GetById(id);
            return this.SendOk(res, result, "");
         } 
        catch (ex)
        {
            return this.SendError(res, ex);
        }
    }

    @ApiOperationPost({
        path: "/InsertStatus",
        description: "Insert status",
        summary: "Insert status",
        parameters: {
            body: { description: "", required: true, model: "StatusModel" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/InsertStatus")
    public async InsertStatus(@request() req: express.Request,@response() res: express.Response) 
    {
        try 
        {
            if(!this.IsValid(req)) return this.SendNotFound(res, null, "Dados informados inválidos");
            let statusModel = req.body as StatusModel;
            await this._statusAppService.InsertStatus(statusModel);
            return this.SendOk(res, null, "Registro inserido com sucesso!");
        }
        catch (ex) 
        {
            return this.SendError(res, ex);
        }
    }

    @ApiOperationPost({
        path: "/UpdateStatus",
        description: "Update status",
        summary: "Update status",
        parameters: {
            body: { description: "Update status", required: true, model: "StatusModel" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/UpdateStatus")
    public async UpdateStatus(@request() req: express.Request,@response() res: express.Response) 
    {
           try 
           {
               if(!this.IsValid(req)) return this.SendNotFound(res, null, "Dados informados inválidos");
               let statusModel = req.body as StatusModel;
               await this._statusAppService.UpdateStatus(statusModel)
               return this.SendOk(res, null, "Registro atualizado com sucesso!");
           } 
           catch (ex)
           {
               return this.SendError(res, ex);
           }
    }

    @ApiOperationPost({
        path: "/DeleteStatus",
        description: "Delete status",
        summary: "Delete status",
        parameters: {
            body: { description: "Delete status", required: true, model: "StatusModel" }
        },
        responses: {
            200: { description: "Success" },
            400: { description: "Parameters fail" }
        }
    })
    @httpPost("/DeleteStatus")
    public async DeleteStatus(@request() req: express.Request,@response() res: express.Response) 
    {
        try 
        {
            if(!this.IsValid(req)) return this.SendNotFound(res, null, "Dados informados inválidos");
            let statusModel = req.body as StatusModel;
            await this._statusAppService.DeleteStatus(statusModel.statusId);
            return this.SendOk(res, null, "Regsitro excluido com sucesso");
        } catch (ex) {
            return this.SendError(res, ex);
        }
    }
}

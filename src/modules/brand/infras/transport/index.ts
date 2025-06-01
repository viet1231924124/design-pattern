import { IRepository } from "../../../../share/interface";
import { CreateCommand, DeleteCommand, IBrandRepository, ICommandHandler, IQueryHandler, ListQuery, UpdateCommand } from "../../interface";
import { Brand } from "../../model/brand/brand";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO, BrandUpdateDTOSchema } from "../../model/brand/dto";
import { IBrandUseCase } from "../../interface";
import { Request, Response } from "express";
import { PagingDTO, PagingDTOSchema } from "../../../../share/model/paging";
import { GetDetailQuery } from "../../interface";

export class BrandHttpService{
    constructor(
        private readonly createCmdHandler: ICommandHandler<CreateCommand,string>,
        private readonly getDetailQueryHandler: IQueryHandler<GetDetailQuery,Brand>,
        private readonly updateCmdHandler: ICommandHandler<UpdateCommand,void>,
        private readonly deleteCmdHandler: ICommandHandler<DeleteCommand,void>,
        private readonly listQueryHandler: IQueryHandler<ListQuery,Brand[]>,
        private readonly useCase: IBrandUseCase
    ) {}
    
    async createAPI(req: Request, res: Response){
        try{
            const cmd: CreateCommand = {cmd: req.body};
            
            const result = await this.createCmdHandler.execute(cmd);

            res.status(201).json({ data: result});
        } catch(error){
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async getDetailAPI(req: Request, res: Response){
        const {id} = req.params;

        try{
            const result = await this.getDetailQueryHandler.query({id});
            res.status(200).json({ data: result});
        } catch(error){
            res.status(400).json({
                message: (error as Error).message,
            });
        }

    }
    
    async updateAPI(req: Request, res: Response){
        const {id} = req.params;
        
        const cmd: UpdateCommand = {id, cmd: req.body};
        
        try{
            await this.updateCmdHandler.execute(cmd);
            res.status(200).json({ data: true});
        } catch(error){
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async deleteAPI(req: Request, res: Response){
        const {id} = req.params;

        const result = await this.useCase.delete(id);
        res.status(200).json({ data: result});
    }

    async listAPI(req: Request, res: Response){
        const {success, data: paging, error} = PagingDTOSchema.safeParse(req.query);

        if(!success){
            res.status(400).json({
                message: 'Invalid paging',
                error: error.message
            });
            return;
        }

        const result = await this.listQueryHandler.query({cond: {},paging});
        
        res.status(200).json({ data: result,paging: paging,filter: {}});
    }
}




export class BrandHttpServiceV2{
    constructor(
        private readonly commandHandler: ICommandHandler<CreateCommand,string>,
        private readonly useCase: IBrandUseCase
    ) {}
    
    async createAPI(req: Request, res: Response){
        try{
            const result = await this.useCase.create(req.body);
            res.status(201).json({ data: result});
        } catch(error){
            res.status(400).json({
                message: (error as Error).message,
            });
        }
    }

    async getDetailAPI(req: Request, res: Response){
        const {id} = req.params;

        const result = await this.useCase.get(id);
        res.status(200).json({ data: result});
    }
    
    async updateAPI(req: Request, res: Response){
        const {id} = req.params;
        const {success, data, error} = BrandUpdateDTOSchema.safeParse(req.body);

        if(!success){
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        
        const result = await this.useCase.update(id, data);
        res.status(200).json({ data: result});
    }

    async deleteAPI(req: Request, res: Response){
        const {id} = req.params;

        const result = await this.useCase.delete(id);
        res.status(200).json({ data: result});
    }

    async listAPI(req: Request, res: Response){
        const {success, data: paging, error} = PagingDTOSchema.safeParse(req.query);

        if(!success){
            res.status(400).json({
                message: 'Invalid paging',
                error: error.message
            });
            return;
        }


        const result = await this.useCase.list({}, paging);
        
        res.status(200).json({ data: result,paging: paging,filter: {}});
    }
}
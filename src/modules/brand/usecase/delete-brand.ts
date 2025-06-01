import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { CreateCommand, DeleteCommand, IBrandRepository, ICommandHandler, UpdateCommand } from "../interface";
import { ErrBrandNotFound } from "../model/brand/error";
import { BrandUpdateDTO, BrandUpdateDTOSchema } from "../model/brand/dto";
import { BrandCondDTO } from "../model/brand/dto";
import { Brand } from "../model/brand/brand";
import { IRepository } from "../../../share/interface";
import { BrandCreateDTOSchema } from "../model/brand/dto";

export class DeleteBrandCmdHandler implements ICommandHandler<DeleteCommand,void> {

    constructor(private readonly repository: IBrandRepository){}

    async execute(command: DeleteCommand): Promise<void> {

        const data= await this.repository.get(command.id);

        if(!data || data.status === ModelStatus.DELETED){
            throw ErrBrandNotFound;
        }
        
        await this.repository.delete(command.id,false);

        return;
    }
}
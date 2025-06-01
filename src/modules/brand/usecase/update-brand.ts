import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { CreateCommand, ICommandHandler, UpdateCommand } from "../interface";
import { ErrBrandNotFound } from "../model/brand/error";
import { BrandUpdateDTO, BrandUpdateDTOSchema } from "../model/brand/dto";
import { BrandCondDTO } from "../model/brand/dto";
import { Brand } from "../model/brand/brand";
import { IRepository } from "../../../share/interface";
import { BrandCreateDTOSchema } from "../model/brand/dto";

export class UpdateBrandCmdHandler implements ICommandHandler<UpdateCommand,void> {

    constructor(private readonly repository: IRepository<Brand,BrandCondDTO,BrandUpdateDTO>){}

    async execute(command: UpdateCommand): Promise<void> {
        const {success,data: parsedData, error} = BrandUpdateDTOSchema.safeParse(command.cmd);
        
        if(!success){
            throw new Error('Invalid data');
        }

        const brand = await this.repository.findByCond({name: parsedData.name});

        if(!brand || brand.status === ModelStatus.DELETED){
            throw ErrBrandNotFound;
        }
        
        await this.repository.update(command.id,parsedData);

        return;
    }
}
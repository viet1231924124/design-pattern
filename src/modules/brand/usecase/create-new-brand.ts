import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { CreateCommand, ICommandHandler } from "../interface";
import { ErrBrandNameDuplicate } from "../model/brand/error";
import { BrandUpdateDTO } from "../model/brand/dto";
import { BrandCondDTO } from "../model/brand/dto";
import { Brand } from "../model/brand/brand";
import { IRepository } from "../../../share/interface";
import { BrandCreateDTOSchema } from "../model/brand/dto";

export class CreateNewBrandCmdHandler implements ICommandHandler<CreateCommand,string> {

    constructor(private readonly repository: IRepository<Brand,BrandCondDTO,BrandUpdateDTO>){}

    async execute(command: CreateCommand): Promise<string> {
        const {success,data: parsedData, error} = BrandCreateDTOSchema.safeParse(command.cmd);
        
        if(!success){
            throw new Error('Invalid data');
        }

        const isExist = await this.repository.findByCond({name: parsedData.name});

        if(isExist){
            throw ErrBrandNameDuplicate;
        }
        
        const newId = v7();

        const newBrand = {
            ...parsedData,
            id: newId,
            status: ModelStatus.ACTIVE,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.repository.insert(newBrand);

        return newId;
    }
}
import { IRepository } from "../../../share/interface";
import { IBrandUseCase } from "../interface";
import { BrandCreateDTO, BrandUpdateDTO } from "../model/brand/dto";
import { Brand } from "../model/brand/brand";
import { BrandCondDTO } from "../model/brand/dto";
import { PagingDTO } from "../../../share/model/paging";
import { BrandCreateDTOSchema } from "../model/brand/dto";
import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/base-model";
import { ErrBrandNameDuplicate } from "../model/brand/error";

export class BrandUseCase implements IBrandUseCase{
    constructor(private readonly repository: IRepository<Brand,BrandCondDTO,BrandUpdateDTO>){}
    async create(data: BrandCreateDTO): Promise<string> {
        const {success,data: parsedData, error} = BrandCreateDTOSchema.safeParse(data);

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
    async get(id: string): Promise<Brand | null> {
        throw new Error("Method not implemented.");
    }
    async list(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, data: BrandUpdateDTO): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    
}
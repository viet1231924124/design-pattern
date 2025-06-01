import { IQueryRepository } from "../../../share/interface";
import { GetDetailQuery } from "../interface";
import { IQueryHandler } from "../interface";
import { Brand } from "../model/brand/brand";
import { BrandCondDTO } from "../model/brand/dto";
import { ErrBrandNotFound } from "../model/brand/error";

export class GetBrandDetailQuery implements IQueryHandler<GetDetailQuery,Brand> {
    constructor(private readonly repository: IQueryRepository<Brand,BrandCondDTO>){}

    async query(query: GetDetailQuery): Promise<Brand> {
        const data = await this.repository.findByCond(query.id);

        if(!data){
            throw ErrBrandNotFound;
        }

        return data;
    }
}
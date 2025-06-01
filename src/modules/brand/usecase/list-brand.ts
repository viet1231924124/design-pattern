import { IQueryRepository } from "../../../share/interface";
import { GetDetailQuery, ListQuery } from "../interface";
import { IQueryHandler } from "../interface";
import { Brand } from "../model/brand/brand";
import { BrandCondDTO } from "../model/brand/dto";
import { ErrBrandNotFound } from "../model/brand/error";

export class ListBrandQuery implements IQueryHandler<ListQuery,Brand[]> {
    constructor(private readonly repository: IQueryRepository<Brand,BrandCondDTO>){}

    async query(query: ListQuery): Promise<Brand[]> {
        const collection = await this.repository.list(query.cond,query.paging);

        return collection;
    }
}
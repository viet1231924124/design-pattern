import { Brand } from "../model/brand/brand";
import { PagingDTO } from "../../../share/model/paging";
import { BrandCreateDTO, BrandUpdateDTO, BrandCondDTO } from "../model/brand/dto";
import { IRepository } from "../../../share/interface";

export interface IBrandUseCase{
    create(data: BrandCreateDTO): Promise<string>;
    get(id: string): Promise<Brand | null>;
    list(cond: BrandCondDTO,paging: PagingDTO): Promise<Array<Brand>>;
    update(id: string,data: BrandUpdateDTO): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}

export interface CreateCommand {
    cmd: BrandCreateDTO;
}

export interface ICommandHandler<Cmd,Result> {
    execute(command: Cmd): Promise<Result>;
}

export interface GetDetailQuery {
    id: string;
}

export interface UpdateCommand {
    id: string;
    cmd: BrandUpdateDTO;
}

export interface DeleteCommand {
    id: string;
}

export interface ListQuery {
    cond: BrandCondDTO;
    paging: PagingDTO;
}

export interface IQueryHandler<Query,Result> {
    query(query: Query): Promise<Result>;
}

export interface IBrandRepository extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO>{   }

import { ICategoryUseCase, IRepository } from "../interface";
import { CategoryCondDTO, CategoryCreateDTO, CategoryUpdateDTO } from "../model/dto";
import { Category, CategoryCreateSchema } from "../model/model";
import { ModelStatus } from "../../../share/model/base-model";
import { v7 } from "uuid";
import { PagingDTO } from "../../../share/model/paging";
import { ErrDataNotFound } from "../../../share/model/base-error";
import { ZodError } from "zod";
import { ErrCategoryNameTooShort } from "../model/errors";
export class CategoryUseCase implements ICategoryUseCase{
    constructor(private readonly repository: IRepository){}

    async createANewCategory(data: CategoryCreateDTO): Promise<string>{
        const {success, data: parsedData, error} = CategoryCreateSchema.safeParse(data);

        if(error){
            const issues = (error as ZodError).issues;
            for(const issue of issues){
                if(issue.path[0] === 'name'){
                    throw ErrCategoryNameTooShort;
                }
            }
            throw error;
        }

        const newId = v7();
        
        const category: Category = {
            id: newId,
            name: parsedData.name,
            status: ModelStatus.ACTIVE,
            position: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: parsedData.image,
            description: parsedData.description,
            parentId: parsedData.parentId
        }
        await this.repository.insert(category);
        return "";
    }

    async getDetailCategory(id: string): Promise<Category | null>{
        const data = await this.repository.get(id);

        if(!data || data.status === ModelStatus.DELETED){
            throw ErrDataNotFound;
        }

        return data;
    }

    async listCategories(cond: CategoryCondDTO,paging: PagingDTO): Promise<Array<Category>>{
        const data = await this.repository.list(cond,paging);

        return data;
    }

    async updateCategory(id: string,data: CategoryUpdateDTO): Promise<boolean>{
        const category = await this.repository.get(id);

        if(!category || category.status === ModelStatus.DELETED){
            throw ErrDataNotFound;
        }
        
        return await this.repository.update(id,data);
    }

    async deleteCategory(id: string): Promise<boolean>{
        const category = await this.repository.get(id);

        if(!category || category.status === ModelStatus.DELETED){
            throw ErrDataNotFound;
        }

        return await this.repository.delete(id,false);
    }
}
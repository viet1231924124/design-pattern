import { CategoryUseCase } from "../../useCase/index";
import {Request, Response} from "express";
import { Category, CategoryCreateSchema, CategoryUpdateSchema} from "../../model/model";
import { PagingDTO, PagingDTOSchema} from "../../../../share/model/paging";
import { CategoryCondDTOSchema } from "../../model/dto";

export class CategoryHttpService{
    constructor(private readonly useCase: CategoryUseCase) {}
    
    async createANewCategoryAPI(req: Request, res: Response){
        const {success, data, error} = CategoryCreateSchema.safeParse(req.body);

        if(!success){
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        const result = await this.useCase.createANewCategory(data);
        res.status(201).json({ data: result});
    }

    async getDetailCategoryAPI(req: Request, res: Response){
        const {id} = req.params;

        const result = await this.useCase.getDetailCategory(id);
        res.status(200).json({ data: result});
    }
    
    async updateCategoryAPI(req: Request, res: Response){
        const {id} = req.params;
        const {success, data, error} = CategoryUpdateSchema.safeParse(req.body);

        if(!success){
            res.status(400).json({
                message: error.message,
            });
            return;
        }
        
        const result = await this.useCase.updateCategory(id, data);
        res.status(200).json({ data: result});
    }

    async deleteCategoryAPI(req: Request, res: Response){
        const {id} = req.params;

        const result = await this.useCase.deleteCategory(id);
        res.status(200).json({ data: result});
    }

    async listCategoryAPI(req: Request, res: Response){
        const {success, data: paging, error} = PagingDTOSchema.safeParse(req.query);

        if(!success){
            res.status(400).json({
                message: error.message,
            });
            return;
        }

        const cond = CategoryCondDTOSchema.parse(req.query);

        const result = await this.useCase.listCategories(cond, paging);

        const categoriesTree = this.buildTree(result);
        
        res.status(200).json({ data: categoriesTree,paging: paging,filter: cond});
    }

    private buildTree(categories: Category[]): Category[]{
        const categoriesTree: Category[] = [];

        const mapChildren = new Map<string, Category[]>();

        for(let i = 0; i < categories.length; i++){
            const category = categories[i];

            if(!mapChildren.get(category.id)){
                mapChildren.set(category.id, []);
            }

            category.children = mapChildren.get(category.id);

            if(!category.parentId){
                categoriesTree.push(category);
            }
            else{
                const children = mapChildren.get(category.parentId);
                children ? children.push(category) : mapChildren.set(category.parentId, [category]);
            }
        }
        return categoriesTree;
    }
}
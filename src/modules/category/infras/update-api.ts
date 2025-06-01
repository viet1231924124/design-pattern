import { RequestHandler } from "express";
import { Category, CategoryUpdateSchema } from "../model/model";
import { CategoryPersistence } from "./respository/dto";

export const updateCategoryApi: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const {success,data,error} = CategoryUpdateSchema.safeParse(req.body);

    if(!success){
        res.status(400).json({
            message: 'Invalid request',
            error: error.message
        });
        return;
    }

    const category = await CategoryPersistence.findByPk(id);
    if(!category){
        res.status(404).json({
            message: 'Category not found',
        });
        return;
    }
    
    if(category.status === "DELETED"){
        res.status(400).json({
            message: 'Category is deleted',
        });
        return;
    }
    
    await CategoryPersistence.update(data,{
        where:{
            id,
        },
    });

    res.status(200).json({
        message: 'Category updated',
        data: [],
    });
}

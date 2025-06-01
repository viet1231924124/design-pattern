import { Request, Response } from "express";
import { CategoryPersistence } from "./respository/dto";

export const deleteCategoryApi = async (req: Request, res: Response) => {
    const {id} = req.params;

    const category = await CategoryPersistence.findByPk(id);
    if(!category){
        res.status(404).json({
            message: 'Category not found',
        });
    }
    await CategoryPersistence.update({
        status:"DELETED",
    },{
        where:{
            id,
        },
    });
    res.status(200).json({
        message: 'Category deleted',
        data: [],
    });
}

import { Request, Response } from "express";
import { CategoryPersistence } from "./respository/dto";
import { CategoryStatus } from "../model/model";

export const getCategoryApi = async (req: Request, res: Response) => {
    const {id} = req.params;

    const category = await CategoryPersistence.findByPk(id);
    if(!category || category.status === CategoryStatus.DELETED){
        res.status(404).json({
            message: 'Category not found',
        });
    }
    res.json(200).json({
        data: category,
    });
}

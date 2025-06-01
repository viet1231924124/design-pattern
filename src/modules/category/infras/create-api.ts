import { Request, Response} from "express";
import { CategoryCreateSchema } from "../model/model";
import { CategoryPersistence } from "./respository/dto";
import { v7 } from "uuid";

export const createCategoryApi = async (req: Request, res: Response) => {
    const {success,data,error} = CategoryCreateSchema.safeParse(req.body);

    if(!success){
        res.status(400).json({
            message: 'Invalid request',
            error: error.message
        });
        return;
    }

    const newId=v7();
    await CategoryPersistence.create({...data,id:newId});

    res.status(200).json({
        data: [],
    });
}

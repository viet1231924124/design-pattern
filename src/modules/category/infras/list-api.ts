import { Request, Response } from "express";
import { CategoryPersistence } from "./respository/dto";
import { z } from "zod";
import { CategoryStatus } from "../model/model";
import { Op } from "sequelize";
import { PagingDTO, PagingDTOSchema } from "../../../share/model/paging";


export const listCategoryApi = async (req: Request, res: Response) => {
    const {success,data,error} = PagingDTOSchema.safeParse(req.query);  

    if(!success){
        res.status(400).json({
            message: 'Invalid paging',
            error: error.message,
        });
        return;
    }
    
    const {page,limit} = data;

    const cond = { status: { [Op.ne]: CategoryStatus.DELETED}};

    const total = await CategoryPersistence.count({where: cond});
    data.total = total;
    const rows = await CategoryPersistence.findAll({limit,offset:(page-1)*limit,where: cond});

    if(!rows){
        res.status(404).json({
            message: 'Categories not found',
        });
        return;
    }

    res.status(200).json({
        data: rows,
        paging: data,
    });
    
}

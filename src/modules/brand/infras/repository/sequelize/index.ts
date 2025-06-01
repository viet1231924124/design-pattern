import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../../share/repository/repo-sequelize"
import { Brand } from "../../../model/brand/brand";
import { BrandCondDTO, BrandUpdateDTO } from "../../../model/brand/dto";
import { modelName } from "./dto";

export class MySQLBrandRepository extends BaseRepositorySequelize<Brand, BrandCondDTO, BrandUpdateDTO> {
    constructor(sequelize: Sequelize){
        super(sequelize, modelName);
    }
}
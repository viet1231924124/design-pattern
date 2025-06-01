import { Router, RequestHandler } from "express";
import { createCategoryApi } from "./infras/create-api";
import { listCategoryApi } from "./infras/list-api";
import { deleteCategoryApi } from "./infras/delete-api";
import { updateCategoryApi } from "./infras/update-api";
import { getCategoryApi } from "./infras/get-api";
import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/respository/dto";
import { MYSQLCategoryRepository } from "./infras/respository/repo";
import { CategoryUseCase } from "./useCase";
import { CategoryHttpService } from "./infras/transport/http-service";

export const setupCategoryModule = (sequelize: Sequelize) => {
    init(sequelize);

    const router = Router();
    router.get('/categories',listCategoryApi);
    router.post('/categories',createCategoryApi);
    router.get('/categories/:id',getCategoryApi);
    router.patch('/categories/:id',updateCategoryApi);
    router.delete('/categories/:id',deleteCategoryApi);

    return router; 
}

export const setupCategoryHexagonal = (sequelize: Sequelize) => {
    init(sequelize);

    const respository = new MYSQLCategoryRepository(sequelize, modelName);

    const useCase = new CategoryUseCase(respository);

    const httpService = new CategoryHttpService(useCase);

    const router = Router();

    router.get('/categories',httpService.listCategoryAPI.bind(httpService));
    router.post('/categories',httpService.createANewCategoryAPI.bind(httpService));
    router.get('/categories/:id',httpService.getDetailCategoryAPI.bind(httpService));
    router.patch('/categories/:id',httpService.updateCategoryAPI.bind(httpService));
    router.delete('/categories/:id',httpService.deleteCategoryAPI.bind(httpService));
    
    return router;
}
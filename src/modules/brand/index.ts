import {Sequelize} from "sequelize";
import { init } from "./infras/repository/sequelize/dto";
import { MySQLBrandRepository } from "./infras/repository/sequelize";
import { CategoryUseCase } from "../category/useCase";
import { BrandUseCase } from "./usecase";
import { BrandHttpService } from "./infras/transport";
import { Router } from "express";
import { CreateNewBrandCmdHandler } from "./usecase/create-new-brand";
import { GetBrandDetailQuery } from "./usecase/get-brand-detail";
import { UpdateBrandCmdHandler } from "./usecase/update-brand";
import { DeleteBrandCmdHandler } from "./usecase/delete-brand";
import { ListBrandQuery } from "./usecase/list-brand";

export const setupBrandHexagon = (sequelize: Sequelize) => {
    init(sequelize);

    const repository = new MySQLBrandRepository(sequelize);
    const useCase = new BrandUseCase(repository);

    const createCmdHandler = new CreateNewBrandCmdHandler(repository);

    const getDetailQueryHandler = new GetBrandDetailQuery(repository);

    const updateCmdHandler = new UpdateBrandCmdHandler(repository);

    const deleteCmdHandler = new DeleteBrandCmdHandler(repository);

    const listQueryHandler = new ListBrandQuery(repository);

    const httpService = new BrandHttpService(
        createCmdHandler,
        getDetailQueryHandler,
        updateCmdHandler,
        deleteCmdHandler,
        listQueryHandler,
        useCase
    );
    
    const router = Router();
    
    router.post("/brands", httpService.createAPI.bind(httpService));
    router.get("/brands/:id", httpService.getDetailAPI.bind(httpService));
    router.put("/brands/:id", httpService.updateAPI.bind(httpService));
    router.delete("/brands/:id", httpService.deleteAPI.bind(httpService));
    router.get("/brands", httpService.listAPI.bind(httpService));

    return router;
}

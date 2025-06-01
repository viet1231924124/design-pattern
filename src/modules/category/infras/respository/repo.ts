import { Op, Sequelize } from "sequelize";
import { IRepository } from "../../interface";
import { Category, CategorySchema, CategoryStatus } from "../../model/model";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { PagingDTO, PagingDTOSchema } from "../../../../share/model/paging";
import { ModelStatus } from "../../../../share/model/base-model";
import { CategoryPersistence } from "./dto";

export class MYSQLCategoryRepository implements IRepository{
    constructor(private readonly sequelize: Sequelize,private readonly modelName: string){}
    async get(id: string): Promise<Category | null> {
        const data = await this.sequelize.models[this.modelName].findByPk(id);

        if(!data){
            return null;
        }

        const persistenceData = data.get({plain: true});

        return {
            ...persistenceData,
            children: [],
            createdAt: persistenceData.get("created_at").toISOString(),
            updatedAt: persistenceData.get("updated_at").toISOString(),
        } as Category;
    }
    async list(cond: CategoryCondDTO,paging: PagingDTO): Promise<Array<Category>> {
        const {page,limit} = paging;


        const condSQL = {...cond, status: { [Op.ne]: ModelStatus.DELETED}};

        const total = await this.sequelize.models[this.modelName].count({where: condSQL});
        paging.total = total;

        const rows = await this.sequelize.models[this.modelName].findAll({limit,offset:(page-1)*limit,where: condSQL});
        return rows.map(row => CategorySchema.parse(row.get({plain: true})));
    }

    async insert(data: Category): Promise<boolean> {
        await this.sequelize.models[this.modelName].create(data);
        return true;
    }

    async update(id: string,data: CategoryUpdateDTO): Promise<boolean> {
        await this.sequelize.models[this.modelName].update(data,{where: {id}});
        return true;
    }
    async delete(id: string,isHard: boolean = false): Promise<boolean> {
        if(!isHard){
            await this.sequelize.models[this.modelName].update({status: ModelStatus.DELETED},{where: {id}});
        }else{
            await this.sequelize.models[this.modelName].destroy({where: {id}});
        }
        return true;
    }

}
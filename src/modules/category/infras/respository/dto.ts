import { DataType,DataTypes,Model,Sequelize } from "sequelize";

export class CategoryPersistence extends Model{
    declare id:string;
    declare status:string;
}

export const modelName = "Category";

export function init(sequelize: Sequelize){
    CategoryPersistence.init(
        {
            id:{
                type:DataTypes.STRING,
                primaryKey:true,
            },
            name:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            image:{
                type:DataTypes.STRING,
                allowNull:true,
            },
            parentId:{
                type:DataTypes.STRING,
                field:"parent_id",
                allowNull:true,
            },
            description:{
                type:DataTypes.STRING,
                allowNull:true,
            },
            status:{
                type:DataTypes.ENUM("ACTIVE","INACTIVE","DELETED"),
                allowNull:false,
                defaultValue:"ACTIVE",
            }
        },
        {
            sequelize,
            modelName:modelName,
            tableName:"categories",
            timestamps:true,
            createdAt:"created_at",
            updatedAt:"updated_at",
        }
    );
}

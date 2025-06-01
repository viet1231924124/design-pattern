import express from 'express';
import {config} from 'dotenv';
import { setupCategoryHexagonal, setupCategoryModule } from './modules/category';
import { sequelize } from './share/component/sequelize';
config();

(async () => {
    await sequelize.authenticate();
    console.log("Database connected");
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/v1',setupCategoryModule(sequelize));
    app.use('/v2',setupCategoryHexagonal(sequelize));
    app.listen(port,()=>{
        console.log("Server is running")
    })
})();








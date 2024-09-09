import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from "express";
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from "./subcategoriesRoute";
import ApiErrors from '../utils/apiErrors';
import globalErrors from '../middlewares/globalErrors';



const mountRoutes = (app:Application) => {

    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategories', subcategoriesRoute);
    app.all('*',(req: Request, res: Response, next: NextFunction) => {
        return next( new ApiErrors(`this route ${req.originalUrl} not found`, 400   ))
    })
    app.use(globalErrors)


}


export default mountRoutes;
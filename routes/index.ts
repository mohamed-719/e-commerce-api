import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from "express";
import categoriesRoute from "./categoriesRoute";
import subcategoriesRoute from "./subcategoriesRoute";
import ApiErrors from '../utils/apiErrors';
import globalErrors from '../middlewares/globalErrors';
import productsRoute from './productsRoute';



const mountRoutes = (app:Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.cookie('cookies', req.csrfToken());
    next();
  });
    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategories', subcategoriesRoute);
      app.use('/api/v1/products', productsRoute)
    app.all('*',(req: Request, res: Response, next: NextFunction) => {
        return next( new ApiErrors(`this route ${req.originalUrl} not found`, 400   ))
    })
    app.use(globalErrors)


}


export default mountRoutes;
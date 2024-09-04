import { Router } from "express";
import { createCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categories";

const categoriesRoute:Router = Router();


categoriesRoute.route('/')
.get(getAllCategories)
.post(createCategory);


categoriesRoute.route('/:id')
.get(getCategory)
.put(updateCategory)
.delete(getCategory);



export default categoriesRoute;
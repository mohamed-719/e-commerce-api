import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";
import subcategoriesModel from "../../models/subcategoriesModel";
import { Subcategories } from "../../interfaces/subcategories";

export const createCategoryValidator: RequestHandler[] = [
  check('name') // this name  of req
  // hear is make if send in req in body is empty send Message
    .notEmpty().withMessage('category name required')
    .isLength({ min: 2, max: 50 }).withMessage('name length must be between 2 & 50')
    .custom(async (val: string) => {
      const category = await categoriesModel.findOne({ name: val });
      //hear dotnot used the proms because the error inter database
      if (category) { throw new Error('category is already exist') };
      return true;
    }),
  validatorMiddleware
  // hear must type  validatorMiddleware in the end
];

export const getCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  validatorMiddleware
];

export const updateCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('invalid mongo id'),
  check('name').optional()
    .isLength({ min: 2, max: 50 }).withMessage('name length must be between 2 & 50'),
  validatorMiddleware
];

export const deleteCategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('invalid mongo id')
    .custom(async(val: string) => {
    const subcategories = await subcategoriesModel.find({ category: val });
          if (subcategories.length > 0 ) {
        const bulkOption = subcategories.map((subcategories: Subcategories) => ({
          deleteOne: { filter: { _id: subcategories._id } }
        }))
        await subcategoriesModel.bulkWrite(bulkOption)
      }
    })
    ,
  validatorMiddleware
];
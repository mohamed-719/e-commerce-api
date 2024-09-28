import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProduct, resizeProductImages, updateProduct, upload } from '../controllers/products';
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from '../utils/validators/productsValidator';
import { uploadProductImages } from '../controllers/products';

const productsRoute: Router = Router()
productsRoute.route('/')
  .get(getAllProducts)
  .post( uploadProductImages, resizeProductImages, createProductValidator, createProduct);

productsRoute.route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

  
export default productsRoute;




export class ProductsService {
    constructor(dao){
        this.dao = new dao()
    }
     async getProducts(limit,page,category,sort, disp){
        return await ProductsDAO.getProducts(limit,page,category,sort, disp)
     }

     async getProductById(id){
        return await ProductsDAO.getProductById(id)
     }

     async createProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail
      ){
         return await ProductsDAO.createProduct(      title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail)
      }

      async updateProduct(id, body){
         return await ProductsDAO.updateProduct(id,body)
      }
      async deleteProduct(id){
         return await ProductsDAO.deleteProduct(id)
      }
}
import { ProductsDAO } from "../dao/productsDAO.js"
export const productsService = new ProductsService(ProductsDAO)
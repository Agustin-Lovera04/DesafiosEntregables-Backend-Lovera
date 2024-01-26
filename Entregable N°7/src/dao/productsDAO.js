import { productsModel } from "./models/productsModel.js";

export class ProductsDAO{
    static async getProducts(limit, page, category, sort, disp) {
        try {
          /* establecemos un parametro general para simplificar luego simplicar el metodo a mongoose-- Idea de documentacion */
          let query;
    
          if (disp !== undefined) {
            query = { status: Boolean(disp) };
          }
    
          if (category) {
            query.category = category;
          }
          /* establecemos un parametro general para simplificar luego simplicar el metodo a mongoose */
          let options = {
            page: page || 1,
            limit: limit || 10,
          };
    
          if (sort) {
            options.sort = { price: sort };
          }
    
          let products = await productsModel.paginate(query, options);
          return products;
        } catch (error) {
          console.log(error.message);
          return [];
        }
      }
    

      static async getProductById(id) {
        console.log('entro')
        let getProduct;
        try {
          getProduct = await productsModel.findOne({ status: true, _id: id });
          console.log("producto encontrado por id" + getProduct);
          return getProduct;
        } catch (error) {
          console.log("No se encontro Producto con Id:" + id);
          return null;
        }
      }
    

      static async createProduct(
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnail
      ) {
        try {
          let newProduct = await productsModel.create({
            title: title,
            description: description,
            code: code,
            price: Number(price),
            stock: Number(stock),
            category: category,
            thumbnail: thumbnail,
          });
          return newProduct;
        } catch (error) {
          console.log(error.message);
          return null;
        }
      }

}
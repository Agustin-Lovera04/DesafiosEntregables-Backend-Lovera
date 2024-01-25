import { productsService } from "../services/products.Service.js";
import mongoose from "mongoose";

function idValid(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error= 'Ingrese un Id Valido'
    console.log('error al validar')
    return res.redirect(`/errorHandlebars/?error=${error}`)
  }
}

export class ProductsController {
  constructor() {}

  static async render(req, res) {
    let user = req.user;

    try {
      let page = 1;
      if (req.query.page) {
        page = req.query.page;
      }
      let category;
      if (req.query.category) {
        category = req.query.category;
      }

      let sort;
      if (req.query.sort) {
        sort = Number(req.query.sort);
      }
      let disp;

      if (req.query.disp === undefined) {
        disp = true;
      } else if (req.query.disp === "true" || req.query.disp === "false") {
        /* compara por cadena de texto, si no es igual a true, lo pone en false */
        disp = req.query.disp === "true";
      } else {
        return res
          .status(400)
          .json({ error: "Debe ser un dato tipo boolean (true o false)" });
      }

      let products = await productsService.getProducts(
        req.query.limit,
        page,
        category,
        sort,
        disp
      );
      if (products.length <= 0) {
        console.log("NO HAY PRODUCTS EN BD");
      }

      res.status(200).render("viewProducts", {
        user: user,
        products: products.docs,
        totalPages: products.totalPages,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        sort: sort,
      });
    } catch (error) {
      console.error("Error al renderizar la vista:", error);
      res.status(500).json(error.message);
    }
  }


  static async getProductById(req,res){
    try {
      let {
        id
      } = req.params;
      let valid = idValid(id, res);
      if (valid) {
        return null;
      }
  
      let getProductById = await productsService.getProductById(id);
      if (!getProductById) {
        console.log("Error en busqueda por ID");
        return null;
      }
      res.status(200).render('viewDetailProduct',
        {getProductById}
      );
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }




}

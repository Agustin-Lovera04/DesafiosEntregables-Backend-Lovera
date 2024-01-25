import { cartsService } from "../services/carts.Service.js";
import mongoose from "mongoose";

function idValid(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error= 'Ingrese un Id Valido'
    console.log('error al validar')
    return res.redirect(`/errorHandlebars/?error=${error}`)
  }
}
export class CartsController{
constructor(){}

static async render(req,res){
    try {
        let carts = await cartsService.getCarts();
        if (carts.length <= 0) {
          console.log("NO HAY CARTS EN BD");
        }
    
        if (req.query.limit) {
          carts = carts.slice(0, req.query.limit);
          console.log(`Se estableció un límite de: ${req.query.limit}`);
        }
    
        res.status(200).render("viewCarts", {
          carts,
        });
      } catch (error) {
        console.error("Error al renderizar la vista:", error);
        res.status(500).json(error.message);
      }
}

static async getCartById(req,res){
    try {
        let { id } = req.params;
        let valid = idValid(id, res);
        if (valid) {
          return null;
        }
    
        let getCart = await cartsService.getCartById(id);
        if (!getCart) {
          console.log("Error en la búsqueda por ID");
          return null;
        }
    
        res.status(200).render("viewDetailCarts", { cart: getCart });
      } catch (error) {
        return res.status(500).json({
          error: error.message,
        });
      }
}

static async addProductInCart(req,res){
            try {
        let { cid } = req.params;
        let valid = idValid(cid, res);
        if (valid) {
          console.log("cid invalido");
          return null;
        }
        let { pid } = req.params;
        let validpid = idValid(pid, res);
        if (validpid) {
          console.log("pid invalido");
          return null;
        }
        const product = await managerProducts.getProductById(pid);
        if (!product) {
          console.log("error en recuperacion de producto");
          return null;
        }

    
        let cartMod = await cartsService.addProductInCart(cid, product);
        if (!cartMod) {
          console.log("fallo el agregado de producto");
          return null;
        }
        console.log("carro modificado: " + cartMod);
        return res.status(200).json({ cartMod });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
}

}
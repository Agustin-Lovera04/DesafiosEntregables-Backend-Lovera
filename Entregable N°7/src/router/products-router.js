import {
  Router
} from "express";
import {
  ManagerProducts
} from "../dao/managerMongo/managerProductsMongo.js";
import {
  productsModel
} from "../dao/models/productsModel.js";
import multer from "multer";
import mongoose from "mongoose";
import {
  io
} from "../app.js";
import { auth } from "./viewsRouter.js";
import { passportCall } from "../utils.js";
import { ProductsController } from "../controller/productsController.js";
export const router = Router();
export const managerProducts = new ManagerProducts();

/* MANEJO FORM DATA */
const upload = multer();

/* castear id 
function idValid(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    let error= 'Ingrese un Id Valido'
    return res.redirect(`/errorHandlebars/?error=${error}`)
  }
}
 */
router.get("/", passportCall('jwt'),ProductsController.render);

router.get("/:id", passportCall('jwt'),ProductsController.getProductById);

router.post("/", passportCall('jwt'),upload.none(), ProductsController.createProduct);

router.put("/:id", passportCall('jwt'),async (req, res) => {
  try {
    let {
      id
    } = req.params;
    let valid = idValid(id);
    if (valid) {
      return null;
    }

    let getProductById = await managerProducts.getProductById(id);
    if (!getProductById) {
      console.log("Error en busqueda por ID");
      return null;
    }

    if (req.body._id) {
      return res.status(400).json({
          error: "no se puede modificar la propiedad _id"
        });
    }

    let putProduct = await managerProducts.updateProduct(id, req.body);
    if (!putProduct) {
      res.status(404).json({
        error: "error al modificar"
      });
      return null;
    }
    io.emit("listProduct", await managerProducts.getProducts());
    return res.status(200).json({
      putProduct
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

router.delete("/:id", passportCall('jwt'),async (req, res) => {
  try {
    let {
      id
    } = req.params;
    let valid = idValid(id);
    if (valid) {
      return null;
    }

    let getProductById = await managerProducts.getProductById(id);
    if (!getProductById) {
      console.log("Error en busqueda por ID");
      return null;
    }

    let prodDeleted = await productsModel.updateOne(getProductById, {
      $set: {
        status: false
      },
    });

    if (!prodDeleted) {
      console.log("error en eliminacion");
      return null;
    }
    io.emit("listProduct", await managerProducts.getProducts());
    return res.status(200).json({
      prodDeleted
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});


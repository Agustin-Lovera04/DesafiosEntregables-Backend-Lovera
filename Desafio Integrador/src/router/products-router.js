import { Router } from "express";
import { ManagerProducts } from "../dao/managerMongo/managerProductsMongo.js";
import { productsModel } from "../dao/models/productsModel.js";
import multer from "multer";
import mongoose from "mongoose";
import { io } from "../app.js";
export const router = Router();
export const managerProducts = new ManagerProducts();

/* MANEJO FORM DATA */
const upload = multer();

/* castear id */
function idValid(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Ingrese un ID valido",
    });
  }
}

router.get("/", async (req, res) => {
  try {
    let products = await managerProducts.getProducts({
      status: true,
    });
    if (products.length <= 0) {
      console.log("NO HAY PRODUCTS EN BD");
    }

    if (req.query.limit) {
      products = products.slice(0, req.query.limit);
      console.log(`Se estableció un límite de: ${req.query.limit}`);
    }

    res.status(200).render("viewProducts", {
      products,
    });
  } catch (error) {
    console.error("Error al renderizar la vista:", error);
    res.status(500).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let valid = idValid(id);
    if (valid) {
      return null;
    }

    let getProductById = await managerProducts.getProductById(id);
    if (!getProductById) {
      console.log("Error en busqueda por ID");
      return null;
    }

    res.status(200).json({
      getProductById,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.post("/", upload.none(), async (req, res) => {
  try {
    let { title, description, code, price, stock, category, thumbnail } =
      req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return "Faltan campos obligatorios para agregar el producto.";
    }

    let exReg = /[0-9]/;
    if (
      exReg.test(title) ||
      exReg.test(description) ||
      exReg.test(code) ||
      exReg.test(category)
    ) {
      return res.status(404).json({
        error:
          "Controlar error numerico en  los siguientes campos: title, description, code, category",
      });
    }

    let confirmCreateProduct = await managerProducts.createProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail
    );
    if (!confirmCreateProduct) {
      return res.status(404).json({ error: "error al crear" });
    }

    io.emit("listProduct", await managerProducts.getProducts());
    return res.status(200).json({ confirmCreateProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
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
      return res
        .status(404)
        .json({ error: "no se puede modificar la propiedad _id" });
    }

    let putProduct = await managerProducts.updateProduct(id, req.body);
    if (!putProduct) {
      res.status(404).json({ error: "error al modificar" });
      return null;
    }
    io.emit("listProduct", await managerProducts.getProducts());
    return res.status(200).json({ putProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
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
      $set: { status: false },
    });

    if (!prodDeleted) {
      console.log("error en eliminacion");
      return null;
    }
    io.emit("listProduct", await managerProducts.getProducts());
    return res.status(200).json({ prodDeleted });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

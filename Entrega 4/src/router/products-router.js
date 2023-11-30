import { Router } from "express";
import multer from 'multer'
import { ProductManager, ruta } from "../managers/productManager.js";
import {io} from '../app.js'
export const router = Router();

const upload = multer()

export const productPrueba = new ProductManager(ruta);
productPrueba.addProduct(
  "Producto Prueba 1",
  "Este es un producto prueba",
  "a",
  10,
  25,
  "prueba",
  "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 2",
    "Este es un producto prueba",
    "b",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 3",
    "Este es un producto prueba",
    "c",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 4",
    "Este es un producto prueba",
    "d",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 5",
    "Este es un producto prueba",
    "e",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 6",
    "Este es un producto prueba",
    "f",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 7",
    "Este es un producto prueba",
    "g",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 8",
    "Este es un producto prueba",
    "h",
    10,
    25,
    "prueba",
    "Sin imagen",
);
productPrueba.addProduct(
    "Producto Prueba 9",
    "Este es un producto prueba",
    "i",
    10,
    25,
    "prueba",
    "Sin imagen",
);

productPrueba.addProduct(
    "Producto Prueba 10",
    "Este es un producto prueba",
    "j",
    10,
    25,
    "prueba",
    "Sin imagen",
);

router.get('/', async (req, res) => {
  try {
    let products = await productPrueba.getProducts();

    if (req.query.limit) {
      products = products.slice(0, req.query.limit);
      console.log(`Se estableció un límite de: ${req.query.limit}`);
    }

    res.status(200).json( products );
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const findIdParams = await productPrueba.getProductById(id);
    if (findIdParams) {
      res.setHeader("Content-type", "application/json");
      res.json([findIdParams]);
      return;
    }
  } catch (error) {
    res.status(404).json({
      error: "Busqueda fallida",
    });
  }
});

router.post('/',upload.none(), async(req,res)=>{
  try{
    let { title, description, code, price, status, category,thumbnails} = req.body
    let exReg= /[0-9]/
        if(exReg.test(title) || exReg.test(description) || exReg.test(code) || exReg.test(category)){
            return res.status(404).json({
                error: "Controlar error numerico en  los siguientes campos: title, description, code, category",
              })}
        let confirmAddProduct = await productPrueba.addProduct( title, description, code, price, status, category,thumbnails)
        io.emit('listProd', await productPrueba.getProducts())
        return res.status(201).json(confirmAddProduct)
    } catch (error) {
        res.status(500).json({
          error: "error al agregar producto",
        });
      }
})


router.put('/:pid', async(req, res) => {
  try {
    let id = parseInt(req.params.pid);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    let productMod = await productPrueba.updateProduct(id, req.body);
    if (!productMod) {
      return res.status(400).json({ error: 'Producto no encontrado o propiedades inválidas' });
    }
      res.status(200).json(productMod);

  } catch (error) {
    res.status(500).json({ error: 'Error interno' });
  }
});

router.delete("/:pid", async(req, res) =>{
  try {
    let id = parseInt(req.params.pid);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    let prodDelete = await productPrueba.deleteProduct(id)
    if(prodDelete){
      io.emit('listProd', await productPrueba.getProducts())
      return res.status(200).json(prodDelete)}
  } catch (error) {
    res.status(500).json({ error: 'Error interno' })
  }
})
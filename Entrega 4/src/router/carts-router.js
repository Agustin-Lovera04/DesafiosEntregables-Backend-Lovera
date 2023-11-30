import { Router } from 'express';
import { CartManager, ruta as cartPath } from '../managers/cartManager.js';
import { productPrueba } from './products-router.js';

export const router = Router();

const cartInstance = new CartManager(cartPath);



router.post('/',async(req,res)=>{
    try {
        let createCart =  await cartInstance.createCart()
        res.status(200).json(createCart)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carrito' });
    }
})


router.get('/:cid', async(req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productsInCart =  await cartInstance.getProductsInCart(cartId);
  
    if (productsInCart) {
      console.log(productsInCart)
      res.status(200).json(productsInCart);
    } else {
      console.log(productsInCart)
      res.status(404).json({ error: 'Error al mostrar carrito' });
    }
    
  } catch (error) {
    res.status(500).json({error: 'internal error'})
  }
  });


  router.post('/:cid/product/:pid', async (req, res) => {
    try {
      let cartId = parseInt(req.params.cid);
      if (isNaN(cartId)) {
        res.status(404).json({ error: 'ID de carrito inválido' });
        return;
      }
      
      let productId = parseInt(req.params.pid);
      if (isNaN(productId)) {
        res.status(404).json({ error: 'ID de producto inválido' });
        return;
      }
      
  
      const product = productPrueba.getProductById(productId);
  
      if (!product) {
        res.status(404).json({ error: 'No existe un producto con el ID proporcionado.' });
        return;
      }
  
      cartInstance.addProductInCart(cartId, product);
      res.status(200).json({ message: 'Producto agregado', product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
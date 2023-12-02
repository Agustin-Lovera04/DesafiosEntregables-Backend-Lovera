import { Router } from 'express';
/* import { productPrueba } from './products-router.js'; */
export const router=Router()


router.get('/', async (req, res) => {
    try {
        /* let products = await productPrueba.getProducts(); */
        res.status(200).render('index',/*  { products } */);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* 
router.get('/realtimeproducts', async(req,res) => {
    try {
        let products = await productPrueba.getProducts();
        res.status(200).render('realTimeProducts', {products})
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
})

 */
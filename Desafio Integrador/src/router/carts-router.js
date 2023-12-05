import { Router } from 'express';
import { ManagerCarts } from '../dao/managerMongo/managerCartsMongo.js';
import {
    cartsModel
} from "../dao/models/cartsModel.js";
import multer from "multer";
import mongoose from "mongoose";
import { io } from "../app.js";
import { managerProducts } from './products-router.js';
export const router=Router()
const managerCarts = new ManagerCarts()
const upload = multer();



function idValid(id,res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: "Ingrese un ID valido"
        });
    }
}


router.get('/', async(req,res) =>{
    try {
        let carts= await managerCarts.getCarts()
        if (carts.length <= 0) {
            console.log("NO HAY CARTS EN BD");
        }

        if (req.query.limit) {
            carts = carts.slice(0, req.query.limit);
            console.log(`Se estableció un límite de: ${req.query.limit}`);
        }

        res.status(200).render("viewCarts", {
            carts
        });
    } catch (error) {
        console.error("Error al renderizar la vista:", error);
        res.status(500).json(error.message);
    }
})

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let valid = idValid(id, res);
        if (valid) {
            return null;
        }

        let getCart = await managerCarts.getCartById(id);
        if (!getCart) {
            console.log("Error en la búsqueda por ID");
            return null;
        }

        res.status(200).render('viewDetailCarts', { cart: getCart });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    console.log('entro a la ruta')
    try {
        let { cid } = req.params;
        let valid = idValid(cid, res);
        if (valid) {
            console.log('cid invalido')
            return null;
        }
        let { pid } = req.params;
        let validpid = idValid(pid, res);
        if (validpid) {
            console.log('pid invalido')
            return null;
        }
        console.log('cid y pid'+cid+' '+pid)
        const product = await managerProducts.getProductById(pid)
        console.log('product:'+product)
        if(!product){
            console.log('error en recuperacion de producto')
            return null
        }

        let cartMod  = await managerCarts.addProductInCart(cid, product)
        if(!cartMod){
            console.log('fallo el agregado de producto')
            return null
        }
        console.log('carro modificado: '+cartMod)
        return res.status(200).json({cartMod})
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})





router.post('/',upload.none(),async(req,res)=>{
    try {
        let {title} = req.body
        if (!title) {
            return "Coloque un titulo";
        }
        let exReg = /[0-9]/;
        if (
            exReg.test(title)
        ) {
            return res.status(404).json({
                error: "Controlar error numerico en  los siguientes campos: title, description, code, category",
            });
        }

        let createCart = await managerCarts.createCart(title)
        if(!createCart){
            return res.status(404).json({error: 'error al crear'})
        }

        io.emit('listCarts', await managerCarts.getCarts())
        return res.status(200).json('Carrito Creado' + createCart.title)        
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
})
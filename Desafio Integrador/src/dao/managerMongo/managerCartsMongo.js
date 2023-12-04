import { cartsModel } from "../models/cartsModel.js";

export class ManagerCarts{
    async getCarts(){
        try {
            let carts = await cartsModel.find({status: true})
                return carts
        } catch (error) {
            console.log(error.message)
            return []
        }
    }



    async createCart(title){
        try {
            let newCart = await cartsModel.create({title:title})
            return newCart
        } catch (error) {
            console.log('error al crear', error.message)
            return null
        }
    }

    async getCartById(cartId) {
        let getCart
        try {
            getCart = await cartsModel.findOne({status:true, _id:cartId})
            console.log('producto encontrado por id' + getCart)
            return getCart
        } catch (error) {
            console.log('No se encontro carrito con Id:' + cartId)
            return null 
        }
    }



    async addProductInCart(cid, product){
        console.log('entro a addproduct')
        let getCart
        try {
            getCart = await cartsModel.findOne({status:true, _id:cid})
            if(!getCart){
                console.log('no se encontro carrito')
            }
        let productInCart = getCart.products.find((prod)=> prod.product._id === product._id)
        if(productInCart){
            productInCart.quantity++
            return
        }

        getCart.products.products.push({
            product: product,
            quantity: 1
        })
        try {
            let cartMod = await cartsModel.updateOne({getCart, getCart})
            console.log(cartMod)
            if(cartMod.modifiedCount>0){
                console.log('Modificado')
                return cartMod
            }
        } catch (error) {
            console.log('error al modificar')
            return null
        }

        } catch (error) {
            return null 
        }
    }

}
import { productsModel } from "../models/productsModel.js";

export class ManagerProducts{
    async getProducts(){
        try {
            let products = await productsModel.find()
                return products
        } catch (error) {
            console.log(error.message)
            return []
        }
    }


    async createProduct(title, description, code, price, stock, category, thumbnail){
        try {
            let newProduct = await productsModel.create({title:title, description:description, code:code, price:Number(price), stock:Number(stock), category:category, thumbnail:thumbnail}) 
            console.log(newProduct)
            return newProduct
        } catch (error) {
            console.log(error.message)
            return null 
        }
    }


    async getProductById(id){
        let getProduct
        try {
            getProduct = await productsModel.findOne({status:true, _id:id})
            console.log('producto encontrado por id' + getProduct)
            return getProduct
        } catch (error) {
            console.log('No se encontro Producto con Id:' + id)
            return null 
        }
    }


    async updateProduct(id, body){
        let getProduct
        try {
            getProduct = await productsModel.findOne({status:true, _id:id})
            console.log('producto encontrado por id' + getProduct)

        let prodMod
            try {
                prodMod = await productsModel.updateOne(getProduct, body)
                if(prodMod.modifiedCount>0){
                    console.log('Modificado')
                    return prodMod
                }
            } catch (error) {
                console.log('Error en Update')
                return null
            }

        } catch (error) {
            console.log('No se encontro Producto con Id:' + id)
            return null 
        }
    }



    async deleteProduct(id){
        let getProduct
        try {
            getProduct = await productsModel.findOne({status:true, _id:id})
            console.log('producto encontrado por id' + getProduct)

        let prodDeleted
            try {
                prodMod = await productsModel.updateOne(getProduct, {$set: {status: false}})
                if(prodMod.modifiedCount>0){
                    console.log('Desactivado')
                    return prodDeleted
                }
            } catch (error) {
                console.log('Error en Delete')
                return null
            }

        } catch (error) {
            console.log('No se encontro Producto con Id:' + id)
            return null 
        }
    }



















}
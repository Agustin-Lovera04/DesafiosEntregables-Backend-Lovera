import mongoose from 'mongoose'

export const cartsModel = mongoose.model('Carts', new mongoose.Schema(
    {
       title: { type: String, required: true, unique: true}, 
       products: {type:Object ,default: {
        products: [],
        quantity: {type: Number, default:0}
       }}, 
       status: {type:Boolean,default:true}
    }
))
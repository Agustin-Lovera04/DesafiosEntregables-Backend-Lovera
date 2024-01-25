export class CartsService {
    constructor(dao){
        this.dao = new dao()
    }

    async getCarts(){
        return await this.dao.getCarts()
    }

    async getCartById(id){
        return await this.dao.getCartById(id)
    }

    async addProductInCart(cid, product){
        return await this.dao.getCartById(cid, product)
    }
}
import { CartsDAO } from "../dao/cartsDAO.js"
export const cartsService = new CartsService(CartsDAO)
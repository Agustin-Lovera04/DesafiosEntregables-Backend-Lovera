import { cartsModel } from "../models/cartsModel.js";

export class ManagerCarts {
  async getCarts() {
    try {
      let carts = await cartsModel.find({ status: true });
      return carts;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  async createCart(title) {
    try {
      let newCart = await cartsModel.create({ title: title });
      return newCart;
    } catch (error) {
      console.log("error al crear", error.message);
      return null;
    }
  }

  async getCartById(cartId) {
    let getCart;
    try {
      getCart = await cartsModel.findOne({ status: true, _id: cartId });
      console.log("producto encontrado por id" + getCart);
      return getCart;
    } catch (error) {
      console.log("No se encontro carrito con Id:" + cartId);
      return null;
    }
  }

  async addProductInCart(cid, product) {
    console.log("entro a addproduct");
    try {
      let getCart = await cartsModel.findOne({ status: true, _id: cid });
      if (!getCart) {
        console.log("no se encontro carrito");
        return null;
      }

      console.log("carrito: " + getCart);

      if (!getCart.products || !Array.isArray(getCart.products)) {
        console.log("La estructura de productos en el carrito es incorrecta");
        return null;
      }

      let productInCart = getCart.products.find(
        (prod) => prod.product._id.toString() === product._id.toString()
      );

      console.log("productInCart:" + productInCart);
      if (productInCart) {
        productInCart.quantity++;
      } else {
        getCart.products.push({
          product: product._id,
          quantity: 1,
        });
      }

      console.log("carro mod " + getCart);
      try {
        let cartMod = await cartsModel.updateOne(
          { _id: cid },
          { products: getCart.products }
        );
        console.log(cartMod);
        if (cartMod.modifiedCount > 0) {
          console.log("Modificado");
          let cart = await cartsModel.findOne({ _id: cid });
          return cart;
        }
      } catch (error) {
        console.log("error al modificar", error);
        return null;
      }
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}
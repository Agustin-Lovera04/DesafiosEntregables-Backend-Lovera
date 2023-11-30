/* 19/10 CORRECCIONES TUTOR ENTREGABLE 1 */

class ProductManager {
  constructor() {
    this.products = []
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    /* CORRECCION TUTOR IF ELSE, REEMPLAZAR EL ELSE, CON SALIDA POR RETURN */
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan campos obligatorios para agregar el producto.");
      return
    }   
      const validationProduct = this.products.find((product) => product.code === code)
    
    /* CORRECCION TUTOR IF ELSE, REEMPLAZAR EL ELSE, CON SALIDA POR RETURN */
      if (validationProduct) {
        console.log(
          `El siguiente producto ya existe.
          Codigo: ${code}
          Nombre: ${title}`
        )
        return
      } 
        let id = 1
        if (this.products.length > 0) {
          id = this.products[this.products.length - 1].id + 1
        }

        let newProduct = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          id
        }

        this.products.push(newProduct)
        console.log(`Producto "${title}" agregado.`)
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    const findProductById = this.products.find((product) => product.id === id)
    const resultFind = findProductById ? { product: findProductById } : {error: "Not Found" }
    return resultFind
  }
}


//TESTING

//1- Se creará una instancia de la clase “ProductManager”
let productPrueba = new ProductManager()

//2-Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log(productPrueba.getProducts())

/* 3-Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25 */

//4-El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

productPrueba.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
)


//5-Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(productPrueba.getProducts())


//6-Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productPrueba.addProduct(
    "Producto Prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
  
  console.log(productPrueba.getProducts())

//7-Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
  console.log(productPrueba.getProductById(4)) //ERROR
  console.log(productPrueba.getProductById(1)) //FUNCIONA


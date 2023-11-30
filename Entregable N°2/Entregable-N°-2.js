const fs = require("fs")

class ProductManager {
  constructor(pathArchive) {
    this.products = []
    this.path = pathArchive
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    /* CORRECCION TUTOR IF ELSE, REEMPLAZAR EL ELSE, CON SALIDA POR RETURN */
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan campos obligatorios para agregar el producto.")
      return
    }
    const validationProduct = this.products.find(
      (product) => product.code === code
    )

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
      id,
    }

    this.products.push(newProduct)
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"))
    console.log(`Producto "${title}" agregado.`)
  }

  getProducts() {
    if (fs.existsSync(this.path)) {
      const content = fs.readFileSync(this.path, "utf8")
      const products = JSON.parse(content)
      return products
    } else {
      return []
    }
  }

  getProductById(id) {
    const products = this.getProducts()
    if (products) {
      const findProductById = products.find((p) => p.id === id)
      if (findProductById) {
        console.log("Busqueda exitosa! El producto encontrado es:")
        return [findProductById]
      } else {
        console.log("Busqueda Fallida")
        return []
      }
    } else {
      return []
    }
  }



  updateProduct(id, field, modField) {
    const products = this.getProducts()
    if (products) {
      const findProductById = products.find((p) => p.id === id)
      if (findProductById && findProductById[field] !== undefined) {
        findProductById[field] = modField
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
        return (`Producto ID ${id} actualizado: ${field} reemplazado por ${modField}`)
      } else {
        return ("No se encontro producto con ese campo:(")
      }
    }
  }

  deleteProduct(id) {
    const products = this.getProducts()
    if (products) {
      const productIndexToDelete = products.findIndex((p) => p.id === id)
      if (productIndexToDelete !== -1) {
        products.splice(productIndexToDelete, 1)
        fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"))
        return "Producto Eliminado Correctamente"
      } else {
        return "No se encontró producto con ese ID"
      }
    }
    return "Error al eliminar el producto."
  }
}


/* TESTING------------------------------------------------------- */
let productPrueba = new ProductManager("./archivos/products.json")
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
console.log(productPrueba.getProducts()) /* Leer productos */
/* console.log(productPrueba.getProductById(2)) /* Buscar por id 
console.log(productPrueba.updateProduct(1, "title", "HOLA SOY LA MODIFICACION"))
console.log(productPrueba.updateProduct(3, "description", "PRUDCTO DE AGUS"))
console.log(productPrueba.getProducts())
console.log(productPrueba.deleteProduct(3))
console.log(productPrueba.getProducts()) */
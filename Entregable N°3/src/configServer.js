const fs = require('fs')
const express = require('express')

const PORT = 3000

const app = express()
class ProductManager {
  constructor(pathArchive) {
    this.products = []
    this.path = pathArchive
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Faltan campos obligatorios para agregar el producto.")
      return
    }
    const validationProduct = this.products.find(
      (product) => product.code === code
    )

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
        console.log(`Busqueda exitosa! El producto encontrado es: ${findProductById.title}`)
        return [findProductById]
      } else {
        return ('Busqueda Fallida')
      }
    } else {
      return []
    }
  }
}

const productsData = [
  {
    name: "Producto Prueba 1",
    description: "Este es un producto prueba",
    price: 10,
    image: "Sin imagen",
    id: "1",
    stock: 25,
  },
  {
    name: "Producto Prueba 2",
    description: "Este es un producto prueba 2",
    price: 20,
    image: "Sin imagen",
    id: "2",
    stock: 35,
  },
  {
    name: "Producto Prueba 3",
    description: "Este es un producto prueba 3",
    price: 30,
    image: "Sin imagen",
    id: "3",
    stock: 15,
  },
  {
    name: "Producto Prueba 4",
    description: "Este es un producto prueba 4",
    price: 40,
    image: "Sin imagen",
    id: "4",
    stock: 60,
  },
  {
    name: "Producto Prueba 5",
    description: "Este es un producto prueba 5",
    price: 50,
    image: "Sin imagen",
    id: "5",
    stock: 81,
  },
  {
    name: "Producto Prueba 6",
    description: "Este es un producto prueba 6",
    price: 60,
    image: "Sin imagen",
    id: "6",
    stock: 52,
  },
  {
    name: "Producto Prueba 7",
    description: "Este es un producto prueba 7",
    price: 70,
    image: "Sin imagen",
    id: "7",
    stock: 19,
  },
  {
    name: "Producto Prueba 8",
    description: "Este es un producto prueba 8",
    price: 80,
    image: "Sin imagen",
    id: "8",
    stock: 75,
  },
  {
    name: "Producto Prueba 9",
    description: "Este es un producto prueba 9",
    price: 90,
    image: "Sin imagen",
    id: "9",
    stock: 95,
  },
  {
    name: "Producto Prueba 10",
    description: "Este es un producto prueba 10",
    price: 100,
    image: "Sin imagen",
    id: "10",
    stock: 115,
  },
];

// Puedes utilizar este arreglo con la instancia de la clase ProductManager


const productPrueba = new ProductManager('./archivos/products.json', productsData)
/* const productPrueba = new ProductManager("./archivos/products.json")
productPrueba.addProduct("Producto Prueba 1", "Este es un producto prueba", 10, "Sin imagen", "1", 25)
productPrueba.addProduct("Producto Prueba 2", "Este es un producto prueba 2", 20, "Sin imagen", "2", 35)
productPrueba.addProduct("Producto Prueba 3", "Este es un producto prueba 3", 30, "Sin imagen", "3", 15)
productPrueba.addProduct("Producto Prueba 4", "Este es un producto prueba 4", 40, "Sin imagen", "4", 60)
productPrueba.addProduct("Producto Prueba 5", "Este es un producto prueba 5", 50, "Sin imagen", "5", 81)
productPrueba.addProduct("Producto Prueba 6", "Este es un producto prueba 6", 60, "Sin imagen", "6", 52)
productPrueba.addProduct("Producto Prueba 7", "Este es un producto prueba 7", 70, "Sin imagen", "7", 19)
productPrueba.addProduct("Producto Prueba 8", "Este es un producto prueba 8", 80, "Sin imagen", "8", 75)
productPrueba.addProduct("Producto Prueba 9", "Este es un producto prueba 9", 90, "Sin imagen", "9", 95)
productPrueba.addProduct("Producto Prueba 10", "Este es un producto prueba 10", 100, "Sin imagen", "10", 115) */

app.get('/', (req, res) => {
  res.send('Soy el server de Express')
})

app.get('/products',async(req, res) => {
  res.setHeader('Content-type', 'application/json')
  const products = await productPrueba.getProducts()
  res.json(products)
})

app.get('/products/lm', async(req, res) => {

  let resultLimit = await productPrueba.getProducts()

  if (req.query.limit) {
    resultLimit = resultLimit.slice(0, req.query.limit)
  }

  res.setHeader('Content-type', 'application/json')
  res.json(resultLimit)
})


app.get('/products/:pid', async(req, res) => {
  const id = parseInt(req.params.pid)
  const findIdParams = await productPrueba.getProductById(id)
  if (findIdParams) {
    res.setHeader('Content-type', 'application/json')
    res.json([findIdParams])
    return
  }
  res.status(404).json({
    error: 'Busqueda fallida'
  })
})


const server = app.listen(PORT, () => {
  console.log('server Express Funcionando en puerto ' + PORT)
})
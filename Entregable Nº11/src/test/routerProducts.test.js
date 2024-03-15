import {describe, it} from 'mocha'
import {expect} from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { config } from '../config/config.js';

try {
    await mongoose.connect(
      config.MONGO_URL
    );
    console.log("BD Online");
  } catch (error) {
    console.log(error.message);
  }
  
const requester=supertest('http://localhost:8080')

/* EVALUAR LOGICA DE AUTENTICACION PARA HACER DINAMICO LA ASIGNACION DE TOKEN */
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU5MTkwMTdiNmQ2OWMwNjMzMzJhMjAiLCJmaXJzdF9uYW1lIjoiQWd1c3RpbiIsImxhc3RfbmFtZSI6IkxvdmVyYSIsImVtYWlsIjoiYWd1c3J1Z2J5eUBnbWFpbC5jb20iLCJhZ2UiOjIsImNhcnQiOnsidGl0bGUiOiJDYXJybyBkZTogTG92ZXJhIiwic3RhdHVzIjp0cnVlLCJfaWQiOiI2NWU5MTkwMTdiNmQ2OWMwNjMzMzJhMWUiLCJwcm9kdWN0cyI6W10sIl9fdiI6MH0sInJvbCI6InByZW1pdW4iLCJEYXRlT24iOiIyMDI0LTAzLTA3VDAxOjMxOjQ1Ljc5NFoiLCJEYXRlVWx0aW1hdGVNb2QiOiIyMDI0LTAzLTA3VDAxOjMzOjU0LjM2OFoiLCJfX3YiOjAsImlhdCI6MTcxMDUxOTg2NSwiZXhwIjoxNzEwNTIzNDY1fQ.7mTJA9Z-iIw9QW8o7dqIbXSacFcxNijZO526Qv2Sjus'

describe('PRUEBA ROUTER DE PRODUCTS', async function(){
    this.timeout(7000)
    after(async()=>{
      await mongoose.connection.collection("products").deleteMany({title:"PRODUCT TESTING SUPERTEST"})

  })
    describe('Prueba Router products', async function(){
        it('Prueba endpoint GET /products. => Renderiza vista "ViewProducts", junto con un objeto que contiene: error, user, array de productos (10), componentes de paginacion',async function(){
            let respuesta = await requester.get("/products").set('Cookie', `CookieUser=${token}`)
            expect(respuesta.statusCode).to.be.equal(200)
            expect(respuesta.ok).to.be.true
        })

        it('Prueba endpoint GET /products/:id  => Renderiza vista "ViewDetailProducts", junto con un objeto que contiene: el producto', async function(){
          /* Dejamos hardcodeado un id de product */
          let id = '6574898c4ba22b2e935dfbae'
          let respuesta= await requester.get(`/products/${id}`).set('Cookie', `CookieUser=${token}`)
          expect(respuesta.statusCode).to.be.equal(200)
          expect(respuesta.ok).to.be.true
        })

        it('Prueba endpoint POST /api/products => Permite guardar un producto en BD', async function(){
          let product = {title: "PRODUCT TESTING SUPERTEST", description: "test" ,code:"testSPT", price: 22, stock: 22,category: "test"}

          let respuesta = await requester.post('/api/products').send(product).set('Cookie', `CookieUser=${token}`)
          console.log(respuesta)
          expect(respuesta.ok).to.be.true
        })

        /* HASTA ACA ANDANDO TODO BIEN!!!!!!------ */
    })
})
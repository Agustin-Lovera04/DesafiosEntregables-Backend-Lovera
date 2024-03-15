import {describe, it} from 'mocha'
import {expect} from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { config } from '../config/config.js';
import { v4 } from "uuid";
import { genToken } from '../utils.js';
try {
    await mongoose.connect(
      config.MONGO_URL
    );
    console.log("BD Online");
  } catch (error) {
    console.log(error.message);
  }
  
const requester=supertest('http://localhost:8080')

describe('PRUEBA ROUTER DE PRODUCTS', async function(){
    this.timeout(7000)

    let user = {first_name: "Aguss", last_name: "Loverga",edad: 20, email: "testing@testing.com", rol: "premiun", password: "wwwPPP"}
    let token = genToken(user)

    after(async()=>{
      await mongoose.connection.collection("products").deleteMany({code:"testSPT"})
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
          expect(respuesta.statusCode).to.be.equal(200)
          expect(respuesta.ok).to.be.true
        })

        it('Prueba endpoint PUT /api/products/:id => Permite modificar las propiedades de un producto, en BD', async function(){
          let propMod = {title:`PUT LO DEJAMOS PARA TEST, PREGUNTAR LUEGO`, code: v4()}
          let id = '65f4d3df0508978d41d95457'
          let respuesta = await requester.put(`/api/products/${id}`).send(propMod).set('Cookie', `CookieUser=${token}`)
          expect(respuesta.statusCode).to.be.equal(200)
          expect(respuesta.ok).to.be.true
        })
/* VAMOS A DEJAR UN PRODUCTO DE PRUEBA EN BD, PARA QUE SE MANTENGA FUNCIONANDDO EL PUT, CON UN PRODUCTO CREADO POR EL USER DE TESTING. LUEGO PREGUNTAMOS CMO LO SOLUCIONO EL RESTO. */
        it('Prueba endpoint DELETE /api/products/:id => Permite eliminar un producto. Coloca su dispnibilidad en false.', async function(){
          /* DEBEMOS CREAR UN PRODUCTO E INSERTAR SU ID AQUI ABAO */
        /*   let id =  */
        })
    })
})
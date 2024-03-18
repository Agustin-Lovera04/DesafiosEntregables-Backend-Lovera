import { describe, it, before } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { config } from "../config/config.js";
import { genToken } from "../utils.js";

const requester = supertest("http://localhost:8080");

describe('TESTING A ROUTER DE CARTS', async function() {
    this.timeout(5000); 
    let user = {
        first_name: "Aguss",
        last_name: "Lovera TEST",
        age: 20,
        email: "testing@testing.com",
        password: "wwwPPP",
        rol: "premiun",
    };

      let token
      let productId;
      let cartId

    before(async function() {
        try {
            await mongoose.connect(config.MONGO_URL);
            console.log("BD Online");
        } catch (error) {
            console.log(error.message);
        }

        await requester.post('/api/sessions/registro').send({ ...user });
        token = await genToken(user)
        let resUser = await requester.post(`/user`).send({ email: user.email })
        .set("Cookie", `CookieUser=${token}`);
        cartId = resUser.body.user.cart._id

/*           let product = {
            title: "PRODUCT TESTING SUPERTEST",
            description: "test",
            code: "testPUT",
            price: 22,
            stock: 22,
            category: "test",
          };
          let response = await requester
            .post("/api/products")
            .send(product)
            .set("Cookie", `CookieUser=${token}`);
          productId = response.body.confirmCreateProduct._id; */
    });
    after(async () => {
/*         await mongoose.connection
          .collection("products")
          .deleteMany({ category: "test" }); */
          await mongoose.connection
          .collection("users")
          .deleteMany({ email: "testing@testing.com" });
          await mongoose.connection
          .collection("carts")
          .deleteMany({ title: "Carro de: Lovera TEST" });
          await mongoose.connection
          .collection("carts")
          .deleteMany({ title: "Carrito Supertest" });
      });

  describe("Prueba Router carts", async function () {
    it('Pueba endpoint GET a /carts => Entra a BD y devuelve una vista que muestra todos los carritos recuperados',async function(){
        let respuesta = await requester.get('/carts').set("Cookie", `CookieUser=${token}`)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.ok).to.be.true
    })

    it('Prueba endpoint GET /carts/:id => Recupera un carrito mediante id que llega por params, devuelve una vista del detalle del carrito',async function(){
        let id = "65bea34e1737d7efae6582f1";
      let respuesta = await requester
        .get(`/carts/${id}`)
        .set("Cookie", `CookieUser=${token}`);
      expect(respuesta.statusCode).to.be.equal(200);
      expect(respuesta.ok).to.be.true;
    })

     it('Prueba endpoint POST /api/carts/:cid/product/:pid => Recupera un carrito y un producto, que llega por params, y en caso de darse las condiciones, se agrega el producto a el carrito.', async function(){
        /* HARCODEADO PRODYCTO suzuki */    
        let respuesta = await requester
          .post(`/api/carts/${cartId}/product/6574898c4ba22b2e935dfbc2`)
          .set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(200);
        expect(respuesta.ok).to.be.true;
        expect(respuesta._body.cartMod).exist
    })

    it('Prueba endpoint POST /api/carts => Se envia un titulo y el servidor crea un carrito',async function(){
        /* CREAMOS UN NUEVO USER, YA QUE EL GENERAL ES PREMIUN, Y NO TIENE ACCESO A LA CREACION DE CARRITOS */
        let userADMIN = {
            first_name: "Aguss",
            last_name: "Lovera",
            age: 20,
            email: "testing@testingADMIN.com",
            password: "wwwPPP",
            rol: "Admin",
        };
        let tokenADMIN = await genToken(userADMIN)
        let title= 'Carrito Supertest'
        let respuesta = await requester.post('/api/carts').send({title: title}).set("Cookie", `CookieUser=${tokenADMIN}`);
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.ok).to.be.true
        expect(respuesta._body.CarroCreado).exist
    })
})

/* SEGUIR CON TODOS LOS ENDPOINT

LUEGO AGREGAR VALIDACIONES MAS EXACTAS EN TEST CART,PRODUCT,SESSIONS*/
})
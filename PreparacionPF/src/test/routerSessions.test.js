import {
    describe,
    it,
    before
} from "mocha";
import {
    expect
} from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import {
    config
} from "../config/config.js";
import {
    genToken
} from "../utils.js";

const requester = supertest("http://localhost:8080");

describe('TESTING A ROUTER DE SESSIONS', function () {
    this.timeout(5000);
    let user = {
        first_name: "Aguss",
        last_name: "Lovera TEST",
        age: 20,
        email: "testing@testing.com",
        password: "wwwPPP",
        rol: "premiun",
    };

    before(async function () {
        try {
            await mongoose.connect(config.MONGO_URL);
            console.log("BD Online");
        } catch (error) {
            console.log(error.message);
        }
    });
    after(async function () {
        await mongoose.connection
            .collection("users")
            .deleteMany({
                email: "testing@testing.com"
            });
        await mongoose.connection
            .collection("carts")
            .deleteMany({
                title: "Carro de: Lovera TEST"
            });
    })
    it('Prueba endpoint POST /registro => Registra un usuario en BD, en caso de exito rerige a /login', async function () {
        let respuesta = await requester
            .post('/api/sessions/registro')
            .send({
                ...user
            });
        expect(respuesta.statusCode).to.equal(302);
        expect(respuesta.headers.location).to.equal('/login');
    });

    it('Prueba endpoint POST /login => Registra un usuario en BD, en caso de exito rerige a /current. Adenas genera un token de seguridad que se guarda en cookies.', async function () {
        let datos = {
            email: user.email,
            password: user.password
        }
        let respuesta = await requester.post('/api/sessions/login').send({
            ...datos
        })
        const cookies = respuesta.headers['set-cookie'];
        const cookieFound = cookies.some(cookie => cookie.includes('CookieUser'));

        expect(cookieFound).to.be.true;
        expect(respuesta.statusCode).to.equal(302);
        expect(respuesta.headers.location).to.equal('/current');
    })

    it('Prueba endpoint GET /current => Muestra una vista, donde se observa el perfil del usuario', async function () {
        let token = await genToken(user)
        let respuesta = await requester.get('/current').set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(200);
        expect(respuesta.ok).to.be.true;
    })

    it('Prueba endpoint GET /logout =>Elimina las cookies, Cerrando asi la sesion del usuario, en caso de exito Redirige a vista login.', async function () {
        let token = await genToken(user)
        let respuesta = await requester.get('/api/sessions/logout').set("Cookie", `CookieUser=${token}`);
        expect(respuesta.statusCode).to.be.equal(302)
        expect(respuesta.headers.location).to.equal('/login');
    })
});
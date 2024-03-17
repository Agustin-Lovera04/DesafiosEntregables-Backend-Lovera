import { describe, it, before } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import { config } from "../config/config.js";

const requester = supertest("http://localhost:8080");

describe('TESTING A ROUTER DE SESSIONS', function() {
    this.timeout(5000);
    let user = {
        first_name: "Aguss",
        last_name: "Lovera TEST",
        age: 20,
        email: "testing@testing.com",
        password: "wwwPPP",
        rol: "premiun",
    };

    before(async function() {
        try {
            await mongoose.connect(config.MONGO_URL);
            console.log("BD Online");
        } catch (error) {
            console.log(error.message);
        }
    });

    it('Prueba endpoint POST /registro', async function() {
        try {
            let respuesta = await requester
                .post('/api/sessions/registro')
                .send({ ...user });
            expect(respuesta.statusCode).to.equal(302);
            expect(respuesta.ok).to.be.true;

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    });
});

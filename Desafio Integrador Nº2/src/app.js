import express from "express";
import { engine } from "express-handlebars";
import { router as viewsRouter } from "./router/viewsRouter.js";
import { Server } from "socket.io";
import { router as productManagerRouter } from "./router/products-router.js";
import { router as cartManagerRouter } from "./router/carts-router.js";
import { router as chatManagerRouter } from "./router/chat-router.js";
import { router as sessionsManagerRouter } from "./router/sessions-router.js";
import { __dirname } from "./utils.js";
import { chatManager } from "./dao/managerMongo/chatManager.js";
import sessions from 'express-session'
import mongoStore from 'connect-mongo'
import mongoose from "mongoose";
import { initPassport } from "./config/config.passport.js";
import passport from "passport";
import cookieParser from 'cookie-parser'

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

/* CONFIGURACIONES PASSPORT */

initPassport()
app.use(passport.initialize())

/* COOKIE PARSER-------------------------------------------- */
app.use(cookieParser())

/* CONFIGURAMOS HANDLEBARS */

/* Trabajar con doc Hidratados */
app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);


/* app.engine("handlebars", engine()); */
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);


/* REDIRECCIONES */
app.use("/api/chat", chatManagerRouter);
app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartManagerRouter);
app.use("/api/sessions", sessionsManagerRouter)
app.use("/", viewsRouter);

const serverHTTP = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});

const managerChat = new chatManager();

export const io = new Server(serverHTTP);
io.on("connection", (socket) => {
  console.log(`se conecto cliente id ${socket.id}`);

  socket.on("correoDelUsuario", (newUser) => {
    socket.broadcast.emit("conectUser", newUser);
  });

  socket.on("message", async (datos) => {
    let datosSave = await managerChat.saveMessage(datos);
    io.emit("newMessage", datosSave);
  });
});

/*CONEXION CON MONGOOSE */
try {
  await mongoose.connect(
    "mongodb+srv://AgustinLovera:45507271@cluster0.cmwdqvz.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("BD Online");
} catch (error) {
  console.log(error.message);
}

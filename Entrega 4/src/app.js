import express from 'express';
import { engine } from 'express-handlebars';
import { router as viewsRouter } from './router/viewsRouter.js';
import { Server } from 'socket.io';
import { router as productManagerRouter } from './router/products-router.js';
import { router as cartManagerRouter } from './router/carts-router.js'; 
import { __dirname } from './utils.js';


const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true,})
);
app.use(express.static(`${__dirname}/public`));

/* CONFIGURAMOS HANDLEBARS */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

/* app.get('/', (req,res)=>{
    res.status(200).render('index')
})
 */
/* REDIRECCIONES */
app.use('/api/products', productManagerRouter)
app.use('/api/carts', cartManagerRouter)
app.use('/', viewsRouter)

const serverHTTP=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


export const io = new Server(serverHTTP)
io.on('connection', (socket)=>{
    console.log(`se conecto cliente id ${socket.id}`)
})
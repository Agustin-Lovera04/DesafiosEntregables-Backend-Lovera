    import express from 'express';
    import { engine } from 'express-handlebars';
    import { router as viewsRouter } from './router/viewsRouter.js';
    import { Server } from 'socket.io';
    import { router as productManagerRouter } from './router/products-router.js';
    import { router as cartManagerRouter } from './router/carts-router.js'; 
    import { __dirname } from './utils.js';
    import mongoose from 'mongoose'

    const PORT=8080;

    const app=express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true,})
    );
    app.use(express.static(`${__dirname}/public`));

    /* CONFIGURAMOS HANDLEBARS */

    /* Trabajar con doc Hidratados */
    app.engine('handlebars', engine({
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }))

    /* app.engine("handlebars", engine()); */
    app.set("view engine", "handlebars");
    app.set("views", `${__dirname}/views`);


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

    /*CONEXION CON MONGOOSE */
    try {
        await mongoose.connect('mongodb+srv://AgustinLovera:45507271@cluster0.cmwdqvz.mongodb.net/?retryWrites=true&w=majority')
        console.log('BD Online')
    } catch (error) {
    console.log(error.message)
    }

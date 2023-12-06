import { Router } from 'express';
import { io } from "../app.js";
import {chatsModel} from "../dao/models/chatsModel.js"
import mongoose from "mongoose";
import { chatManager } from '../dao/managerMongo/chatManager.js';
export const router=Router()
const managerChat = new chatManager()


router.get('/',(req,res)=>{
try {
    
    io.on('connection', (socket) =>{
        console.log('conexion en chat, con id;'+ socket.id)
        
        socket.on('correoDelUsuario', (newUser) =>{ 
            socket.broadcast.emit('conectUser', newUser)
        })

        socket.on('message', async(datos) =>{
            let datosSave = await managerChat.saveMessage(datos)
            io.emit('newMessage', datosSave)
        })
    })
    

    res.status(200).render('chat')
} catch (error) {
    return res.status(500).json({error:error.message})   
}
})
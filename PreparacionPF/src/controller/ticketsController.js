import mongoose from "mongoose";


function idValid(id, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      let error = "Ingrese un Id Valido";
      console.log("error al validar");
      return res.status(404).json({ error: error });
    }
  }


  export class TicketController{
    constructor() {}

    
  }
  
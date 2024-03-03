import { CustomError } from "../utils/customError.js";
import { ERRORES_INTERNOS, STATUS_CODES } from "../utils/tiposError.js";
import { userModel } from "./models/usersModel.js";

export class UserDAO {
    constructor(){}

    async getUserById(userId) {
      console.log('entro a Dao')
        let getUser;
        try {
          getUser = await userModel.findOne({ _id: userId })
          console.log("Carrito encontrado por id" + getUser);
          console.log('DAO', getUser);
          return getUser;
        } catch (error) {
          console.log("No se encontro usuario con Id:" + userId);
          return CustomError.CustomError('NO SE ENCONTRO USUARIO', 'NO SE ENCONTRO USUARIO', STATUS_CODES.ERROR_DATOS_ENVIADOS, ERRORES_INTERNOS.OTROS)
        }
      }

      async changeRol(user,rol){
        let id = user._id
        try {
          let userMod = await userModel.updateOne({_id: id}, {rol: rol})
          if (userMod.modifiedCount > 0) {
            console.log("Modificado");
            return userMod;
          } else {
            console.log("Ningún campo fue modificado");
            return null;
          }
        } catch (error) {
          return CustomError.CustomError('ERROR', 'ERROR AL MODIFICAR', STATUS_CODES.ERROR_DATOS_ENVIADOS, ERRORES_INTERNOS.OTROS)  
        }
      }
}
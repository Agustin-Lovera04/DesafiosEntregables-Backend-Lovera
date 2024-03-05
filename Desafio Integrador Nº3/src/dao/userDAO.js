import { hashearPass } from "../utils.js";
import { CustomError } from "../utils/customError.js";
import { ERRORES_INTERNOS, STATUS_CODES } from "../utils/tiposError.js";
import { userModel } from "./models/usersModel.js";
import bcrypt from "bcrypt";

export class UserDAO {
  constructor() {}

  async getUserById(userId) {
    console.log("entro a Dao");
    let getUser;
    try {
      getUser = await userModel.findOne({ _id: userId });
      console.log("Carrito encontrado por id" + getUser);
      console.log("DAO", getUser);
      return getUser;
    } catch (error) {
      console.log("No se encontro usuario con Id:" + userId);
      return CustomError.CustomError(
        "NO SE ENCONTRO USUARIO",
        "NO SE ENCONTRO USUARIO",
        STATUS_CODES.ERROR_DATOS_ENVIADOS,
        ERRORES_INTERNOS.OTROS
      );
    }
  }

  async changeRol(user, rol) {
    let id = user._id;
    try {
      let userMod = await userModel.updateOne({ _id: id }, { rol: rol });
      if (userMod.modifiedCount > 0) {
        console.log("Modificado");
        return userMod;
      } else {
        console.log("Ningún campo fue modificado");
        return null;
      }
    } catch (error) {
      return CustomError.CustomError(
        "ERROR",
        "ERROR AL MODIFICAR",
        STATUS_CODES.ERROR_DATOS_ENVIADOS,
        ERRORES_INTERNOS.OTROS
      );
    }
  }

  async getUser(email) {
    try {
      console.log("llego a dao");
      let user = await userModel.findOne({ email });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return CustomError.CustomError(
        "ERROR",
        "ERROR AL RECUPERAR USER",
        STATUS_CODES.ERROR_DATOS_ENVIADOS,
        ERRORES_INTERNOS.OTROS
      );
    }
  }

  async updatePassUser(pass, email) {
    try {
      console.log('ENTRO UPDATE')
      let user = await this.getUser(email);
      if (!user) {
        return null
        
      }
      console.log('PASO USERRR')
      console.log(user)
      let hashPass = await hashearPass(pass);
      if (!hashPass) {
        return CustomError.CustomError(
          "ERROR",
          "ERROR AL HASHEAR PASS",
          STATUS_CODES.ERROR_DATOS_ENVIADOS,
          ERRORES_INTERNOS.OTROS
        );
      }
      if (bcrypt.compareSync(pass, user.password)) {
        console.log('REBOTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
        return CustomError.CustomError(
          "ERROR",
          "UTILIZO UNA CONTRASEÑA REGISTRADA ANTERIORMENTE",
          STATUS_CODES.ERROR_DATOS_ENVIADOS,
          ERRORES_INTERNOS.OTROS
        );
      }

      let updatedUser = await userModel.updateOne(
        { email: email },
        { password: hashPass }
      );
      if (!updatedUser) {
        return CustomError.CustomError(
          "ERROR",
          "ERROR AL MODIFICAR PASS DE USER",
          STATUS_CODES.ERROR_DATOS_ENVIADOS,
          ERRORES_INTERNOS.OTROS
        );
      }

      return updatedUser;
    } catch (error) {
      return CustomError.CustomError(
        "ERROR",
        "ERROR AL MODIFICAR PASS DE USER",
        STATUS_CODES.ERROR_DATOS_ENVIADOS,
        ERRORES_INTERNOS.OTROS
      );
    }
  }
}

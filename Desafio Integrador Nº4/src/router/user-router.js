import {
    Router
  } from "express";
  import multer from "multer";
  import { passportCall, securityAcces } from "../utils.js";
  import { UserController } from "../controller/userController.js";
  import { __dirname } from "../utils.js";
  export const router = Router();
  const upload = multer()

/* Ver despues si podemos solcionarlo */
/* SE COLOCA EL UPLOAD NONE, PARA QUE NO ESPERE ARCHIVOS. YA QUE LA INFORMACION LA MANDAMOS CON EL FORM DATA */
router.post("/premiun", passportCall('jwt'),upload.none(), securityAcces(["admin", "premiun", "user"]),UserController.changeRol);

/* router.post('/:uid/documents', passportCall('jwt'),securityAcces(["admin", "premiun", "user"]),uploadDocs.single('document'),async (req,res)=>{
  console.log(req.file)
  console.log(req.body)
  return res.status(200).json({payload:"OK"})
}) */
router.post('/:uid/documents', passportCall('jwt'),securityAcces(["admin", "premiun", "user"]),UserController.uploadDocs)

/* router.post('/:uid/profile', passportCall('jwt'),securityAcces(["admin", "premiun", "user"]),uploadProfile.single('profile'),async (req,res)=>{
  console.log(req.file)
  console.log(req.body)
})
router.post('/:uid/product', passportCall('jwt'),securityAcces(["admin", "premiun", "user"]),/* upload.single('product'), async (req,res)=>{
  console.log(req.file)
  console.log(req.body)
}) */
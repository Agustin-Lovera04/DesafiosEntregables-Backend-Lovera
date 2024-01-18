import { Router } from "express";
import { userModel } from "../dao/models/usersModel.js";
import passport from "passport";
import { genToken, hashearPass, passportCall, validPassword } from "../utils.js";
import { MyRouter } from "./router.js";
export const router = Router();


export class SessionsRouter extends MyRouter{
  init(){

    this.post('/registro' , ["public"] , passportCall('register'),(req,res)=>{
        /* res.successNewUser('Registro Exitoso', req.user) */
        res.redirect('/login')
    })


    this.post('/login', ['public'],passportCall('login'), (req,res)=>{



      let token= genToken(req.user)
      res.cookie('CookieUser', token, {httpOnly:true, maxAge: 1000*60*60})
     /*  res.success(`Login Exitoso, Bienvenido ${req.user.first_name} Su rol: ${req.user.rol}`) */
     res.redirect('/current')
    })



    /* RUTA PRUEBA QUE ANDA BIEN LOS PERMISOS, (HASTA QUE PASE TODOS LOS ROUTER AL CUSTOM ROUTER) */
  this.get('/support', ['admin'],(req,res)=>{
    res.success('Servicio de Soporte de pagina, habilitado solo para Administradores!')
  })

  this.get("/github", ['public'],passportCall("github", {}), (req, res) => {});
this.get(
  "/callbackGithub",["public"],
  passportCall("github"),
  (req, res) => {
    let user = req.user;
    let token= genToken(user)
    res.cookie('CookieUser', token, {httpOnly:true, maxAge: 1000*60*60})
    res.redirect("/current");
  }
)

this.get("/logout", ['public'],async (req, res) => {
  res.clearCookie('CookieUser');

  res.redirect("/login");
});
}
}


/* router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/errorRegister",
  }),
  async (req, res) => {
    let { email } = req.body;
    return res.redirect(`/login?message=usuario ${email} registrado`);
  }
);

router.get("/errorRegister", (req, res) => {
  return res.redirect("/register?error=Error en el proceso de registro");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/errorLogin",
  }),
  async (req, res) => {
    req.session.user = {
      nombre: req.user.nombre,
      email: req.user.email,
      rol: req.user.rol,
    };

    res.redirect("/api/products");
  }
);

router.get("/errorLogin", (req, res) => {
  return res.redirect("/login?error=Error en proceso de login");
});

router.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.redirect("/login?error=fallo en el logout");
    }
  });

  res.redirect("/login");
});

router.get("/github", passport.authenticate("github", {}), (req, res) => {});
router.get(
  "/callbackGithub",
  passport.authenticate("github", {
    failureRedirect: "/api/sessions/errorGithub",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/api/products");
  }
);

router.get("/errorGithub", (req, res) => {
  res.status(200).json({
    error: "error en autenticacion con Github",
  });
});


    urlCallback github http://localhost:8080/api/sessions/callbackGithub
    
    App ID: 729877

    Client ID: Iv1.2581244253dcd9ee

    key secret client: 3d422d408c339ba7fca72c0e2e20a697ae67ef35

 
 */
import { Router } from "express";
import { userModel } from "../dao/models/usersModel.js";
import passport from "passport";
import { hashearPass, validPass } from "../utils.js";
export const router = Router();

router.post(
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

/* 
    urlCallback github http://localhost:8080/api/sessions/callbackGithub
    
    App ID: 729877

    Client ID: Iv1.2581244253dcd9ee

    key secret client: 3d422d408c339ba7fca72c0e2e20a697ae67ef35

 */

import express, { Express, Request, Response, Application } from "express";
import session from "express-session";
import { app } from "../index";
import { UserRequestLogin } from "../models/login";
import { UserHash } from "../controllers/UserHash";

app.get("/login", (req: Request, res: Response) => {
  res.render("login", { pageTitle: "Connexion" });
});

export let login: string;
export let password: string;
export let loginIsValid: boolean;
export let loginIsAdmin: boolean;


app.get("/submit-login", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  login = req.query.login as string;
  password = req.query.password as string;
  // class control
  const controlform: boolean = true;

  if (controlform) {
    loginIsValid = false;
    loginIsAdmin = false;

    let userRequestLogin = new UserRequestLogin(login);

    userRequestLogin.logRequest();

    loginIsValid = userRequestLogin.getIsLoginExist() || false;

    if (loginIsValid) {
      // Classe controle Variable
      const passwordExist: boolean = UserHash.verifyPassword(
        password,
        userRequestLogin.getKeyPassword()
      );
      // Si controle ok :
      // Classe controle login et password
      if (passwordExist) {
        req.session.loginIsValid = true;
        const isUserLoggedIn = req.session.loginIsValid || false;

        res.render("home", {
          pageTitle: "Home",
          isUserLoggedIn: isUserLoggedIn,
        });
        if (loginIsAdmin) {
          req.session.loginIsAdmin = true;
        }
      } else {
        res.render("login", {
          pageTitle: "Connexion",
          messagevoid: "mot de passe n'existe pas",
        });
      }
    } else {
      res.render("login", {
        pageTitle: "Connexion",
        messagevoid: "le login n'existe pas",
      });
    }
  } else {
    res.render("login", {
      pageTitle: "Connexion",
      messagevoid: "le login et/ou le mot de passe ne repondent aux critères",
    });
  }
});

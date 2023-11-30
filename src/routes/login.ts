import express, { Express, Request, Response, Application } from "express";
import session from 'express-session';
import { app } from "../index";



app.get("/login", (req: Request, res: Response) => {
  res.render("login", { pageTitle: "Connexion" });
});

export let login: string;
export let password: string;

app.get("/submit-login", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  login = req.query.login as string;
  password = req.query.password as string;

  const loginIsValid: boolean = false;
  const loginIsAdmin: boolean = false;

  // Classe controle Variable

  // Si controle ok :
  // Classe controle login et password

  if (loginIsValid) {
    req.session.loginIsValid = true;
    if (loginIsAdmin) {
      req.session.loginIsAdmin = true;
    }
  }
  const isUserLoggedIn = req.session.loginIsValid || false;

  res.render('home', { pageTitle: 'Home', isUserLoggedIn: isUserLoggedIn });

});

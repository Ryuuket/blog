import express, { Express, Request, Response, Application } from "express";
import { Session } from "express-session";
import { app } from "../index";

// Étendre le type Session avec votre propriété
interface CustomSession extends Session {
  isLogin?: boolean;
}


app.get("/login", (req: Request, res: Response) => {
  res.render("login", { pageTitle: "Connexion" });
});

export let login: string;
export let password: string;

app.get("/submit-login", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  login = req.query.login as string;
  password = req.query.password as string;

  req.session.isLogin = false;

});

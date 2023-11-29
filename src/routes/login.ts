import express, { Express, Request, Response, Application } from "express";
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
});

import express, { Express, Request, Response, Application } from "express";
import { app } from "../index";

app.get("/login", (req: Request, res: Response) => {
  res.render("login", { pageTitle: "Connexion" });
});

app.get("/submit-login", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  const login = req.query.login as string;
  const password = req.query.password as string;
});

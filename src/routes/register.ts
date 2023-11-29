import express, { Express, Request, Response, Application } from "express";
import { app } from "../index";

app.get("/inscription", (req: Request, res: Response) => {
  res.render("register", { pageTitle: "Inscription" });
});

export let password: string;
export let email: string;
export let pseudo: string;
export let lastname: string;
export let firstname: string;
export let confirmation: string;
export let keypassword: string;
export let isAdmin: boolean;

app.get("/submit-register", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  lastname = req.query.lastname as string;
  firstname = req.query.firstname as string;
  pseudo = req.query.pseudo as string;
  email = req.query.email as string;
  password = req.query.password as string;
  confirmation = req.query.confirmation as string;
  isAdmin = false;
  const currentDate: Date = new Date();
  const isValid: boolean = false;


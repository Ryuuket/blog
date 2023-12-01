import express, { Express, Request, Response, Application } from "express";
import { app } from "../index";
import { insertUser } from "../models/register";
import { ControllerUser } from "../controllers/ControllerUsers";
import { UserHash } from "../controllers/UserHash";

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
export let currentDate: Date;
export let isValid: boolean;
export let errors_message: { [key: string]: string };

app.get("/submit-register", async (req: Request, res: Response) => {
  // Récupération des données du formulaire à partir de la requête
  lastname = req.query.lastname as string;
  firstname = req.query.firstname as string;
  pseudo = req.query.pseudo as string;
  email = req.query.email as string;
  password = req.query.password as string;
  confirmation = req.query.confirmation as string;
  isAdmin = false;
  currentDate = new Date();
  errors_message = {};

  // AJOUT DES CLASSES DE CONTROLE
  // ...
  ControllerUser.validateUserInputs();

  if (errors_message.validation === "true") {
    // traitement de la réponse isValid

    keypassword = UserHash.hashPassword(password);

    try {
      await insertUser(currentDate);
      res.render("register", {
        pageTitle: "Inscription Réussie",
        messageSuccess: "Inscription réussie !",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).render("register", {
        pageTitle: "Inscription",
        messageNosuccess: "Erreur lors de l'inscription",
      });
    }
  } else {
    res.status(500).render("register", {
      pageTitle: "Inscription",
      messageNosuccess: "Erreur lors de l'inscription !!",
      messageErrorFirstname: errors_message.firstname,
      messageErrorLastname: errors_message.lastname,
      messageErrorEmail: errors_message.email,
      messageErrorPseudo: errors_message.pseudo,
      messageErrorPassword: errors_message.password,
      messageErrorConfirmation: errors_message.confirmation,
    });
  }
});

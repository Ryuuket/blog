import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';

app.get('/inscription', (req: Request, res: Response) => {
    res.render('register', { pageTitle: 'Inscription' });
});

    export let password: string = "";
    export let email: string = "";
    export let pseudo: string = "";
    export let lastname: string = "";
    export let firstname: string = "";
    export let confirmation : string = "";

app.get('/submit-register', async (req: Request, res: Response) => {
    // Récupération des données du formulaire à partir de la requête
    password = req.query.password as string;
    email = req.query.email as string;
    pseudo = req.query.pseudo as string;
    lastname = req.query.lastname as string;
    firstname = req.query.firstname as string;
    confirmation = req.query.confirmation as string;

});
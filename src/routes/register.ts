import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';

app.get('/inscription', (req: Request, res: Response) => {
    res.render('register', { pageTitle: 'Inscription' });
});

app.get('/submit-register', async (req: Request, res: Response) => {
    // Récupération des données du formulaire à partir de la requête
    const password = req.query.password as string;
    const email = req.query.email as string;
    const pseudo = req.query.pseudo as string;
    const lastname = req.query.lastname as string;
    const firstname = req.query.firstname as string;
    const confirmation = req.query.confirmation as string;


});
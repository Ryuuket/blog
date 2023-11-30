import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';



app.get('/logout', (req: Request, res: Response) => {

    req.session.loginIsValid = false;
    req.session.loginIsAdmin = false;

    const isUserLoggedIn = req.session.loginIsValid || false;

    res.render('home', { pageTitle: 'Home', isUserLoggedIn: isUserLoggedIn });
});
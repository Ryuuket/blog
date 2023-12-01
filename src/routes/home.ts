import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';



app.get('/', (req: Request, res: Response) => {

    const isUserLoggedIn = req.session.loginIsValid || false;
    const isUserAdmin = req.session.loginIsAdmin || false;


    res.render('home', { pageTitle: 'Home', isUserLoggedIn: isUserLoggedIn, isUserAdmin: isUserAdmin });
});
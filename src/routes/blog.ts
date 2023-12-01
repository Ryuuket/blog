import express, { Express, Request, Response, Application } from "express";
import { app } from "../index";
import { ControllerBlog } from "../controllers/ControllerBlog";
import { insertBlog } from "../models/blog";
import client from "../database";


app.get('/createblog', (req: Request, res: Response) => {
    res.render('blog', { pageTitle: 'Blog' });
});


export let title: string;
export let img: string;
export let content: string;
export let login_isValid: boolean;
export let currentDate: Date;
export let isAdmin: boolean;
export let errors_message: string;



app.get("/submit-blog", async (req: Request, res: Response) => {
    // Récupération des données du formulaire à partir de la requête
    title = req.query.title as string;
    img = req.query.img as string;
    content = req.query.content as string;
    login_isValid = true;
    isAdmin = true;
    errors_message = "";
    currentDate = new Date();
    console.log("Data gathered.");

    //AJOUT DES CLASSES CONTROL
    ControllerBlog.validateUserInputs();

    if(login_isValid && isAdmin) {
        console.log("Is Admin.");
        try {
            await insertBlog(currentDate);

            res.render("blog", {
                pageTitle: "createblog",
                messageSuccess: "Blog créé !",
            });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).render("blog", {
              pageTitle: "Blog",
              messageNosuccess: "Erreur lors de la création du blog",
            });
        }
    }



});

app.get('/blogs', async (req, res) => {
    try {
      const result = await client.query('SELECT title FROM blogs');
  
      const blogs = result.rows.map((row: any) => row.title);
      console.log(blogs)
  
      res.render('blogs', { blogs });
    } catch (error) {
      console.error('Erreur lors de la récupération des blogs :', error);
      res.status(500).send('Erreur interne du serveur');
    }
  });




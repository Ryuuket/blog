import express, { Express, Request, Response, Application } from 'express';
import { app } from '../index';
import client from "../database";


app.get('/', async (req: Request, res: Response) => {

    const isUserLoggedIn = req.session.loginIsValid || false;
    const isUserAdmin = req.session.loginIsAdmin || false;
    
    try {
        const result = await client.query('SELECT * FROM blogs');
        const blogs = result.rows.map((row: any) => {
            return {
              id: row.id_blog, // Remplacez "id" par le nom réel de la colonne contenant l'ID dans votre base de données
              title: row.title
            };
          });
          
        res.render('home', { pageTitle: 'Home', isUserLoggedIn: isUserLoggedIn, isUserAdmin: isUserAdmin, blogs });

      } catch (error) {
        console.error('Erreur lors de la récupération des blogs :', error);
        res.status(500).send('Erreur interne du serveur');
      }


});

app.get('/blog', async (req: Request, res: Response) => {
    const blogId = req.query.id as string;
    console.log(blogId);
    try {
      // Utilisez blogId pour récupérer les détails du blog depuis la base de données
      const result = await client.query('SELECT * FROM blogs WHERE id_blog = $1', [blogId]);
console.log(result);
      // Assurez-vous que le blog a été trouvé
      if (result.rows.length > 0) {
        const blogDetails = result.rows[0];
        res.render('blog_ready', { pageTitle: 'Détails du Blog', blogDetails });
        console.log(blogDetails)
      } else {
        res.status(404).send('Blog non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du blog :', error);
      res.status(500).send('Erreur interne du serveur');
    }
  });



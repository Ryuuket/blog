import express, { Express, Request, Response , Application } from 'express';
import {postLogin} from './controllers/login'
import dotenv from 'dotenv';
import client from './database';
import * as crypto from "crypto";

//For env File 
dotenv.config();

const app: Application = express();
const port = 8000;


// Configuration of the Pug rendering engine
app.set('view engine', 'pug');
app.set('views', './src/views')
app.get('/inscription', (req: Request, res: Response) => {
  res.render('index', {pageTitle: 'Inscription'});
});

app.get('/home', (req: Request, res: Response) => {
  res.render('home', {pageTitle: 'Home'});
});
app.get('/login', (req: Request, res: Response) => {
  res.render('login', {pageTitle: 'Connexion'});
});
app.get('/submit-register', async (req, res) => {
  // Récupération des données du formulaire à partir de la requête
  const password = req.query.password as string;
  const email = req.query.email as string;
  const pseudo = req.query.pseudo as string;
  const lastname = req.query.lastname as string;
  const firstname = req.query.firstname as string;
  const confirmation = req.query.confirmation as string;

 // Validation des données avec des regex
 const nameRegex = /^[A-Za-z\-]+$/;
 const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,3}$/;
 const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
 const pseudoRegex = /^[a-zA-Z0-9_]{3,20}$/;

 const errors: { [key: string]: string } = {};
 if (!nameRegex.test(firstname)) {
  errors.firstname = 'The firstname must contain letters';
}

if (!nameRegex.test(lastname)) {
  errors.lastname = 'The lastname must contain letters';
}

if (!pseudoRegex.test(pseudo)) {
  errors.pseudo = 'The pseudo must contain letters, numbers or _ and length between 3, 20 characters';
}

if (!emailRegex.test(email)) {
  errors.email = 'The e-mail is not available.';
}

if (!passwordRegex.test(password)) {
  errors.password = 'The password must contain at least 8 characters, 1 uppercase, 1 lowercase  et 1 special character.';
}

if (password !== confirmation) {
  errors.confirmation = 'Passwords do not match.';
}

if (Object.keys(errors).length > 0) {
  return res.status(400).json({ errors });
}
  // Creating a unique salt for a particular user
  const salt = crypto.randomBytes(16).toString('hex'); 
  // Hash the salt and password with 10000 iterations, 64 length and sha512 digest 
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');


  try {
    const query = 'INSERT INTO formulaire (last_name, first_name, email, pseudo, key_password, is_admin,) VALUES ($1, $2,$3, $4,$5,$6)';
    const values = [firstname, lastname,email, pseudo, hash];

    await client.query(query, values);
    res.send('Données sauvegardées dans la base de données PostgreSQL.');
    
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données :', error);
    res.status(500).send('Erreur lors de la sauvegarde des données.');
  }
  

});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}/home`);
});

app.post('/login', postLogin)

app.get('/submit-login', async (req, res) => {
  // Récupération des données du formulaire à partir de la requête
  const login = req.query.login as string;
  const password = req.query.password as string;


});

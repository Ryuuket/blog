import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = 8000
;

// Configuration of the Pug rendering engine
app.set('view engine', 'pug');
app.set('views', './src/views')
app.get('/inscription', (req: Request, res: Response) => {
  res.render('index', {});
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

import express, { Request, Response } from 'express';
import { checkcredentials } from '../services/regex';
const app = express();
app.use(express());
app.post('/login', async (req: Request, res: Response) => {
try { 
	const { username, password } = req.body;
	const userIsValid = checkCredentials(username, password);
	res.status(200).json({ message: SUCCESS_LOGIN });
} else {
	res.status(401).json({ message: ERROR_LOGIN });
}
} catch (error) {
	res.status(500).json({ message: "Error server" });
}
});



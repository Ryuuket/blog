import db from '../database';
import { UserController } from '../controllers/UserController';

class User{
    static idCount: number;
    
    async register (firstname: string, lastname: string, email: string, pseudo: string, password: string): Promise<boolean> {
        try {
            const values = [firstname, lastname, email, pseudo, UserController.hashPassword(password)];
            const query = 'INSERT INTO formulaire (last_name, first_name, email, pseudo, key_password, is_admin,) VALUES ($1, $2,$3, $4,$5,$6)';
        
            await db.query(query, values);
            
          } catch (error) {
            console.error('Erreur lors de la sauvegarde des données :', error);
            return false
          }
        return true;
    };
}

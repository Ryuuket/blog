import * as crypto from "crypto";

class Users {
    // Creating a random salt
    static salt: string = "ya64hs"; 
    
    // Hash the salt and password with 10000 iterations, 64 length and sha512 digest
    static hashPassword(password: string): string {
        const hash: string = crypto.pbkdf2Sync(password, Users.salt, 10000, 64, 'sha512').toString('hex');
    
        return hash;
    }

}
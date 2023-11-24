import * as crypto from "crypto";

function hashPassword(password: string): string {

    // Creating a random salt
    const salt: string = "ya64hs"; 
    
    // Hash the salt and password with 10000 iterations, 64 length and sha512 digest 
    const hash: string = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return hash;

}
import {
    login,
    password
} from "../routes/login";
import client from "../database";

export async function reqlog (): Promise<void> {
    try {
        const query =
            "SELECT ID_USER FROM users WHERE email = $1 or pseudo = $1"
        const values = [
            login,
        ];

        await client.query(query, values, (error: string , results: string) => {
            if (error) throw error;
            console.log(results);
            if (results.length > 0) {
                console.log('User with this email or pseudo already exists.');
            } else {
                console.log('User with this email and pseudo does not exist.');
            }

            client.end();
        });






        //await client.query(query, values);

        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
        throw error; // Propager l'erreur pour la gérer dans la route
    }
}

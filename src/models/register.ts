import {
  email,
  pseudo,
  lastname,
  firstname,
  keypassword,
  isAdmin,
  currentDate,
} from "../routes/register";
import client from "../database";

export async function insertData(currentDate: Date): Promise<void> {
  try {
    const query =
      "INSERT INTO users (first_name, last_name, email, pseudo, key_password, is_admin, date_create) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [
      firstname,
      lastname,
      email,
      pseudo,
      keypassword,
      isAdmin,
      currentDate,
    ];

    await client.query(query, values);

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error; // Propager l'erreur pour la gérer dans la route
  }
}

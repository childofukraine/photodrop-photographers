import { eq } from "drizzle-orm";
import db from "../db/database";
import { photosTable } from "../db/schema";
import { NewPhoto } from "../types";

const { database } = db;

export class PhotoRepository {
  static async savePhoto(newPhoto: NewPhoto): Promise<void> {
    try {
      await database.insert(photosTable).values(newPhoto);
    } catch (err) {
      console.log(err);
    }
  }
}

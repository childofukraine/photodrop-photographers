import { eq } from "drizzle-orm";
import db from "../db/database";
import { Album, albumsTable, photosTable } from "../db/schema";
import { AlbumWithPhotos } from "../types";

const { database } = db;

export class AlbumRepository {
  static async saveAlbum(newAlbum: Album): Promise<void> {
    await database.insert(albumsTable).values(newAlbum);
  }

  static async getAlbumWithPhotosById(
    id: string
  ): Promise<AlbumWithPhotos | null> {
    const albumWithPhotos = await database
      .select()
      .from(albumsTable)
      .leftJoin(photosTable, eq(photosTable.albumId, albumsTable.albumId))
      .where(eq(albumsTable.albumId, id));
    if (!albumWithPhotos.length) return null;

    const album: AlbumWithPhotos = albumWithPhotos.map(
      (data) => data.pd_albums
    )[0];
    if (!albumWithPhotos[0].pd_photos?.photoId) {
      album.photos = [];
      return album;
    }
    album.photos = albumWithPhotos.map((data) => data.pd_photos!);
    return album;
  }

  static async getAllAlbumsByUserId(id: string): Promise<Album[] | null> {
    const albums = await database
      .select()
      .from(albumsTable)
      .where(eq(albumsTable.userId, id));
    if (!albums.length) return null;
    return albums;
  }
}

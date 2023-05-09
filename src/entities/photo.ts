export class Photo {
  photoId: string;

  albumId: string;

  lockedThumbnailUrl: string;

  lockedPhotoUrl: string;

  unlockedThumbnailUrl: string;

  unlockedPhotoUrl: string;

  clients: string;

  constructor(
    photoId: string,
    albumId: string,
    lockedThumbnailUrl: string,
    lockedPhotoUrl: string,
    unlockedThumbnailUrl: string,
    unlockedPhotoUrl: string,
    clients: string
  ) {
    this.photoId = photoId;
    this.albumId = albumId;
    this.lockedThumbnailUrl = lockedThumbnailUrl;
    this.lockedPhotoUrl = lockedPhotoUrl;
    this.unlockedThumbnailUrl = unlockedThumbnailUrl;
    this.unlockedPhotoUrl = unlockedPhotoUrl;
    this.clients = clients;
  }
}

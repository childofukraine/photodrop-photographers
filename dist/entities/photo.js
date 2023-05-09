"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
class Photo {
    constructor(photoId, albumId, lockedThumbnailUrl, lockedPhotoUrl, unlockedThumbnailUrl, unlockedPhotoUrl, clients) {
        this.photoId = photoId;
        this.albumId = albumId;
        this.lockedThumbnailUrl = lockedThumbnailUrl;
        this.lockedPhotoUrl = lockedPhotoUrl;
        this.unlockedThumbnailUrl = unlockedThumbnailUrl;
        this.unlockedPhotoUrl = unlockedPhotoUrl;
        this.clients = clients;
    }
}
exports.Photo = Photo;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
class Album {
    constructor(albumId, name, location, createdAt, userId) {
        this.albumId = albumId;
        this.name = name;
        this.location = location;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}
exports.Album = Album;

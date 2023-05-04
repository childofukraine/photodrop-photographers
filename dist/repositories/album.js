"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = __importDefault(require("../db/database"));
const schema_1 = require("../db/schema");
const { database } = database_1.default;
class AlbumRepository {
    static saveAlbum(newAlbum) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database.insert(schema_1.albumsTable).values(newAlbum);
        });
    }
    static getAlbumWithPhotosById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const albumWithPhotos = yield database
                .select()
                .from(schema_1.albumsTable)
                .leftJoin(schema_1.photosTable, (0, drizzle_orm_1.eq)(schema_1.photosTable.albumId, schema_1.albumsTable.albumId))
                .where((0, drizzle_orm_1.eq)(schema_1.albumsTable.albumId, id));
            if (!albumWithPhotos.length)
                return null;
            const album = albumWithPhotos.map((data) => data.pd_albums)[0];
            if (!((_a = albumWithPhotos[0].pd_photos) === null || _a === void 0 ? void 0 : _a.photoId)) {
                album.photos = [];
                return album;
            }
            album.photos = albumWithPhotos.map((data) => data.pd_photos);
            return album;
        });
    }
    static getAllAlbumsByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const albums = yield database
                .select()
                .from(schema_1.albumsTable)
                .where((0, drizzle_orm_1.eq)(schema_1.albumsTable.userId, id));
            if (!albums.length)
                return null;
            return albums;
        });
    }
}
exports.AlbumRepository = AlbumRepository;

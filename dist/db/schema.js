"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.photosTable = exports.albumsTable = exports.sessionsTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)("pd_users", {
    login: (0, pg_core_1.text)("login").notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    userId: (0, pg_core_1.text)("user_id").notNull().primaryKey(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    fullName: (0, pg_core_1.text)("full_name"),
    email: (0, pg_core_1.text)("email"), // optional email
});
exports.sessionsTable = (0, pg_core_1.pgTable)("pd_sessions", {
    sessionId: (0, pg_core_1.text)("session_id").notNull().primaryKey(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.usersTable.userId),
    refreshToken: (0, pg_core_1.text)("refresh_token").notNull(),
    expiresIn: (0, pg_core_1.timestamp)("expires_in").notNull(),
});
exports.albumsTable = (0, pg_core_1.pgTable)("pd_albums", {
    albumId: (0, pg_core_1.text)("album_id").notNull().primaryKey(),
    name: (0, pg_core_1.text)("name"),
    location: (0, pg_core_1.text)("location"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    userId: (0, pg_core_1.text)("user_id")
        .notNull()
        .references(() => exports.usersTable.userId), // ref to users
});
exports.photosTable = (0, pg_core_1.pgTable)("pd_photos", {
    photoId: (0, pg_core_1.text)("photo_id").notNull().primaryKey(),
    unlockedPhotoUrl: (0, pg_core_1.text)("unlocked_photo_url").notNull(),
    unlockedThumbnailUrl: (0, pg_core_1.text)("unlocked_thumbnail_url").notNull(),
    lockedPhotoUrl: (0, pg_core_1.text)("locked_photo_url").notNull(),
    lockedThumbnailUrl: (0, pg_core_1.text)("locked_thumbnail_url").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    albumId: (0, pg_core_1.text)("album_id")
        .notNull()
        .references(() => exports.albumsTable.albumId),
    clients: (0, pg_core_1.text)("clients"),
});

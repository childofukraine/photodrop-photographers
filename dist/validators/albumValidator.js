"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const boom_1 = __importDefault(require("@hapi/boom"));
class AlbumValidator {
}
exports.AlbumValidator = AlbumValidator;
AlbumValidator.createAlbumBody = (req, res, next) => {
    var _a, _b;
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        location: joi_1.default.string().required(),
        datapicker: joi_1.default.string().required(),
    });
    try {
        const value = schema.validate(req.body);
        if ((_a = value.error) === null || _a === void 0 ? void 0 : _a.message)
            throw boom_1.default.badData((_b = value.error) === null || _b === void 0 ? void 0 : _b.message);
        next();
    }
    catch (err) {
        next(err);
    }
};
AlbumValidator.uploadPhotosToAlbumBody = (req, res, next) => {
    var _a, _b, _c, _d;
    const bodySchema = joi_1.default.object({
        clients: joi_1.default.string().required(),
        album: joi_1.default.string().required(),
    });
    const fileSchema = joi_1.default.array().required().label("files");
    try {
        const valueBody = bodySchema.validate(req.body);
        if ((_a = valueBody.error) === null || _a === void 0 ? void 0 : _a.message)
            throw boom_1.default.badData((_b = valueBody.error) === null || _b === void 0 ? void 0 : _b.message);
        const valueFile = fileSchema.validate(req.files);
        if ((_c = valueFile.error) === null || _c === void 0 ? void 0 : _c.message)
            throw boom_1.default.badData((_d = valueFile.error) === null || _d === void 0 ? void 0 : _d.message);
        next();
    }
    catch (err) {
        next(err);
    }
};

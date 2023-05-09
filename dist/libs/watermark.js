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
exports.watermark = void 0;
const sharp_1 = __importDefault(require("sharp"));
const watermark = (waterMarkTemplate, file) => __awaiter(void 0, void 0, void 0, function* () {
    const meta = yield (0, sharp_1.default)(file).metadata();
    const wmH = parseInt((meta.height * 0.41).toFixed(), 10);
    const wmImage = yield (0, sharp_1.default)(waterMarkTemplate)
        .resize(null, wmH)
        .png()
        .toBuffer();
    const newFile = yield (0, sharp_1.default)(file)
        .composite([
        {
            input: wmImage,
        },
    ])
        .toFormat("png")
        .toBuffer();
    return newFile;
});
exports.watermark = watermark;

import Joi from "joi";
import Boom from "@hapi/boom";
import { RequestHandler } from "express";

export class AlbumValidator {
  static createAlbumBody: RequestHandler = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      location: Joi.string().required(),
      datapicker: Joi.string().required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  //   static uploadPhotosToAlbumBody: RequestHandler = (req, res, next) => {
  //     const bodySchema = Joi.object({
  //       clients: Joi.string().required(),
  //       album: Joi.string().required(),
  //     });

  //     const fileSchema = Joi.array().required().label("files");

  //     try {
  //       const valueBody = bodySchema.validate(req.body);
  //       if (valueBody.error?.message)
  //         throw Boom.badData(valueBody.error?.message);

  //       const valueFile = fileSchema.validate(req.files);
  //       if (valueFile.error?.message)
  //         throw Boom.badData(valueFile.error?.message);

  //       next();
  //     } catch (err) {
  //       next(err);
  //     }
  //   };
}

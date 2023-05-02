import Joi from "joi";
import Boom from "@hapi/boom";
import { RequestHandler } from "express";

export class AuthValidator {
  static checkLoginBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      login: Joi.string()
        .pattern(/^[a-zA-Z_`]/)
        .required(),
      password: Joi.string().alphanum().required(),
    });

    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static checkSignUpBody: RequestHandler = (req, _res, next) => {
    const schema = Joi.object({
      login: Joi.string()
        .pattern(/^[a-zA-Z_]+$/, { name: "letters and underscore" })
        .required(),
      password: Joi.string().alphanum().required(),
      email: Joi.string(),
      fullName: Joi.string(),
    });
    try {
      const value = schema.validate(req.body);
      if (value.error?.message) throw Boom.badData(value.error.message);
      next();
    } catch (err) {
      next(err);
    }
  };

  static checkCookies: RequestHandler = (req, _res, next) => {
    try {
      const schema = Joi.object({
        refreshToken: Joi.string().required(),
      });

      const value = schema.validate(req.cookies);
      if (value.error?.message) throw Boom.badData(value.error?.message);
      next();
    } catch (err) {
      next(err);
    }
  };
}

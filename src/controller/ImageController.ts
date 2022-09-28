import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';
import enums from '../@types/enums';

export default class ImageController {
  async process(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        type: Joi.string()
          .valid(...enums.requestType.all)
          .required(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        params: Joi.string().required(),
      });
      await schema.validateAsync(req.body);

      const { type, height, width, params } = req.body;

      return res.json({});
    } catch (error: any) {
      return next(createHttpError(400, error.message));
    }
  }
}

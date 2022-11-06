import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Joi from 'joi';
import enums from '../@types/enums';
import RequestManager from '../lib/RequestManager';

export default class ScrapController {
  async fetch(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        type: Joi.string()
          .valid(...enums.websiteTypes.all)
          .required(),
        url: Joi.string().required(),
      });
      await schema.validateAsync(req.body);

      const url = req.body.url as string;
      const type = req.body.type as string;

      let data = await RequestManager.getContent(url);
      

      return res.json(data);
    } catch (error: any) {
      return next(createHttpError(400, error.message));
    }
  }
}

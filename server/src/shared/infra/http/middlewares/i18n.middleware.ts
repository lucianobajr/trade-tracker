import { Request, Response, NextFunction } from 'express';
import i18n from 'i18next';

interface CustomRequest extends Request {
  t: (key: string) => string;
}

const i18nMiddleware = (): ((req: CustomRequest, res: Response<any, Record<string, any>>, next: NextFunction) => void) => {
  return (req: CustomRequest, res: Response<any, Record<string, any>>, next: NextFunction): void => {
    req.t = (key: string) => i18n.t(key);
    next();
  };
};

export default i18nMiddleware;
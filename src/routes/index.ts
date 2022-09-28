import { Router, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import config from "../config";
import ImageController from "../controller/ImageController";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    let access_token = req.headers.authorization ? req.headers.authorization : req.headers.Authorization ? (req.headers.Authorization as string) : "";
    if (access_token.length > 0) {
        for (let at of config.API_ACCESS_TOKEN) {
            if (access_token == at || access_token == `Bearer ${at}`) {
                return next();
            }
        }
    }
    next(createHttpError(401));
};

const router = Router();
const imageController = new ImageController();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

router.post("/process", isAuthenticated, imageController.process);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    res.status(status).json({
        hasError: true,
        statusCode: status,
        message: message,
        errors: err.data,
    });
});

export default router;

import express from 'express';
import authRouter from './auth';
import { errorHandler } from "../../middlewares";

const apiRouter = express.Router();

apiRouter.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
});


apiRouter.use('/auth', authRouter);
apiRouter.use(errorHandler);

export default apiRouter;

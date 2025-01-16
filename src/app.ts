import express from "express";
import morgan from 'morgan'
import { authRouter } from "./routes/auth/auth";
import { urlRouter } from "./routes/url/url";
import { analyticRouter } from "./routes/analytics/analytics";
import { errorHandler } from "./middlwares/errorHandler";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/v1/user/',authRouter)
app.use('/api/v1/url/',urlRouter)
app.use('/api/v1/analytics/',analyticRouter)
app.use('/',urlRouter)
app.use(errorHandler) 

export { app };

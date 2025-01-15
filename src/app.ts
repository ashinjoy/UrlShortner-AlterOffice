import express from "express";
import morgan from 'morgan'
import { authRouter } from "./routes/auth/auth";
import { urlRouter } from "./routes/url/url";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/v1/user/',authRouter)
app.use('/api/v1/url/',urlRouter)

export { app };

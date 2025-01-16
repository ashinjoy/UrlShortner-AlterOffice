import express from "express";
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'

import { authRouter } from "./routes/auth/auth";
import { urlRouter } from "./routes/url/url";
import { analyticRouter } from "./routes/analytics/analytics";
import { errorHandler } from "./middlwares/errorHandler";
// import { swaggerSpec, swaggerUi } from "./config/swagger";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'))
const swaggerDoc = YAML.load('./api-docs/swagger.yaml')
app.set("trust proxy", true);
app.use('/api/v1/user/',authRouter)
app.use('/api/v1/url/',urlRouter)
app.use('/api/v1/analytics/',analyticRouter)
app.use('/',urlRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use(errorHandler) 

export { app };

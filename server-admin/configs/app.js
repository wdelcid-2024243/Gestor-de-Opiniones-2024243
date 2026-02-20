import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "mongo-sanitize";

import { corsOptions } from "./cors.configuration.js";
import { helmetOptions } from "./helmet.configuration.js";
import { apiLimiter } from "./rateLimit.configuration.js";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(morgan("dev"));
app.use(apiLimiter);

app.use((req, _res, next) => {
  mongoSanitize(req.body);
  mongoSanitize(req.params);
  mongoSanitize(req.query);
  next();
});

export default app;
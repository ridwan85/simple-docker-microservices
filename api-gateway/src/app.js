import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/notifications", indexRouter);
app.use("/", (req, res, next) => {
  return res.send({
    health: 100,
    message: "API IS WORKING FINE"
  });
});

export default app;

import express from "express";
var router = express.Router();
var notificationsRouter = require("./notificationsService");

router.use((req, res, next) => {
  console.log("Called: ", req.path);
  next();
});

router.use(notificationsRouter);

module.exports = router;

import express from "express";
var router = express.Router();
var membersRouter = require("./membersService");
var commentsRouter = require("./commentsService");

router.use((req, res, next) => {
  console.log("Called: ", req.path);
  next();
});

router.use(membersRouter);
router.use(commentsRouter);

module.exports = router;

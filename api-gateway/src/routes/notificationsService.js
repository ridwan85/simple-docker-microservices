import express from "express";
import { config } from "dotenv";
config();
const apiAdapter = require("./apiAdapter");
const BASE_URL = "http://notifications:3000";
const api = apiAdapter(BASE_URL);

const router = express.Router();

router.post("/email/:provider", (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/sms/:provider", (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

router.get("/all", (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

module.exports = router;

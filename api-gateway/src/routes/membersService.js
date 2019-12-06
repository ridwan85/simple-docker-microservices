import express from "express";
import { config } from "dotenv";
config();
const apiAdapter = require("./apiAdapter");
const BASE_URL = "http://members:3001";
const api = apiAdapter(BASE_URL);

const router = express.Router();

router.get("/:orgname/members", (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

module.exports = router;

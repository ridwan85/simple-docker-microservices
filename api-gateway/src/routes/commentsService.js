import express from "express";
import { config } from "dotenv";
config();
const apiAdapter = require("./apiAdapter");
const BASE_URL = "http://comments:3000";
const api = apiAdapter(BASE_URL);

const router = express.Router();

router.get("/:orgname/comments", (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data);
  });
});

router.post("/:orgname/comments", (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data);
  });
});

///soft delete
router.delete("/:orgname/comments", (req, res) => {
  api.delete(req.path).then(resp => {
    res.send(resp.data);
  });
});

///hard delete
router.delete("/:orgname/comments/:id", (req, res) => {
  api.delete(req.path).then(resp => {
    res.send(resp.data);
  });
});

module.exports = router;

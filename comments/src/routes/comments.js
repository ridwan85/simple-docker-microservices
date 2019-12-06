import express from "express";
import { graphql } from "@octokit/graphql";
import mongoose from "mongoose";
import { config } from "dotenv";
config();
const Comments = mongoose.model("Comments");
const router = express.Router();
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`
  }
});

/// return comments for organisation name debug mode
router.get("/:orgname/comments/debug", (req, res, next) => {
  let org_name = req.params.orgname;
  try {
    Comments.find(
      { organisationName: org_name },
      "_id comments organisationName deleteStatus updatedAt"
    ).then(results => {
      if (results.length < 1) {
        return res.json({
          statusCode: 404,
          message: `No comments for the organisation ${req.params.orgname}`,
          type: "NOT_FOUND"
        });
      }
      return res.json({
        statusCode: 200,
        data: results
      });
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      message: err.errors[0]["message"],
      type: err.errors[0]["type"]
    });
  }
});

///retrieve comments by organisation name
router.get("/:orgname/comments", (req, res, next) => {
  let org_name = req.params.orgname;
  try {
    Comments.find(
      { organisationName: org_name, deleteStatus: 0 },
      "_id comments organisationName updatedAt"
    ).then(results => {
      if (results.length < 1) {
        return res.json({
          statusCode: 404,
          message: `No comments for the organisation ${req.params.orgname}`,
          type: "NOT_FOUND"
        });
      }
      return res.json({
        statusCode: 200,
        data: results
      });
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      message: err.errors[0]["message"],
      type: err.errors[0]["type"]
    });
  }
});

//create a comment
router.post("/:orgname/comments", (req, res, next) => {
  let org_name = req.params.orgname;
  //validate if organisation is a valid github organisation
  const create = async _ => {
    try {
      await graphqlWithAuth(`
          query { 
              organization (login : "${org_name}") { 
              name
              }
          }
        `);

      try {
        let comments = {
          organisationName: req.params.orgname,
          comments: req.body.comments,
          deleteStatus: 0
        };
        Comments.create(comments).then(results => {
          return res.json({
            statusCode: 201,
            message: "Data created",
            createdData: results
          });
        });
      } catch (err) {
        return res.json({
          statusCode: 500,
          message: err.errors[0]["message"],
          type: err.errors[0]["type"]
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        statusCode: 500,
        message: err.errors[0]["message"],
        type: err.errors[0]["type"]
      });
    }
  };

  create();
});

/// soft delete
router.delete("/:orgname/comments", (req, res, next) => {
  let org_name = req.params.orgname;

  try {
    Comments.updateMany(
      { organisationName: org_name },
      {
        deleteStatus: 1
      }
    ).then(results => {
      return res.json({
        statusCode: 200,
        message: "Data deleted",
        deletedData: results
      });
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      message: err.errors[0]["message"],
      type: err.errors[0]["type"]
    });
  }
});

/// hard delete ( permanently delete comments)
router.delete("/:orgname/comments/:id", (req, res, next) => {
  let id = req.params.id;

  try {
    Comments.findOneAndRemove({ _id: id }).then(results => {
      return res.json({
        statusCode: 200,
        message: "Data deleted",
        deletedData: results
      });
    });
  } catch (err) {
    return res.json({
      statusCode: 500,
      message: err.errors[0]["message"],
      type: err.errors[0]["type"]
    });
  }
});

module.exports = router;

"use strict";
require("dotenv").config();
const chai = require("chai");
const port = process.env.API_PORT;
const url = `http://localhost:${port}/api/v1/`;
const request = require("supertest")(url);
const should = require("chai").should();

describe("comments", () => {
  // Tests
  it("Returns comments in an organisation", done => {
    request
      .get("orgs/xendit/comments")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it("Create comments in an organisation", done => {
    request
      .post("orgs/xendit/comments")
      .send({
        comments: "Unit test to create comments in an organisation"
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it("Delete all comments in an organisation", done => {
    request
      .delete("orgs/xendit/comments")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });
});

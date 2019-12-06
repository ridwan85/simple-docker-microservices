"use strict";
require("dotenv").config();
const chai = require("chai");
const port = process.env.API_PORT;
const url = `http://localhost:${port}/api/v1/`;
const request = require("supertest")(url);
const should = require("chai").should();

describe("members", () => {
  // Tests
  it("Returns members in an organisation", done => {
    request
      .get("orgs/xendit/members")
      .expect(200)
      .end((err, res) => {
        // res will contain data for one owner
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });
});

import express from "express";
import { graphql } from "@octokit/graphql";
import { config } from "dotenv";
config();
const router = express.Router();
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`
  }
});

router.get("/:orgname/members", function(req, res, next) {
  let org_name = req.params.orgname;

  const query = async _ => {
    try {
      const members = await graphqlWithAuth(`
        query { 
            organization (login : "${org_name}") { 
            name
            membersWithRole(first:100){
                nodes {
                login
                avatarUrl
                followers{
                    totalCount
                }
                following {
                    totalCount
                }
                }
            }
            
            }
        }
        `);
      let data = members.organization.membersWithRole.nodes;
      if (data.length < 1) {
        return res.json({
          statusCode: 404,
          message: "No members for the organisation",
          type: "NOT_FOUND"
        });
      }
      let unsortedData = [];
      for (const i of data) {
        unsortedData.push({
          login: i.login,
          avatar_url: i.avatarUrl,
          totalFollowers: i.followers.totalCount,
          totalFollowing: i.following.totalCount
        });
      }
      let sortedData = unsortedData.sort((a, b) => {
        return b.totalFollowers - a.totalFollowers;
      });

      return res.json({
        statusCode: 200,
        data: sortedData
      });
    } catch (err) {
      console.log(err);
      if (err.errors) {
        return res.json({
          statusCode: 500,
          message: err.errors[0]["message"],
          type: err.errors[0]["type"]
        });
      } else {
        return res.json({
          statusCode: 401,
          message: "Token redacted",
          type: "UNAUTHORISED ACCESS"
        });
      }
    }
  };

  query();
});

module.exports = router;

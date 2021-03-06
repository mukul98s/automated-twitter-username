const Twitter = require("twitter-lite");

const twitterClient = new Twitter({
  subdomain: "api", // we are using twitter api
  version: "1.1", // twitter api version 1.1
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const myname = "Mukul Sharma";

module.exports = (req, res) => {
  let httpResponse = res;
  twitterClient
    .get("account/verify_credentials")
    .then((res) => {
      if (!res) {
        httpResponse.status(500).send("Error fetching Twitter Client");
      }
      const followerCount = res.followers_count;

      const userName = `${myname} and ${followerCount} Others`;
      console.log(userName);
      return userName;
    })
    .then((user_name) => {
      const response = twitterClient.post("account/update_profile", {
        name: user_name,
      });

      response
        .then((res) => {
          if (!res) {
            httpResponse.status(500).send("Update error");
          } else {
            httpResponse.status(200).send(`Update ${user_name} Success!`);
          }
        })
        .catch((err) => {
          httpResponse.status(500).send(err);
        });
    })
    .catch((err) => {
      httpResponse.status(500).send(err);
    });
};

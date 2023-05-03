const { TwitterApi } = require("twitter-api-v2");
const config = require("config");

// twitter client
const client = new TwitterApi(config.get("TWITTER_CRED"));

const twitterClient = client.readWrite;

module.exports = twitterClient;

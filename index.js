const { Configuration, OpenAIApi } = require("openai");
const config = require("config");
const twitterClient = require("./utils/twitterClient");

// openAi client
const configuration = new Configuration({
  apiKey: config.get("OPENAI_API_KEY"),
});
const openai = new OpenAIApi(configuration);

const prompt = config.get("PROMPT");

/**
 * current trending topic
 * @params none
 * @returns current trending topic in twitter
 */
const getTrendingTopic = async () => {
  let completion;
  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    });
  } catch (error) {
    console.log(`openAI call failed in getTrendingTopic function`, error);
  }
  const topic = completion.data.choices[0].text;
  console.log(`right now trending topic ${topic}`);
  return topic;
};

/**
 * finds tweet
 * @params topic
 * @returns tweet on trending topic
 */
const getTweetOnTopic = async (topic) => {
  console.log(`generting tweet on ${topic} topic`);
  let completion;
  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `give me a good, creative, positive, engaging tweet with trending hastags on '${topic}' topic `,
      max_tokens: 100,
      n: 1,
    });
  } catch (error) {
    console.log(`openAI call failed in getTweetOnTopic function`, error);
  }
  const resp = completion.data.choices[0].text;
  console.log(`tweet generated:--> ${resp}`);
  return resp;
};

/**
 * tweet on behalf of user
 * @params tweet
 * @returns none
 */
const tweet = async (message) => {
  try {
    const topic = getTrendingTopic();
    const tweetMessage = getTweetOnTopic(topic);
    const resp = await twitterClient.v2.tweet(tweetMessage);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};

tweet();

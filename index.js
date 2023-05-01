const { Configuration, OpenAIApi } = require("openai");
const config = require("config");

const configuration = new Configuration({
  apiKey: config.get("OPENAI_API_KEY"),
});
const openai = new OpenAIApi(configuration);

const prompt =
  "give me a most trending topic on twitter right now in software engineering";

const getTrendingTopic = async () => {
  let completion;
  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });
  } catch (error) {
    console.log(`openAI call failed in getTrendingTopic function`, error);
  }
  const topic = completion.data.choices[0].text;
  console.log(`trending topic ${topic}`);
  await getTweetOnTopic(topic);
};

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
  console.log(resp);
};

const tweet = async () => {
  // need to write code
};

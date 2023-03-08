const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res) => {
  try {
    const { city } = req.body;
    const { activity } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `return a jS array of coordinates of ${activity} in ${city}`,
      temperature: 1,
      max_tokens: 2506,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      //   stop: ["\n"],
    });

    return res.status(200).json({
      success: "true",
      data: response.data.choices[0].text,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server listening on port ${port}`));

import {Configuration, OpenAIApi} from "openai";
import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/convert", async (req, res) => {
	let { value } = req.body;

	const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`;
	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: prompt }],
	});
	res.json({
		message: "Successful",
		response: completion.data.choices[0].message.content,
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

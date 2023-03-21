const openai = require('../config');

module.exports = class FreeSearchController {
	static async Search(req, res) {
		try {
			const { query } = req.body;
			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: ` What is the subject of this question ${query}?
				`,
				// 	prompt: `return a JS array of objects of ${query}.
				// For example: [{name: "Cafe de Flore", coordinates: [48.863096, 2.332536]}, [{name: "Les Deux Magots", coordinates: [48.859809, 2.334535]}]
				// `,
				temperature: 0.8,
				max_tokens: 2506,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				// stop: ['\n'],
			});
			console.log(response);
			if (response.data.choices[0].text === false) {
				return res.status(200).json({
					success: 'false',
					answer: [],
				});
			}
			return res.status(200).json({
				success: 'true',
				answer: response.data.choices[0].text,
			});
		} catch (error) {
			return res.status(400).json({
				success: false,
				error: error.response
					? error.response.data
					: 'There was an issue on the server',
			});
		}
	}
};

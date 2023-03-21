const openai = require('../config');

module.exports = class FreeSearchController {
	static async Search(req, res) {
		console.log(req.body);
		try {
			const { query } = req.body;
			const response = await openai.createCompletion({
				model: 'text-davinci-003',
				prompt: `Is this question"${query}" is related to travel or leisure? If it does, return an array of JS objects with the best 5 recommendations. For example: [{name: "Les Deux Magots", describeInAShortParagraphWhyThisLocationIsAGoodDestination: "The Museum of Fine Arts, Houston is an excellent destination for people who use wheelchairs because it is fully accessible and offers a range of accommodations and services to ensure a positive experience. From wheelchair-accessible entrances and elevators to free wheelchair availability and staff support, the museum is committed to ensuring that all visitors can enjoy its exhibits. The availability of ASL interpretation, assistive listening devices, and audio guides with descriptive text further enhances the museum's inclusivity for visitors with different disabilities.",
 address: "13 Rue du Bac, 75007 Paris, France", coordinates: [48.859809, 2.334535]},]

If the question is not related to travel return, for example: {message: "I'm sorry, I don't know the answer to that question."}`,
				// 	prompt: `return a JS array of objects of ${query}.
				// For example: [{name: "Cafe de Flore", coordinates: [48.863096, 2.332536]}, [{name: "Les Deux Magots", coordinates: [48.859809, 2.334535]}]
				// `,
				temperature: 0.8,
				max_tokens: 2506,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				// stop: ["\n"],
			});
			console.log(response);
			return res.status(200).json({
				success: 'true',
				data: response.data.choices[0].text,
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

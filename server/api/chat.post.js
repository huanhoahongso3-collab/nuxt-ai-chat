export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	let messages = [];
	const previosMessages = await readBody(event);
	messages = messages.concat(previosMessages);
	let prompt =
		messages.map((message) => `${message.role}: ${message.message}`).join('\n') + `\nAI:`;
	const req = await fetch('https://api.nova-oss.com/v1', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.nv-30bVqUG136OK8PmNbXrkN0V4x0SSacDnnBprfvIe1rO2gh6l}`
		},
		body: JSON.stringify({
			model: 'gpt-4',
			prompt: prompt,
			temperature: 0.9,
			max_tokens: 8112,
			top_p: 1.0,
			frequency_penalty: 0,
			presence_penalty: 0.6,
			stop: [' User:', ' AI:']
		})
	});

	const res = await req.json();
	const result = res.choices[0];
	return {
		message: result.text
	};
});

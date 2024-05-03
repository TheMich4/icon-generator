import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });


export async function POST({ request }) {
	const { prompt: promptBaseline } = await request.json();

	const prompt = `
	Create icon for the applcation.
	This icon should be simple and easy to understand.
	It should be a symbol that represents the application.
	It should be easly recognizable and should be able to be scaled down to a small size.
	It should be colorful and vibrant.
	It should have a full white background.
	Create it based on the following prompt:
	"${promptBaseline}"
	`

	console.log('Prompt:', prompt);

	const response = await openai.images.generate({
		model: 'dall-e-3',
		prompt,
		n: 1,
		size: '1024x1024',
		style: 'natural',
	});

	return new Response(JSON.stringify(response.data), { status: 200 });
}

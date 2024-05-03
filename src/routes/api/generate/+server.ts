import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });


export async function POST({ request }) {
	console.log('POST');

	const response = await openai.images.generate({
		model: 'dall-e-3',
		prompt: 'a white siamese cat',
		n: 1,
		size: '1024x1024'
	});
	console.log('Ready', { response });

	return new Response(JSON.stringify(response.data[0]), { status: 200 });
}

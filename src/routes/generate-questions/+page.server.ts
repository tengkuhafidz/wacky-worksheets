import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestEvent } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const formData = await request.formData()
		const mainPrompt = formData.get("text-prompt") as string
		const mood = formData.get("mood") as string === "on" ? "wacky" : "serious"
		const itemsToReplace = formData.getAll("replace-items") as string[]
		const numOfQuestion = Number(formData.get("num-questions") as string)
		console.log(">>> mainPrompt, mood, itemsToReplace, numOfQuestion", mainPrompt, mood, itemsToReplace, numOfQuestion)

		const responseData = await generateQuestions(mainPrompt, numOfQuestion, mood, itemsToReplace)
		console.log(">>> responseData", responseData)

		return {
			success: true,
			responseData
		}
	}
}

const generateQuestions = async (mainPrompt: string, numOfQuestions: number, mood: string, itemsToReplace?: string[]) => {
	console.log("Starting to generate images with openai...", mainPrompt, numOfQuestions, mood, itemsToReplace)

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `Generate a different variation of the following quiz question in a ${mood} tone, and replace the objects, ${itemsToReplace?.join(", ")}. "${mainPrompt}"`,
		max_tokens: 400,
		n: numOfQuestions,
		temperature: 0.6
	})

	return {
		createdAt: response?.data?.created,
		choices: response?.data?.choices
	}
}
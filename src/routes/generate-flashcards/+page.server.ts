import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestEvent } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const actions = {
    default: async ({ request }: RequestEvent) => {
        const data = await request.formData()
        const topic = data.get("topic") as string
        const creativeScene = data.get("creative-scene") as string
        const artStyle = data.get("art-style") as string
        const drawingTool = data.get("drawing-tool") as string
        const colours = data.get("colours") as string

        const { topicItems } = await getTopicItems(topic)
        const { base64Images } = await generateImages(topicItems as string[], creativeScene, artStyle, drawingTool, colours)
        const flashcardItems = topicItems?.map((item, index) => ({
            name: item,
            base64Image: base64Images[index]
        }))

        return {
            success: true,
            responseData: {
                title: `${topic} ${creativeScene}`,
                options: {
                    artStyle,
                    drawingTool,
                    colours
                },
                flashcardItems
            }
        }
    }
}

const getTopicItems = async (topic: string) => {
    console.log("Starting to generate topics items with openai...", topic)

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `list down 6 distinct ${topic}, separated solely by commas`,
        max_tokens: 280,
        n: 1,
        temperature: 0.8
    })

    return {
        topicItems: response?.data?.choices[0].text?.trim()?.split(", ")
    }
}

const generateImages = async (topicItems: string[], creativeScene: string, artStyle: string, drawingTool: string, colours: string) => {
    console.log("Starting to generate images with openai...", topicItems, creativeScene, artStyle, drawingTool, colours)

    let base64Images
    const requests = []
    for (const item of topicItems) {
        requests.push(openai.createImage({
            prompt: `${item} ${creativeScene}, ${artStyle} made with ${drawingTool}, ${colours}, extreme long shot`,
            n: 1,
            size: '256x256',
            response_format: 'b64_json'
        }))
    }
    await Promise.all(requests).then(responses =>
        base64Images = responses.map(response => response?.data?.data?.[0].b64_json)
    ).catch(e => console.log("Error: generateFlashcards", e))

    return {
        base64Images
    }
}

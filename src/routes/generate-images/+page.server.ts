import { OPENAI_API_KEY } from '$env/static/private';
import type { RequestEvent } from "@sveltejs/kit";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { nanoid } from "nanoid";
import { Configuration, OpenAIApi } from "openai";
import { storage } from "../../configs/firebase";
import { saveImageRecord } from "../../server/firestore-queries";

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const data = await request.formData()
		const mainPrompt = data.get("image-prompt") as string
		const imageStyles = data.getAll("image-styles") as string[]
		const numOfImages = Number(data.get("num-images") as string)

		const { createdAt, base64Images } = await generateImages(mainPrompt, numOfImages, imageStyles)
		const uniqueId = nanoid()
		const imageUrls = await storeImages(base64Images, uniqueId)
		saveResults(uniqueId, mainPrompt, imageStyles, imageUrls, createdAt)

		const imageRecords = imageUrls?.map(imageUrl => (
			{
				imageUrl,
				mainPrompt,
				imageStyles
			}
		))

		return {
			success: true,
			responseData: {
				imageRecords
			}
		}
	}
}

const generateImages = async (mainPrompt: string, numOfImages: number, imageStyles?: string[]) => {
	console.log("Starting to generate images with openai...", mainPrompt, numOfImages, imageStyles)

	const response = await openai.createImage({
		prompt: `${mainPrompt}, ${imageStyles?.join(", ")}. More whitespace around the image.`,
		n: numOfImages,
		size: '256x256',
		response_format: 'b64_json'
	})

	const base64Images = response?.data?.data?.map(obj => obj.b64_json);
	return {
		createdAt: response?.data?.created,
		base64Images
	}
}

const storeImages = async (base64Images: any[], id: string): Promise<string[]> => {
	console.log("Starting to save on Firebase Storage...")

	const promises = [];
	base64Images?.map((image, index) => {
		const storageRef = ref(storage, `/gallery/${id}-${index}.jpg`);
		promises.push(uploadString(storageRef, image, 'base64', { contentType: 'image/png' }).then((snapshot) => getDownloadURL(snapshot.ref)))
	})
	return await Promise.all(promises);
}

const saveResults = async (id: string, mainPrompt: string, imageStyles: string[], imageUrls: string[], createdAt: number) => {
	console.log("Starting to save on Firestore...", id, mainPrompt, imageStyles, imageUrls, createdAt)

	const promises = [];
	imageUrls?.map((imageUrl, index) => {
		promises.push(saveImageRecord(`${id}-${index}`, mainPrompt, imageStyles, imageUrl, createdAt))
	})
	return await Promise.all(promises);
}

export function load({ url }) {

	return {
		mainPrompt: url.searchParams.get('mainPrompt'),
		imageStyles: url.searchParams.get('imageStyles')
	};
}



import { getImages } from "../server/firestore-queries";

export async function load() {
	const imageRecords = await getImages()
	return {
		imageRecords
	}
}


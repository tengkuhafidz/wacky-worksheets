import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const saveImageRecord = async (id: string, mainPrompt: string, imageStyles: string[], imageUrl: string, createdAt: number) => {
    try {
        console.log("Starting to save image generation result...", { id, mainPrompt, imageStyles, imageUrl, createdAt })
        await setDoc(doc(db, "images", id), {
            mainPrompt,
            imageStyles,
            imageUrl,
            createdAt
        });
        console.log("successfully saved...")
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getImages = async () => {
    const querySnapshot = await getDocs(query(collection(db, "images"), orderBy("createdAt", "desc")));
    const results = [];
    querySnapshot.forEach((doc) => {
        results.push(doc.data())
    });
    return results
}
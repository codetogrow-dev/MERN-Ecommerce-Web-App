import axios from "../utils/AxiosConfiq";

export const postData = async (endpoint, dataToPost) => {
    try {
        const data = await axios.post(endpoint, dataToPost)
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
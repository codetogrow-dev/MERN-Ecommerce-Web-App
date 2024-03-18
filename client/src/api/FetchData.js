import axios from "../utils/AxiosConfiq";
export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch data ${endpoint}`);
    }
};
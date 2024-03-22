import axiosInstance from "../utils/AxiosConfiq"
export const deleteData = async (endpoint) => {
    try {
        const response = await axiosInstance.delete(endpoint)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
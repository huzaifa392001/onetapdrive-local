import API from "../Constants/api";

export const getModels = async () => {
    try {
        const response = await API.get("/models");
        return response?.data;
    } catch (e) {
        throw error;
    }
}

export const addModel = async (body) => {
    try {
        const response = await API.post("/models", body, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || 'Failed to add brand');
        }
        return response?.data;
    } catch (e) {
        throw error;
    }
};

export const deleteModel = async (id) => {
    try {
        const response = await API.delete(`/models/${id}`);
        return response
    }
    catch (e) {
        throw error;
    }
}
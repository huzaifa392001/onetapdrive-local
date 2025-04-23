import API from "../Constants/api"

export const getAllBodyTypes = async () => {
    try {
        const response = await API.get("/body_types")
        return response?.data;
    }
    catch (e) {
        throw error;
    }
}

export const addBodyType = async (body) => {
    try {
        const response = await API.post("/body_types", body, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response?.data || { message: "Body Type added successfully!" };
    } catch (error) {
        throw error;
    }
}

export const deleteBodyType = async (id) => {
    try {
        const response = await API.delete(`/body_types/${id}`);
        return response
    }
    catch (e) {
        throw error;
    }
}
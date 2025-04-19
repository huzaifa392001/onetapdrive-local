import API from "../Constants/api"

export const getAllBodyTypes = async () => {
    try {
        const response = await API.get("/body_types")
        return response?.data;
    }
    catch (e) {
        return e
    }
}

export const addBodyType = async () => {
    try {
        const response = await API.post("/body_types", body, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response?.data || { message: "Body Type added successfully!" };
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add Body Type");
    }
}

export const deleteBodyType = async (id) => {
    try {
        const response = await API.delete(`/body_types/${id}`);
        return response
    }
    catch (e) {
        return e;
    }
}
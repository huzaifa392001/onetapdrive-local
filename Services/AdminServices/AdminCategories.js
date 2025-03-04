import API from "../Constants/api"

export const getCategories = async () => {
    try {
        const response = await API.get("/categories")
        return response?.data
    }
    catch (e) {
        return e;
    }
}

export const addCategory = async (body) => {
    try {
        const response = await API.post("/categories", body, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response?.data || { message: "Category added successfully!" };
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to add category");
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await API.delete(`/categories/${id}`);
        return response
    }
    catch (e) {
        return e;
    }
}
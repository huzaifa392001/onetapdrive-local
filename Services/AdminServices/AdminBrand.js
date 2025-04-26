import API from "../Constants/api"

export const getBrands = async () => {
    try {
        const response = await API.get("/brands")
        return response?.data
    }
    catch (e) {
    }
}

export const addBrand = async (body) => {
    try {
        const response = await API.post("/brands", body, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || 'Failed to add brand');
        }
        return response?.data;
    } catch (e) {
        console.error("API Error:", e);
        throw error;
    }
};

export const deleteBrand = async (id) => {
    try {
        const response = await API.delete(`/brands/${id}`);
        return response
    }
    catch (e) {
        throw error;
    }
}
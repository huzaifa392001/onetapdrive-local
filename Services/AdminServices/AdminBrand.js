import API from "../Constants/api"

export const getBrands = async () => {
    try {
        const response = await API.get("/brands")
        return response?.data
    }
    catch (e) {
        return e;
    }
}

export const addBrand = async (body) => {
    try {
        const response = await API.post("/brands", body, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response?.data;
    } catch (e) {
        console.error("API Error:", e);
        return e;
    }
};

export const deleteBrand = async (id) => {
    try {
        const response = await API.delete(`/brands/${id}`);
        return response
    }
    catch (e) {
        return e;
    }
}
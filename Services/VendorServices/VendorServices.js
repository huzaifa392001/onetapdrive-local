import API from "../Constants/api";

export const getVendorCars = async () => {
    try {
        const response = await API.get("/cars/vendor-cars");
        return response.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
};
import API from "../Constants/api";

export const getAdminCars = async () => {
    try {
        const res = await API.get("/cars");
        return res?.data;
    } catch (e) {
        throw error;
    }
};

export const updateCarStatus = async (carId, enable) => {
    try {
        const response = await API.put(`/cars/status-toggle/${carId}`, {
            enable
        });
        return response.data;
    } catch (e) {
        throw error;
    }
};
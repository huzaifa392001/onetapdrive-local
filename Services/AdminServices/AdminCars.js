import API from "../Constants/api";

export const getAdminCars = async () => {
    try {
        const res = await API.get("/cars");
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const updateCarStatus = async (carId, enable) => {
    const response = await API.put(`/cars/status-toggle/${carId}`, {
        enable
    });
    return response.data;
};
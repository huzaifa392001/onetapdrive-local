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

export const getCurrentVendor = async () => {
    try {
        const response = await API.get("/vendors/profile");
        return response.data;
    } catch (error) {
        console.error("Error creating car:", error);
        throw error;
    }
}

export const changeCarStatus = async ({ id, enable }) => {
    try {
        const response = await API.put(`/cars/active-toggle/${id}`, {
            enable: enable
        });
        return response.data;
    } catch (error) {
        console.error("Error toggling car status:", error);
        throw error;
    }
};

export const boostCar = async (id) => {
    try {
        const response = await API.put(`/cars/car-refresh/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error toggling car status:", error);
        throw error;
    }
}

export const getLeads = async () => {
    try {
        const response = await API.get(`/leads/get-leads`);
        return response.data;
    } catch (error) {
        console.error("Error toggling car status:", error);
        throw error;
    }
}
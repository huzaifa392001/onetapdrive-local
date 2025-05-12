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

export const getCwd = async () => {
    try {
        const response = await API.get("/cars/driver/listing");
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

export const deleteCar = async (id) => {
    try {
        const response = await API.delete(`/cars/${id}`);
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

export const createDiscountedPrice = async (data) => {
    try {
        const response = await API.post(`/cars/discount-offer`, data);
        return response.data;
    } catch (error) {
        console.error("Error toggling car status:", error);
        throw error;
    }
}

export const deleteDiscountPrice = async (id) => {
    try {
        const response = await API.delete(`/cars/discount-offer/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error toggling car status:", error);
        throw error;
    }
}

export const updateTradeLicense = async (body) => {
    try {
        const response = await API.put(`/vendors/update-license/`, body, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error toggling car status:", error);
        throw error;
    }
};

export const getSingleCar = async (carId) => {
    try {
        const res = await API.get(`/cars/${carId}`);
        return res?.data;
    } catch (e) {
        console.error("Error getting single car:", e);
    }
};

export const getVendorDashboard = async () => {
    try {
        const response = await API.get("/dashboard");
        return response.data;
    } catch (error) {
        console.error("Error fetching vendor dashboard data:", error);
        throw error;
    }
}
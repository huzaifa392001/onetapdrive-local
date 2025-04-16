import API from "../Constants/api"

export const getAllBodyTypes = async () => {
    try {
        const response = await API.get("body_types")
        return response?.data;
    }
    catch (e) {
        return e
    }
}
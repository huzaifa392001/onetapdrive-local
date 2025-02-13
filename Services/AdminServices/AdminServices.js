import API from "../Constants/api"

export const getBrands = async () => {
    try {
        const response = await API.get("/brands")
        console.log("response=> ", response)
        return response
    }
    catch (e) {

    }
}
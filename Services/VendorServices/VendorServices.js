import { SET_IS_VENDOR } from "@/Redux/Slices/Auth"
import { store } from "@/Redux/Store"

export const VendorServices = {
    login: async () => {
        try {
            store.dispatch(SET_IS_VENDOR(true))
        }
        catch (e) {
            console.error(`Error making Request: ${e}`)
        }
    },
    logout: async () => {
        try {
            store.dispatch(SET_IS_VENDOR(false))
        }
        catch (e) {
            console.error(`Error making Request: ${e}`)
        }
    },
}
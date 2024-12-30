import { SET_IS_ADMIN } from "@/Redux/Slices/Auth"
import { store } from "@/Redux/Store"

export const AdminServices = {
    login: async () => {
        try {
            store.dispatch(SET_IS_ADMIN(true))
        }
        catch (e) {
            console.error(`Error making Request: ${e}`)
        }
    },
    logout: async () => {
        try {
            store.dispatch(SET_IS_ADMIN(false))
        }
        catch (e) {
            console.error(`Error making Request: ${e}`)
        }
    },
}
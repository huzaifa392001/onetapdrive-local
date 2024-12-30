import categoriesData from "@/DummyData/Categories.json"
import { SET_CATEGORIES } from "@/Redux/Slices/General"
import { store } from "@/Redux/Store"

export const GeneralServices = {
    setCategories: async () => {
        try {
            store.dispatch(SET_CATEGORIES(categoriesData))
        }
        catch (e) {

        }
    }
}
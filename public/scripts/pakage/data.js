import { fetchItems} from "./fetchItems.js";

const data = async () => {
    const items = await fetchItems();
    return {items}
}
export default data
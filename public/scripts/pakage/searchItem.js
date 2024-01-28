import { fetchItems } from "./fetchItems.js";
import { modalListItems } from "./modal.js";

const searchItemsEvent = async(event) => {
    event.preventDefault();

    const modalExist = document.querySelector('.modal')
    if(modalExist) {
        modalExist.remove()
    }

    const dataForm = new FormData(event.target)
    const query = Object.fromEntries(dataForm.entries());
    const params = {[query.filter]: query.value}
    const fetchToItems = await fetchItems(params);

    modalListItems(fetchToItems)
}

export default searchItemsEvent
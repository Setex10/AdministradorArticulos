import { fetchItems } from "./fetchItems.js";
import itemsTemplate from "./loadItems.js";

const itemsListConainer = document.querySelector('#itemsListConainer');

const formFilterEvent = async(event) => {
    event.preventDefault();
    itemsListConainer.innerHTML = '<h2>Esta cargando...</h2>';

    const dataForm = new FormData(event.target)
    const query = Object.fromEntries(dataForm.entries());
    const params = {[query.filter]: query.value}
    const fetchToItems = await fetchItems(params);
    itemsListConainer.innerHTML = '';
    if(fetchToItems.length == 0) {
        itemsListConainer.innerHTML = '<h1>No hay Items</h1>'
        return;
    }
    fetchToItems.forEach(item => {
        const tagItem = itemsTemplate(item, "/api/item");
        itemsListConainer.appendChild(tagItem);
    })
}

export default formFilterEvent;
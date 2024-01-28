import {itemsTemplate} from "./loadItems.js";
import data from "./data.js";

const itemsListConainer = document.querySelector("#itemsListConainer")

const loadView = async (event, keyData, action) => {
    event.target.setAttribute("disabled", "disabled")
    itemsListConainer.innerHTML = "<h2>Esta cargando...</h2>"
    try {
        const fetchData = await data()
        if(!fetchData[keyData]) throw new Error("No se pudo cargar los datos")
        const dataFetch = fetchData[keyData]
        itemsListConainer.innerHTML = '';
        if(Object.keys(dataFetch).length == 0){
            itemsListConainer.innerHTML = '<h1>No hay Items</h1>'
            return;
        }
        dataFetch.forEach(item => {
        const tagItem = itemsTemplate(item, action);
        itemsListConainer.appendChild(tagItem);
        })
    } catch (e) {
        console.log(e)
    }
    finally {
        event.target.removeAttribute("disabled")
    
    }
}

const btnViewItemsEvent = async (event) => {
    await loadView(event, "items", "/api/item")
}

export {btnViewItemsEvent}
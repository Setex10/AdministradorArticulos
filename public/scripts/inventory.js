
import { modalAdd } from "./pakage/modal.js";
import { btnViewItemsEvent} from "./pakage/btnViews.js";
import itemsTemplate from "./pakage/loadItems.js";
import { openMenu, closeMenu, menuBackgroundEvent } from "./pakage/menuAnimated.js";
import data from "./pakage/data.js";
import formFilterEvent from "./pakage/filterData.js";

const itemsListConainer = document.querySelector("#itemsListConainer"),
    btnAddItems = document.querySelector("#addNewItem"),
    btnViewItems = document.querySelector("#viewItems"),
    menuBtn = document.querySelector('#menuBtn'),
    closeBtn = document.querySelector('#closeBtn'),
    menuBackground = document.querySelector('#menuBackground'),
    formFilter = document.querySelector('#formFilter');

btnAddItems.addEventListener('click', () => {
    modalAdd();
});


data().then((data) => {
    if(data.items.length == 0){
        itemsListConainer.innerHTML = '<h1>No hay Items</h1>'
        return;
    }
    if(data.items.message) {
        itemsListConainer.innerHTML = '<h2>Hubo un error, recarga la página</h2>'
        return;
    }
    data.items.forEach((item) => {
        const tagItem = itemsTemplate(item, "/api/item");
        itemsListConainer.appendChild(tagItem);
    }
    );
}
);

formFilter.addEventListener('submit', formFilterEvent);
btnViewItems.addEventListener('click', btnViewItemsEvent);

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
menuBackground.addEventListener('click', menuBackgroundEvent);



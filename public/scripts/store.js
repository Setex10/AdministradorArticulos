import searchItemsEvent from "./pakage/searchItem.js";
import loadShoopingCart from "./pakage/loadShoppingCart.js";
import buttonShopEvent from "./pakage/shopEvent.js";

const searchItemForm = document.querySelector('#searchItem'),
        buttonShop = document.querySelector('#buttonShop');

searchItemForm.addEventListener('submit', searchItemsEvent);
buttonShop.addEventListener('click', buttonShopEvent);

loadShoopingCart();
import { modalTotalPrice } from "./modal.js";

const buttonShopEvent = (e) => {
    const items = localStorage.getItem('shoppingCart');	
    if(!items){
        return;
    }
    const itemsInShoppingCart = JSON.parse(items);
    modalTotalPrice(itemsInShoppingCart);
}

export default buttonShopEvent
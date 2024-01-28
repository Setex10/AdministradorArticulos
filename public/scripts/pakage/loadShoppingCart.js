import createTags from "./createTags.js";

const loadShoopingCart = () => {
    const itemsInShoppingCart = localStorage.getItem('shoppingCart');
    if(!itemsInShoppingCart) {
        return;
    }
    const bodyTableStore = document.querySelector('#bodyTableStore');
    if(bodyTableStore.childNodes.length > 0){
        bodyTableStore.innerHTML = '';
    }
    const items = JSON.parse(itemsInShoppingCart);
    items.forEach(item => {
        const itemsRows = createTags({
            tag:'tr', subTag: [
                {tag: 'td', textContent: item.name},
                {tag: 'td', textContent: item.unit},
                {tag: 'td', textContent: item.amount},
                {tag: 'td', textContent: item.quantity},
                {tag: 'td', textContent: item.quantity * item.amount},
            ]
        })
        bodyTableStore.appendChild(itemsRows)
    })

}

export default loadShoopingCart;
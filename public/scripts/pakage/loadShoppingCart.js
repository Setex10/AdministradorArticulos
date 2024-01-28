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

    const deleteItemEvent = (e) => {
        const id = e.target.parentNode.parentNode.querySelector('input').value;
        const itemsInShoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
        const itemToDelete = itemsInShoppingCart.findIndex(item => item.id_item === id);
        itemsInShoppingCart.splice(itemToDelete, 1);
        localStorage.setItem('shoppingCart', JSON.stringify(itemsInShoppingCart));
        loadShoopingCart();
    }

    items.forEach(item => {
        const itemsRows = createTags({
            tag:'tr', subTag: [
                {tag: 'input', value: item.id_item, class: 'hidden'},
                {tag: 'td', textContent: item.name, class: "w-full flex flex-col justify-center items-center text-center", subTag: {
                    tag: 'button', textContent: 'Eliminar',
                    class: 'bg-red-500 hover:bg-red-700 text-white text-xs font-bold p-2 m-1 rounded', 
                    addEventListener: ['click', deleteItemEvent]
                }},
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
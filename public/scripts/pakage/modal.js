import createTags from "./createTags.js";
import { createObjectTags } from "./loadItems.js";
import loadShoopingCart from "./loadShoppingCart.js";
import searchItemsEvent from "./searchItem.js";

const formModalEventSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = e.target.action;
    const method = e.submitter.value;
    const values = Object.fromEntries(data);
    const valuesModify = Object.keys(values).reduce((acc, key) => {
        const toNumbersType = {
            "unit_price": (value) => value.trim().length == 0 ? '' : Number(value),
            "amount": (value) => value.trim().length == 0 ? '' : Number(value),
            "quantity": (value) => value.trim().length == 0 ? '' : Number(value),
        }
        if(values[key].trim().length > 0){
            if(toNumbersType[key]){
                acc[key] = toNumbersType[key](values[key])
            } else {
                acc[key] = values[key]
            }
        }
        return acc;
    }, {})

    
    try{
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(valuesModify),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok){
            document.location.reload();
        }
        else{
            const error = await response.json();
            const messageTag = document.createElement('p');
            messageTag.classList.add('text-red-500', 'text-xs', 'italic', 'mt-1');
            messageTag.textContent = error.message;
            e.target.parentNode.appendChild(messageTag)
        }
    } catch(err){
        console.log(err, "pepe")
    }
}

const modalTemplate = (nodes) => {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal', 'fixed', 'top-0', 'left-0', 
                                'w-screen', 'h-screen', 'bg-black', 'bg-opacity-50', 
                                'flex', 'justify-center', 'items-center');
    const modal = document.createElement('div');
    modal.classList.add('modal-container', 'w-3/4', 'h-3/4', 'bg-white', 
                        'border', 'border-gray-400', 'border-opacity-50', 'rounded-lg', 
                        'overflow-hidden', 'z-50', 'tablet:w-1/2', 'overflow-y-scroll');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header', 'flex', 'justify-between', 'items-center', 'p-2');
    const modalClose = document.createElement('button');
    modalClose.innerHTML = '&times;';
    modalClose.classList.add('modal-close', 'text-gray-400', 'text-3xl', 'cursor-pointer', 
                            'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 
                            'focus:ring-offset-gray-800', 'focus:ring-white');
    modalClose.setAttribute('type', 'button');
    modalClose.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    })
    modalHeader.appendChild(modalClose);
    modal.appendChild(modalHeader);
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body', 'p-4', 'overflow-y-scroll');

    if(Array.isArray(nodes)){
        nodes.forEach(node => {
            modalBody.appendChild(node);
        })
    } else {
        modalBody.appendChild(nodes);
    }
    modal.appendChild(modalBody);
    modalContainer.appendChild(modal);

    document.body.appendChild(modalContainer)

    return modalContainer;
}

const modalAdd = async () => {
    const formItem = document.createElement('form');
    formItem.classList.add('formManipulate');
    formItem.setAttribute('action', '/api/item');
    formItem.addEventListener('submit', formModalEventSubmit);

    const formItemTags = [
        {tag: 'label', textContent: 'Nombre', subTag: {
            tag: 'input', type: 'text', name: 'name'
        }},
        {tag: 'label', textContent: 'Precio Unitario', subTag: {
            tag: 'input', type: 'number', step:'any', name: 'unit_price'
        }},
        {tag: 'label', textContent: 'Importe', subTag: {
            tag: 'input', type: 'number', step:'any', name: 'amount'
        }},
        {tag: 'label', textContent: 'Cantidad', subTag: {
            tag: 'input', type: 'number', name: 'quantity'
        }},
        {tag: 'label', textContent: 'Unidad', subTag: {
            tag: 'input', type: 'text', name: 'unit'
        }},
        {tag: 'label', textContent: 'Empresa o marca', subTag: {
            tag: 'input', type: 'text', name: 'enterprise_name'
        }},
        {tag: 'label', textContent: 'Clave del producto', subTag: {
            tag: 'input', type: 'text', name: 'product_key'
        }},
        {tag: 'button', name: 'formAction', textContent: 'Aceptar', value: 'post',
        type: 'submit'},
    ]
    createTags(formItemTags).forEach(tag => {
        formItem.appendChild(tag)
    });

    modalTemplate(formItem);

}

const modalEdit = async (item, action) => {
    const formItem = document.createElement('form');
    formItem.classList.add('formManipulate');
    formItem.setAttribute('action', action);
    formItem.addEventListener('submit', formModalEventSubmit);

    const changeText = {
        name: "Nombre",
        unit_price: "Precio",
        amount: "Importe",
        quantity: "Cantidad",
        unit: "Unidad",
        enterprise_name: "Empresa o marca",
        product_key: "Clave del producto"
    }

    const formItemTags = item.map(itemTag => {
        if(itemTag._id) return {tag: 'input', value: itemTag._id, type: 'hidden', name: '_id'}
        return {tag: 'label', textContent: changeText[itemTag], subTag: {
            tag: 'input', type: 'text', name: itemTag
        }}
    })

    formItemTags.push({tag: 'button', name: 'formAction', textContent: 'Aceptar', value: 'put'})
    createTags(formItemTags).forEach(tag => {
        formItem.appendChild(tag)
    });

    modalTemplate(formItem);
}

const modalDelete = (item, action) => {
    const formItem = document.createElement('form');
    formItem.classList.add('formManipulate');
    formItem.setAttribute('action', action);

    formItem.addEventListener('submit', formModalEventSubmit);
    const formItemTags = [
        {tag: 'input', type: 'hidden', name: 'id', value: item, readonly: 'readonly'},
        {tag: 'p', textContent: '¿Estas seguro que quieres borrar el item?',
        class: 'text-red-500 text-2xl italic mt-1 text-center'},
        {tag: 'button', name: 'formAction', textContent: 'Aceptar',
         value: 'delete', type: 'submit'},
    ]
    createTags(formItemTags).forEach(tag => {
        formItem.appendChild(tag)
    });

    modalTemplate(formItem);
}

const modalListItems = (items) => {
    const div = document.createElement('div');
    div.classList.add('overflow-y-scroll');

    const formSearchInModal = createTags({tag: 'form', class: '', 
        addEventListener: ['submit', searchItemsEvent], subTag: {
        tag: 'input', type: 'text', name: 'name', placeholder: 'Buscar', autocomplete: 'on'
    }})

    div.appendChild(formSearchInModal);

    const formAddItemEvent = async(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const entries = data.entries();
        const item = Object.fromEntries(entries);
    
        const shoppingCartStorage = localStorage.getItem('shoppingCart');
        if(item.quantity.trim().length == 0){
            const inputQuantity = e.target.parentNode.querySelector('.quantity_input');
            
            const messageTagExist = document.querySelector('#messageError');
            if(messageTagExist){
                messageTagExist.remove();
            }

            const messageTag = createTags({tag: 'p', id:'messageError', textContent: "Ingresa una cantidad", 
            class: 'text-red-500 text-xs italic mt-1'});
            inputQuantity.parentNode.appendChild(messageTag);
            return
        }
        if(!shoppingCartStorage){
            localStorage.setItem('shoppingCart', JSON.stringify([item]));
        }
        else{
            const shoppingCart = JSON.parse(shoppingCartStorage);
            const itemExist = shoppingCart.find(itemCart => itemCart.id_item == item.id_item);
            if(itemExist){
                itemExist.quantity = parseInt(itemExist.quantity) + parseInt(item.quantity);
            } else{
                shoppingCart.push(item);
            }
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
        }
        loadShoopingCart();
        e.target.parentNode.remove();
    }

    items.forEach(item => {
        const formAddItem = createTags({tag: 'form', class: 'formManipulate', 
        addEventListener: ['submit', formAddItemEvent], subTag: [
            {tag: 'input', type: 'hidden', name: 'id_item', value: item._id},
            {tag: 'input', type: 'hidden', name: 'name', value: item.name},
            {tag: 'input', type: 'hidden', name: 'amount', value: item.amount},
            {tag: 'input', type: 'hidden', name: 'unit', value: item.unit},
            {tag: 'input', class:'quantity_input', type: 'number', name: 'quantity', min: 1, placeholder: 'Cantidad'},
            {tag: 'button', type: 'submit', textContent: 'Agregar'}
        ]})

        delete item.unit_price
        delete item._id
        delete item.enterprise_name

        const divItem = createTags({
            tag: 'div', class: 'itemContainer bg-slate-800'
        })
        const divInfo = document.createElement('div');
        divInfo.classList.add("itemInfo");

        createTags(createObjectTags(item)).forEach(tag => {
            divInfo.appendChild(tag)
        })
        divItem.appendChild(divInfo)
        divItem.appendChild(formAddItem)
        console.log(divItem)
        div.appendChild(divItem)
    })

    modalTemplate(div)
}

const modalTotalPrice = (items) => {
    const totalPrice = items.reduce((totalPrice, item) => totalPrice + (item.amount * item.quantity), 0);
    
    const totalPriceEvent = async(e) => {
        e.preventDefault();
        const items = localStorage.getItem('shoppingCart');
        if(!items){
            return;
        }
        const itemsInShoppingCart = JSON.parse(items);
        const itemsToUpdate = itemsInShoppingCart.map(item => {
            return {
                id_item: item.id_item,
                quantity: item.quantity
            }
        })

        try{
            const result = await fetch('/api/shopping-cart', {
                method: 'put',
                body: JSON.stringify(itemsToUpdate),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const resultJson = await result.json();
            if(result.status === 200){
                localStorage.removeItem('shoppingCart');
                document.location.reload();
            } else {
                const bodyModal = e.target.parentNode
                const messageTag = document.createElement('p');
                messageTag.classList.add('text-red-500', 'text-xs', 'italic', 'mt-1');
                messageTag.textContent = resultJson.message;
                console.log(messageTag, result);
                bodyModal.appendChild(messageTag)
            }
        } catch(err){
            console.log(err)
        }
    }

    const bodyTotalPrice = createTags({
        tag: 'div', class: 'modal-body', subTag: [
            {tag: 'p', textContent: 'El total es: ', subTag: {
                tag: 'span', textContent: totalPrice
            }},
            {tag: 'form', class: 'formManipulate', subTag:{
                tag: 'button', type: 'submit', textContent: 'Aceptar'
            }, addEventListener: ['submit', totalPriceEvent]},
        ]
    })
    modalTemplate(bodyTotalPrice)
}


export {modalAdd, modalEdit, modalDelete, modalListItems, modalTotalPrice}
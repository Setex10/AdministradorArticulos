import createTags from "./createTags.js";
import {modalEdit, modalDelete} from "./modal.js";

const eventEditModal = (event) => {
    const itemInfo = document.querySelector("#itemInfo");
    const id = event.target.parentNode.querySelector('.inputItemId').value
    const action = event.target.parentNode.querySelector('.inputAction').value
    const keys = Array.from(itemInfo.childNodes).map(p => {
        return p.classList[0]
    })
    keys.push({_id: id})
    modalEdit(keys, action)
}

const eventDeleteModal = (event) => {
    const parentNode = event.target.parentNode
    const item = parentNode.querySelector('.inputItemId').value
    const action = parentNode.querySelector('.inputAction').value
    modalDelete(item, action)
}

const itemsTemplate = (items, action) => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('itemContainer');
    const containerInfo = document.createElement('div');
    containerInfo.id = "itemInfo"
    containerInfo.classList.add('col-span-2');


    const infoItemTags = Object.keys(items).reduce((acc, item) => {
        if(item !== '_id' && item !== 'enterprise_id') {
            if(item === 'enterprise_name'){
                acc.push({tag: 'p', class:item, textContent: `Marca: ${items[item]}`})
            } else if(item === 'quantity'){
                acc.push({tag: 'p', class:item, textContent: `Cantidad: ${items[item]}`})
            } else if(item === 'price'){
                acc.push({tag: 'p', class:`${item} text-emerald-500`, textContent: 'Precio:', subTag: {
                    tag: 'span', textContent:  ` $${items[item]}`, class:"text-slate-900" 
                }})
            } else if(item === 'unit'){
                acc.push({tag: 'p', class:item, textContent: `Unidad: ${items[item]}`})
            } else if(item === 'product_key'){
                acc.push({tag: 'p', class:`${item}`, textContent: 'Clave del producto: ', subTag: {
                    tag: 'span', class: "text-sky-500", textContent: `${items[item]}`
                }})
            }
            else {
                acc.push({tag: 'p', class:item, textContent: `${items[item]}`})
            }
        }
        return acc;
    }, []);

    createTags(infoItemTags).forEach(tag => {
        containerInfo.appendChild(tag)
    });
        
    const editItem = document.createElement('div');
    editItem.classList.add('flex', 'flex-col', 'justify-around', 'items-center', 'col-span-1');

    const formItemTags = [
        {tag: 'input', type: 'hidden', name: '_id', value: items._id, class: 'inputItemId' },
        {tag: 'input', type: 'hidden', name: 'action', value: action, class:"inputAction"},
        {tag: 'button', name: 'method', textContent: 'Editar',
        class: 'w-3/4 bg-emerald-500 rounded-2xl', addEventListener: ['click', eventEditModal]},
        {tag: 'button', name: 'method', textContent: 'Borrar',
        class: 'w-3/4 bg-pink-500 rounded-2xl', addEventListener: ['click', eventDeleteModal]},
    ]
    createTags(formItemTags).forEach(tag => {
        editItem.appendChild(tag)
    });

    itemContainer.appendChild(containerInfo);
    itemContainer.appendChild(editItem);
    return itemContainer;
}

export default itemsTemplate;
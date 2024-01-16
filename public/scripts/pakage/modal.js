import createTags from "./createTags.js";

const formModalEventSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = e.target.action;
    const method = e.submitter.value;
    try{
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(Object.fromEntries(data)),
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
    modalContainer.classList.add('modal', 'fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', 'bg-black', 'bg-opacity-50', 'flex', 'justify-center', 'items-center');
    const modal = document.createElement('div');
    modal.classList.add('modal-container', 'w-11/12', 'h-auto', 'bg-white', 'border', 'border-gray-400', 'border-opacity-50', 'rounded-lg', 'overflow-hidden', 'z-50');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header', 'flex', 'justify-between', 'items-center', 'p-2');
    const modalClose = document.createElement('button');
    modalClose.innerHTML = '&times;';
    modalClose.classList.add('modal-close', 'text-gray-400', 'text-3xl', 'cursor-pointer', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-offset-gray-800', 'focus:ring-white');
    modalClose.setAttribute('type', 'button');
    modalClose.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    })
    modalHeader.appendChild(modalClose);
    modal.appendChild(modalHeader);
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body', 'p-4');

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
        {tag: 'label', textContent: 'Precio', subTag: {
            tag: 'input', type: 'number', step:'any', name: 'price'
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
        price: "Precio",
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
    const message = action == "/api/enterprise" ? 
    "Si borras la empresa tendras que modificar el inventario" : "";

    formItem.addEventListener('submit', formModalEventSubmit);
    const formItemTags = [
        {tag: 'input', type: 'hidden', name: 'id', value: item, readonly: 'readonly'},
        {tag: 'p', textContent: message,
        class: 'text-red-500 text-xs italic mt-1'},
        {tag: 'button', name: 'formAction', textContent: '¿Quieres borrar el item?', value: 'delete',
        type: 'submit'},
    ]
    createTags(formItemTags).forEach(tag => {
        formItem.appendChild(tag)
    });

    modalTemplate(formItem);
}


export {modalAdd, modalEdit, modalDelete}
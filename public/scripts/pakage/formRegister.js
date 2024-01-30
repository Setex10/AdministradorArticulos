const formRegister = document.querySelector('#loginForm');

formRegister.addEventListener('submit', async (event) => {  
    event.preventDefault();
    const formData = new FormData(formRegister);
    const query = Object.fromEntries(formData.entries())
    const action = formRegister.action
    const fetchToUser = await fetch(action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    if(fetchToUser.ok) {
        
        document.location.href = 'https://manageitems.onrender.com/login'
    } else {
        const error = await fetchToUser.json();
        const messageTag = document.createElement('p');
        messageTag.classList.add('text-red-500', 'text-xs', 'italic', 'mt-1');
        messageTag.textContent = error.message;
        formRegister.appendChild(messageTag)
    }
})
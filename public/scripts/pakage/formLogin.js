const formLogin = document.querySelector('#loginForm');

const formLoginEvent = async(event) => {
    event.preventDefault();
    const formData = new FormData(formLogin);
    const query = Object.fromEntries(formData.entries())
    const action = formLogin.action
    const fetchToUser = await fetch(action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
    if(fetchToUser.ok) {
        document.location.href = 'https://manageitems.onrender.com/inventory'
    }
    else {
        console.log("Hola")
        // const error = await fetchToUser.json();
        // const messageTag = document.createElement('p');
        // messageTag.classList.add('text-red-500', 'text-xs', 'italic', 'mt-1');
        // messageTag.textContent = error.message;
        // formLogin.appendChild(messageTag)
    }
}

formLogin.addEventListener('submit', formLoginEvent)

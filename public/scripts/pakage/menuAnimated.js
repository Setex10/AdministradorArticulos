const btnMenu = document.querySelector('#menuBtn'),
    menu = document.querySelector('#menu'),
    closeBtn = document.querySelector('#closeBtn'),
    menuBackground = document.querySelector('#menuBackground'),
    menuChildren = document.querySelector('#menuChildren')

const openMenu = () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('grid')
    btnMenu.classList.toggle('hidden');
    menuChildren.classList.toggle("animate-menu_mobile")
}

const closeMenu = () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('grid')
    btnMenu.classList.toggle('hidden');
    menuChildren.classList.toggle("animate-menu_mobile")
}

const menuBackgroundEvent = () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('grid')
    btnMenu.classList.toggle('hidden');
    menuChildren.classList.toggle("animate-menu_mobile")
}

btnMenu.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
menuBackground.addEventListener('click', menuBackgroundEvent);

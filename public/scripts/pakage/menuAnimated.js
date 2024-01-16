const btnMenu = document.querySelector('#menuBtn'),
    menu = document.querySelector('#menu'),
    menuChildren = document.querySelector('#menuChildren')

const openMenu = (tag) => {
    menu.classList.toggle('hidden');
    btnMenu.classList.toggle('hidden');
    menuChildren.classList.toggle("animate-menu_mobile")
}

const closeMenu = (tag) => {
    menu.classList.toggle('hidden');
    btnMenu.classList.toggle('hidden');
    menuChildren.classList.toggle("animate-menu_mobile")
}

const menuBackgroundEvent = (tag) => {
    menu.classList.toggle('hidden');
    btnMenu.classList.toggle('hidden');
    menuChildren.classList.toggle("animate-menu_mobile")
}

export {
    openMenu,
    closeMenu,
    menuBackgroundEvent
};

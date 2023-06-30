// menu-script.js

function handleHamburgerMenuClick(event) {
    const target = event.target;
    if (target.classList.contains("hamburger-menu")) {
      const menu = document.querySelector('.menu');
      menu.classList.toggle('active');
    }
  }
  
  document.addEventListener('click', handleHamburgerMenuClick);
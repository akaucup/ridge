// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#navMenu');
const hamburgerIcon = hamburger.querySelector('svg:nth-child(1)');
const closeIcon = hamburger.querySelector('svg:nth-child(2)');
const topHeader = document.querySelector('#topHeader');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
  hamburgerIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

window.addEventListener('click', function (e) {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('hamburger-active');
    navMenu.classList.add('hidden');
    hamburgerIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  }
});

// Navbar
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed', 'md:top-0');
    header.classList.remove('md:top-6');
  } else {
    header.classList.remove('navbar-fixed', 'md:top-0');
    header.classList.add('md:top-6');
  }
});

// popup

 // 
 window.addEventListener('load', () => {
  let isModalShown = localStorage.getItem('isModalShown');
  if (!isModalShown) {
    const modal = document.getElementById('myModal');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('myModal').classList.add('hidden');
  localStorage.setItem('isModalShown', true);
});

document.getElementById('closeAccept').addEventListener('click', () => {
  document.getElementById('myModal').classList.add('hidden');
  localStorage.setItem('isModalShown', true);
});

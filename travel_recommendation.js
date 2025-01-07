const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById('about-link');
const contactLink = document.getElementById('contact-link');

const homeDiv = document.getElementById('home');
const aboutDiv = document.getElementById('about');
const contactDiv = document.getElementById('contact');
const navbarSearch = document.getElementById('navbar-search');

function showDiv(selectedDiv) {
    const divs = [homeDiv, aboutDiv, contactDiv];

    divs.forEach(div => {
        div.style.display = div === selectedDiv ? 'block' : 'none';
    });

    if (selectedDiv === homeDiv) {
        navbarSearch.style.zIndex = '1';
    } else {
        navbarSearch.style.zIndex = '-10';
    }
}

homeLink.addEventListener('click', () => showDiv(homeDiv));
aboutLink.addEventListener('click', () => showDiv(aboutDiv));
contactLink.addEventListener('click', () => showDiv(contactDiv));
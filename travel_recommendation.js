const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById('about-link');
const contactLink = document.getElementById('contact-link');

const homeDiv = document.getElementById('home');
const aboutDiv = document.getElementById('about');
const contactDiv = document.getElementById('contact');
const navbarSearch = document.getElementById('navbar-search');

function showDiv(selectedDiv) {
    const divs = [homeDiv, aboutDiv, contactDiv, navbarSearch];
    divs.forEach(div => {
        if(div == navbarSearch) {
            if(selectedDiv == homeDiv ) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
                const navbarLinks = document.getElementsByClassName('navbar-links');
                navbarLinks.style.marginRight = "50%";
            }
        } else {            
            div.style.display = div === selectedDiv ? 'block' : 'none';
        }        
        
    });
}

homeLink.addEventListener('click', () => showDiv(homeDiv));
aboutLink.addEventListener('click', () => showDiv(aboutDiv));
contactLink.addEventListener('click', () => showDiv(contactDiv));
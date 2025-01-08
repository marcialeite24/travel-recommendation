const homeLink = document.getElementById('home-link');
const aboutLink = document.getElementById('about-link');
const contactLink = document.getElementById('contact-link');

const homeDiv = document.getElementById('home');
const aboutDiv = document.getElementById('about');
const contactDiv = document.getElementById('contact');
const navbarSearch = document.getElementById('navbar-search');

var data;

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

async function fetchData() {
    const file = "travel_recommendation_api.json";
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        data = await response.json();        
    } catch (error) {
        console.error(error.message);
    }
}

fetchData();

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const resultsSection = document.getElementById("results");

const keywords = {
    countries: ["countries", "country", "australia", "japan", "brazil"],
    temples: ["temples", "temple", "angkor wat", "taj mahal"],
    beaches: ["beaches", "beach", "bora bora", "copacabana beach"]
};

function generateCards(categoryData) {
    const block = document.createElement("div");
    block.classList.add("block");
    resultsSection.appendChild(block);
    
    categoryData.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("results-card");
        console.log(item.cities);
        if (item.cities) {
            item.cities.forEach((city) => {
                card.innerHTML = `
                    <img src="${city.imageUrl}" alt="${city.name}" />
                    <h4>${city.name}</h4>
                    <p>${city.description}</p>
                    <button>Visit</button>
                `;
            });            
        } else {
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" />
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <button>Visit</button>
            `;
        }
    
        
        resultsSection.appendChild(card);
    });
}

searchButton.addEventListener("click", () => {
    resultsSection.innerHTML = "";
    const userInput = searchInput.value.trim().toLowerCase();

    let foundCategory = null;
    for (const category in keywords) {
        if (keywords[category].includes(userInput)) {
            foundCategory = category;
            break;
        }
    }

    if (foundCategory) {
        generateCards(data[foundCategory]);
    } else {
        resultsSection.innerHTML = "<p>No results found. Please try a different keyword.</p>";
    }
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    resultsSection.innerHTML = "";
});
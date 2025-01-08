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
        div.style.display = div === selectedDiv && selectedDiv !== homeDiv ? 'block' : 'none';
    });

    if (selectedDiv === homeDiv) {
        navbarSearch.style.zIndex = '1';
        homeDiv.style.display = 'flex';
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

const timeZoneMap = {
    japan: "Asia/Tokyo",
    australia: "Australia/Sydney",
    brazil: "America/Sao_Paulo"
};

function getTimeForCountry(countryName) {
    const timeZone = timeZoneMap[countryName];
    if (!timeZone) return;

    const options = {
        timeZone: timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    return new Date().toLocaleTimeString("en-US", options);
}

const keywords = {
    countries: ["countries", "country", "australia", "japan", "brazil"],
    temples: ["temples", "temple", "angkor wat", "taj mahal"],
    beaches: ["beaches", "beach", "bora bora", "copacabana beach"]
};

function generateCards(categoryData, userInput) {
    const countryName = userInput.trim().toLowerCase();
    const time = getTimeForCountry(countryName);
    if (time) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.innerHTML = `Time in ${countryName.charAt(0).toUpperCase() + countryName.slice(1)}: ${time}`;
        resultsSection.appendChild(block);
    } 
    
    categoryData.forEach((item) => {             
        if (item.cities) {
            item.cities.forEach((city) => {
                const card = document.createElement("div");
                card.classList.add("results-card");
                card.innerHTML = `
                    <img src="${city.imageUrl}" alt="${city.name}" />
                    <h4>${city.name}</h4>
                    <p>${city.description}</p>
                    <button>Visit</button>
                `;
                resultsSection.appendChild(card);
            });            
        } else {
            const card = document.createElement("div");
            card.classList.add("results-card");
            card.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" />
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <button>Visit</button>
            `;
            resultsSection.appendChild(card);
        }
    });
}

searchButton.addEventListener("click", () => {
    resultsSection.innerHTML = "";
    const userInput = searchInput.value.trim().toLowerCase();

    let foundData = null;

    for (const category in keywords) {
        if (keywords[category].includes(userInput)) {
            foundData = data[category];
            break;
        }
    }

    if (foundData) {
        const filteredData = foundData.filter((item) => {
            if (item.name && item.name.toLowerCase() === userInput) {
                return true;
            }
            return false;
        });;
        if (filteredData.length > 0 && filteredData[0].cities) {
            generateCards(filteredData[0].cities, userInput);
        } else if (filteredData.length > 0) {
            generateCards(filteredData, '');
        } else {
            generateCards(foundData, '');
        }
    } else {
        resultsSection.innerHTML = "<p>No results found. Please try a different keyword.</p>";
    }
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    resultsSection.innerHTML = "";
});
// See all countries from the API on the homepage ✅
// Filter countries by region ✅
// Search for a country using an `input` field ✅
// Click on a country to see more detailed information on a separate page
// Click through to the border countries on the detail page
// Toggle the color scheme between light and dark mode *(optional)*

const cardContainer = document.getElementById("card-container");
const regionSelect = document.getElementById("region-select");
const inputSearch = document.getElementById("input-search");
const inputDisplay = document.getElementById("input-display");
// stores all countries we get from API fetch into an array
let countries = [];

// -------------------------
// FETCH COUNTRY DATA
// -------------------------
async function fetchAPI() {
  try {
    const response = await fetch(
      // API with specified fields when calling all endpoints
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,borders,cca3",
    );
    if (!response.ok) {
      // if request fails, stop everything and throw an error
      throw new Error(`Status ${response.status}`);
    }
    // parse the API data into useable JS objects
    countries = await response.json();

    // show all countries on the page when it first loads
    renderCards(countries);
  } catch (error) {
    // if anything fails, log it into the console
    console.log("Fetch Failed", error);
  }
}
// run the fetch when the page loads
fetchAPI();

// -------------------------
// RENDER COUNTRY CARDS
// -------------------------
function renderCards(data) {
  // clear out any cards currently on the page to prevent duplicates when filtering
  cardContainer.innerHTML = "";

  // loop through & choose the countries we want to render
  data.forEach((item) => {
    // create the main card container
    const card = document.createElement("article");
    card.classList.add("card");
    // set name of each country as the id as an identifier
    card.dataset.code = item.cca3;

    // create the flag image
    const flag = document.createElement("img");
    flag.classList.add("flag");
    flag.src = item.flags.svg;
    flag.alt = item.flags.alt;

    // assign country NAME wrapper & text
    const name = document.createElement("h2");
    name.textContent = item.name.common;

    // assign country POPULATION wrapper & text
    const population = document.createElement("p");
    population.textContent = `Population: ${item.population}`;

    // assign country REGION wrapper & text
    const region = document.createElement("p");
    region.textContent = `Region: ${item.region}`;

    // assign country CAPITAL wrapper & text
    const capital = document.createElement("p");
    capital.textContent = `Capital: ${item.capital}`;

    // place the new containers & text inside the card
    card.append(flag, name, population, region, capital);

    // render the card to the page
    cardContainer.append(card);
  });
}

// -------------------------
// FILTER BY REGION
// -------------------------
regionSelect.addEventListener("change", (e) => {
  // get the selected region from the dropdown & convert it to lowercase to match the API data
  const filteredRegion = e.target.value.toLowerCase();

  // if the user select 'Filter by Region', show all countries again
  if (filteredRegion === "") {
    renderCards(countries);
    return;
  }

  // create a new list that only includes countries that belong to the selected region
  const countriesRegion = countries.filter(
    (country) => country.region.toLowerCase() === filteredRegion,
  );

  // render ONLY the filtered countries
  renderCards(countriesRegion);
});

// -------------------------
// SEARCH BY INPUT
// -------------------------
inputSearch.addEventListener("input", (e) => {
  const inputValue = e.target.value.toLowerCase();
  const search = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(inputValue);
  });
  if (inputValue.length > 0) {
    renderCards(search);
    return;
  }
});

// -------------------------
// DETAILED INFO EVENT LISTENER
// -------------------------
cardContainer.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".card");
  const countryCode = clickedCard.dataset.code;
  if (clickedCard === countryCode) {
    renderCards()
    return 
  }
});
// Search for a country using an `input` field
// Click on a country to see more detailed information on a separate page
// Click through to the border countries on the detail page
// Toggle the color scheme between light and dark mode *(optional)*

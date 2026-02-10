// See all countries from the API on the homepage ✅
// Filter countries by region ✅
// Search for a country using an `input` field ✅
// Click on a country to see more detailed information on a separate page ✅
// Click through to the border countries on the detail page ✅
// Toggle the color scheme between light and dark mode *(optional)* ✅

const cardContainer = document.getElementById("card-container");
const regionSelect = document.getElementById("region-select");
const inputSearch = document.getElementById("input-search");
const inputDisplay = document.getElementById("input-display");

let countries = [];

// -------------------------
// FETCH COUNTRY DATA
// -------------------------
async function fetchAPI() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital,borders,cca3",
    );
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    countries = await response.json();

    renderCards(countries);
  } catch (error) {
    console.log("Fetch Failed", error);
  }
}
fetchAPI();

// -------------------------
// RENDER COUNTRY CARDS
// -------------------------
function renderCards(data) {
  cardContainer.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.code = item.cca3;

    const contentContainer = document.createElement('section');
    contentContainer.classList.add('flag-content');

    const flag = document.createElement("img");
    flag.classList.add("flag");
    flag.src = item.flags.svg;
    flag.alt = item.flags.alt;

    const name = document.createElement("h2");
    name.textContent = item.name.common;

    const population = document.createElement("p");
    population.textContent = `Population: ${item.population}`;

    const region = document.createElement("p");
    region.textContent = `Region: ${item.region}`;

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${item.capital}`;

    card.append(contentContainer);
    contentContainer.append(flag, name, population, region, capital)

    cardContainer.append(card);
  });
}

// -------------------------
// FILTER BY REGION
// -------------------------
regionSelect.addEventListener("change", (e) => {
  const filteredRegion = e.target.value.toLowerCase();

  if (filteredRegion === "") {
    renderCards(countries);
    return;
  }

  const countriesRegion = countries.filter(
    (country) => country.region.toLowerCase() === filteredRegion,
  );

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
  if (!clickedCard) return;

  const code = clickedCard.dataset.code;
  // navigation to separate page ()
  window.location.href =
    `detail.html?code=${code}`;
});

const darkToggle = document.querySelector(".dark-mode-wrapper");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});


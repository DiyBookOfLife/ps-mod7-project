const cardContainer = document.getElementById("card-container");

async function checkAPI() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital",
    );
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    data.forEach((item) => {
      //create article w class 'card'
      const card = document.createElement("article");
      card.classList.add("card");

      //create img w class 'flag'
      const flag = document.createElement("img");
      flag.classList.add("flag");
      flag.src = item.flags.png;
      flag.alt = item.flags.alt;

      //create h2 & add the content: name
      const name = document.createElement("h2");
      name.textContent = item.name.common;

      //create p & add the content: population
      const population = document.createElement("p");
      population.textContent = `Population: ${item.population}`;

      //create p & adds region
      const region = document.createElement("p");
      region.textContent = `Region: ${item.region}`;

      //create p & adds capital
      const capital = document.createElement("p");
      capital.textContent = `Capital: ${item.capital}`;

      card.append(flag, name, population, region, capital);
      cardContainer.appendChild(card);
    });
  } catch (error) {
    console.log("Fetch Failed", error);
  }
}

checkAPI();

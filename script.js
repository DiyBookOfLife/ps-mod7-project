async function checkAPI() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,region,capital",
    );
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Fetch Failed", error);
  }
}

checkAPI();

// data.forEach((item) => {
//   function renderCountry(data) {
//     document.getElementById("name").textContent = data.name.common;
//     document.getElementById("population").textContent = data.population;
//     document.getElementById("region").textContent = data.region;
//     document.getElementById("capital").textContent = data.capital;
//   }
//   renderCountry(item);

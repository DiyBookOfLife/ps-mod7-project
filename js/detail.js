// ---------------------
// COUNTRY CARD DETAILS
// ---------------------
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  console.error("No country code found in URL");
} else {
  fetchCountryDetails();
}
// ---------------------
// FETCH COUNTRY
// ---------------------
async function fetchCountryDetails() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`,
    );

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();
    renderCardDetails(data[0]);
  } catch (error) {
    console.log("Fetch Failed", error);
  }
}

fetchCountryDetails();

// ---------------------
// COUNTRY CARD DETAILS
// ---------------------

function renderCardDetails(country) {
  const container = document.querySelector(".country-detail");
  container.innerHTML = "";

  // FLAG
  const flagWrapper = document.createElement("div");
  flagWrapper.classList.add("flag-wrapper");

  const flag = document.createElement("img");
  flag.src = country.flags.svg;
  flag.alt = country.flags.alt || country.name.common;

  flagWrapper.append(flag);

  // INFO
  const info = document.createElement("div");
  info.classList.add("country-info");

  const name = document.createElement("h2");
  name.textContent = country.name.common;

  const columns = document.createElement("div");
  columns.classList.add("info-columns");

  const left = document.createElement("ul");
  left.classList.add("info-left");

  const nativeName =
    Object.values(country.name.nativeName || {})[0]?.common || "N/A";

  left.innerHTML = `
    <li><strong>Native Name:</strong> ${nativeName}</li>
    <li><strong>Population:</strong> ${country.population.toLocaleString()}</li>
    <li><strong>Region:</strong> ${country.region}</li>
    <li><strong>Sub Region:</strong> ${country.subregion || "N/A"}</li>
    <li><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</li>
  `;

  const right = document.createElement("ul");
  right.classList.add("info-right");

  const currencies =
    Object.values(country.currencies || {})
      .map((c) => c.name)
      .join(", ") || "N/A";

  const languages = Object.values(country.languages || {}).join(", ") || "N/A";

  right.innerHTML = `
    <li><strong>Top Level Domain:</strong> ${country.tld?.join(", ") || "N/A"}</li>
    <li><strong>Currencies:</strong> ${currencies}</li>
    <li><strong>Languages:</strong> ${languages}</li>
  `;

  columns.append(left, right);

  // BORDERS
  const bordersWrapper = document.createElement("div");
  bordersWrapper.classList.add("borders");

  const bordersTitle = document.createElement("strong");
  bordersTitle.textContent = "Border Countries:";

  const borderList = document.createElement("div");
  borderList.id = "border-list";

  if (!country.borders || country.borders.length === 0) {
    borderList.textContent = "None";
  } else {
    country.borders.forEach((borderCode) => {
      const btn = document.createElement("button");
      btn.textContent = borderCode;

      btn.addEventListener("click", () => {
        window.location.href = `detail.html?code=${borderCode}`;
      });

      borderList.append(btn);
    });
  }

  bordersWrapper.append(bordersTitle, borderList);

  info.append(name, columns, bordersWrapper);

  container.append(flagWrapper, info);
}

function renderBorders(borders) {
  const borderList = document.getElementById("border-list");
  borderList.innerHTML = "";

  if (!borders || borders.length === 0) {
    borderList.textContent = "None";
    return;
  }

  borders.forEach((borderCode) => {
    const btn = document.createElement("button");
    btn.textContent = borderCode;

    btn.addEventListener("click", () => {
      window.location.href = `detail.html?code=${borderCode}`;
    });

    borderList.appendChild(btn);
  });
}

// BACK BUTTON
document.querySelector(".back-btn").addEventListener("click", () => {
  window.history.back();
});

// HOME BUTTON
document.querySelector(".home-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// DARK MODE
const darkToggle = document.querySelector(".dark-mode-wrapper");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

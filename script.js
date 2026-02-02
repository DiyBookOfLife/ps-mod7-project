async function checkAPI() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/name/all");
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

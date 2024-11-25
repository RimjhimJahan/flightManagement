document.addEventListener("DOMContentLoaded", () => {
  const fromCity = document.getElementById("from-city");
  const toCity = document.getElementById("to-city");
  const output = document.getElementById("output");

  // Fetch cities from the server
  fetch("/cities")
    .then((response) => response.json())
    .then((cities) => {
      cities.forEach((city) => {
        const option1 = new Option(city.Name, city.CityID);
        const option2 = new Option(city.Name, city.CityID);
        fromCity.add(option1);
        toCity.add(option2);
      });
    });

  document.getElementById("calculate").addEventListener("click", () => {
    const from = fromCity.value;
    const to = toCity.value;

    if (from === to) {
      output.textContent = "Select different cities!";
      return;
    }

    // Fetch city coordinates and calculate distance
    fetch("/cities")
      .then((response) => response.json())
      .then((cities) => {
        const cityFrom = cities.find((city) => city.CityID == from);
        const cityTo = cities.find((city) => city.CityID == to);

        const distance = Math.sqrt(
          Math.pow(cityTo.X_Location - cityFrom.X_Location, 2) +
            Math.pow(cityTo.Y_Location - cityFrom.Y_Location, 2)
        );
        output.textContent = `Distance: ${(distance * 74).toFixed(
          2
        )} kilometers`;
      });
  });
});

"use strict";

// function that creates a new city and then returns it 
function createNewCity(name, population, county, attraction) {
    let city = {
        name: name,
        population: population,
        county: county,
        attraction: attraction,
      };
    
      return city;
}

// add a new city to the database
function addCityToDatabase(database, city) {
    // "pushes" a new city to our database
    database.push(city);
}

// renders a city into HTML 
function renderCity(city) {
    let div = document.createElement("div");
    div.classList.add("city");
    div.id = city.id;

    div.innerHTML = `
        <div>${city.name}</div>
        <div>${city.population}</div>
        <div>${city.county}</div>
        <div>${city.attraction}</div>
        <button type="button">Remove</button>
    `;

  return div;
}

// renders a whole array of cities onto HTML 
function renderCities(cities) {
    let citiesElement = document.getElementById("cities");
  citiesElement.innerHTML = "";

  // made a for loop that goes throught all cities and inserts them into HTML 
  for (let city of cities) {
    let cityElement = rendercity(city);
    citiesElement.appendChild(cityElement);
  }
  // Add remove-handlers for our cities
  setRemovecityHandlers();
}
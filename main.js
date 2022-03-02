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
    let cityElement = renderCity(city);
    citiesElement.appendChild(cityElement);
  }
  // Add remove-handlers for our cities
  setRemoveCityHandlers();
}

// adds the city created in the form to the website 
function onAddCitiesSubmit(event) {
    // prevents the filled form to send us to a new page 
    event.preventDefault(); 
// made variables for all of city attributes that are inside HTML 
  let name = document.getElementById("name").value;
  let population = document.getElementById("population").value;
  let county = Number(document.getElementById("county").value);
  let attraction = document.getElementById("attraction").value;
// uses previous function that creates a new city 
  let city = createNewCity(name, population, county, attraction);

  // Calculates the newly created cities ID
  city.id = database[database.length - 1].id + 1;
// calls functions to add cities to database and render them into HTML 
  addCityToDatabase(database, city);
  renderCities(database);

  // empty all form fields
  let form = document.getElementById("add-city-form");
  form.reset();
}

// adds click event  handler to the add button 
function setAddCityHandler() {
    let form = document.getElementById("add-city-form");
  form.addEventListener("submit", onAddCitiesSubmit);
} 

// When a user clicks the remove-city-button
function onRemoveCityClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    // removes the city in database by its id 
    removeCityById(database, id);
    // Re-render (without the newly deleted city)
    renderCities(database);
  }
  
  //  "click" event handler for all remove buttons 
  function setRemoveCityHandlers() {
    let buttons = document.querySelectorAll(".city button");
  
    for (let button of buttons) {
      button.addEventListener("click", onRemoveCityClick);
    }
  }

// initialazing the page 
renderCities(database);
setAddCityHandler();
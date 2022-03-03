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
        <li>${city.name}</li>
        <div>${city.population}</div>
        <div>${city.county}</div>
        <div>${city.attraction}</div>
        <button type="button" class="remove">Remove</button>
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
  // alerts user if he didnt fill out whole form 
  if (name == ""){
    return alert("Please fill out all the information required")
  }

else if (population == ""){
  return alert("Please fill out all the information required")
}
else if (county == ""){
  return alert("Please fill out all the information required")
}
else if (attraction == ""){
  return alert("Please fill out all the information required")
}

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
  //confirm method pops up when user click on delete button 
  if (confirm("are you sure you want to delete?") == true ){ 
    // is user click on OK the element gets deleted from the database
    let button = event.target;
    let id = button.parentElement.id;
    // removes the city in database by its id 
    removeCityById(database, id);
    // Re-render (without the newly deleted city)
    renderCities(database);
  } 
  // if user click cancel nothing happens
    else return false;
   
  }
  
  // removes a city based on its id 
  function removeCityById(cities, id) {
      // simple loop that goes throught the length of our database
    for (let i = 0; i < cities.length; i++) {
        // This is the current city of our loop
        let city = cities[i];
        // Check if this cities name is the same as the name that the function received
        if (city.id == id) {
          // If so, remove the city from the array
          cities.splice(i, 1);
          return;
        }
      }
  }

  //  "click" event handler for all remove buttons 
  function setRemoveCityHandlers() {
    let buttons = document.querySelectorAll(".city button");
    for (let button of buttons) {
      button.addEventListener("click", onRemoveCityClick);
    }
  }

  function getCitiesByPopulation(cities, population) {
 let citiesByPopulation = [];

 for (let city of cities) {
     if(city.population == population) {
         citiesByPopulation.push(city);
     }
 }
 return citiesByPopulation;
}

// filters cities by their county 
  function getCitiesByCounty(cities, county) {
    let citiesByCounty = [];
   
    for (let city of cities) {
      // filters the word typed in form and then "Pushes" it, aswell as makes sure to filter even if lower or upper case is misplaced
        if (city.county.toString().toLowerCase() == county.toString().toLowerCase()) {
            citiesByCounty.push(city);
        }
    }
    return citiesByCounty;
     }

  function onFilterByPopulationSubmit(event) {
      //prevents from the form sending us to a new page 
      event.preventDefault();

      let population = document.getElementById("filter-population").value;
      // Get the cities by population thanks to the earlier function 
      let cities = getCitiesByPopulation(database, population);
      // Re-render them
      renderCities(cities);
  }

  // renders the filtered county
  function onFilterByCountySubmit(event) {
    event.preventDefault();

    let county = document.getElementById("filter-county").value;
    // Get the cities by population
    let cities = getCitiesByCounty(database, county);
    // Re-render them
    renderCities(cities);
  }
  
  // resets all filter forms
  function onShowAllClick() {
    document.getElementById("filter-population").value = "";
    document.getElementById("filter-county").value = "";
    renderCities(database);
  }

// adds events when submitting and clicking on filter forms and button
  function setFiltercityHandlers() {
    let populationForm = document.getElementById("filter-by-population");
    let countyForm = document.getElementById("filter-by-county");
    let showAll = document.getElementById("show-all");
  
    populationForm.addEventListener("submit", onFilterByPopulationSubmit);
    countyForm.addEventListener("submit", onFilterByCountySubmit);
    showAll.addEventListener("click", onShowAllClick);
  }

// initialazing the page 
renderCities(database);
setAddCityHandler();
setFiltercityHandlers();

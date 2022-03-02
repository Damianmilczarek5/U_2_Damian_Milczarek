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
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '27f571c5';
const APP_key = '2b244700e8960af22529130994c266a4';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI (){
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;

    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML = '';
   results.map(result => {
    generatedHTML +=
    `
<div class="item">
    <img src="${result.recipe.image}" alt="">
    <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
    </div>
    <div class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</div>
    <div class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: "No Data Found"}</div>
    <div class="item-data">Health Label: ${result.recipe.healthLabels}</div>
</div>
    
    `
   })
   searchResultDiv.innerHTML = generatedHTML;
}
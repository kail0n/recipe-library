// ********************************************
// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-recipe-form');
const recipesList = document.querySelector('table');

// Bind event listeners
btn.addEventListener('click', getMessage);
form.addEventListener('submit', submitRecipe);

// Fetch all recipes as soon as app is loaded
getAllRecipes();

// ********************************************

// RECIPES FLOW 
// index

function getAllRecipes() {
    fetch('http://localhost:3000/recipes')
        .then(r => r.json())
        .then(appendRecipes)
        .catch(console.warn)
};

// create
function submitRecipe(e) {
    e.preventDefault();

    const recipeData = {
        name: e.target.name.value,
        author: e.target.author.value,
        serves: e.target.serves.value
    };

    const options = {
        method = 'POST',
        body: JSON.stringify(recipeData),
        headers: { "content-type": "application/json" }
    };

    fetch('http://localhost:3000/recipes', options)
        .then(r => r.json())
        .then(appendRecipe)
        .then(() => e.target.reset())
        .catch(console.warn)
};

// function updateRecipe() {

// }

function deleteRecipe(id, li) {
    console.log('deleting, ', id)

    const options = {
        method: 'DELETE'
    };
    fetch('http://localhost:3000/recipes', options)
        .then(li.remove())
        .catch(console.warn)
};

// helpers
function appendRecipes(data) {
    data.recipes.forEach(appendRecipe)
};

function appendRecipe(recipeData) {
    const newRow = document.createElement('tr')
    const recipeLi = formatRecipeTr(recipeData, newRow)
    recipesList.append(newRow)
};

function formatRecipeTr(recipe, tr) {
    const nameTd = document.createElement('td');
    const authorTd = document.createElement('td');
    const servesTd = document.createElement('td');
    const deleteTd = document.createElement('td');
    
    const delBtn = document.createElement('button')
    delBtn.setAttribute('class', 'delete')
    delBtn.textContent('X')
    delBtn.onclick = () => deleteRecipe(recipe.id, tr)
    deleteTd.append(delBtn)

    nameTd.textContent = recipe.name
    authorTd.textContent = recipe.author
    servesTd.textContent = recipe.serves

    return tr
}

// ********************************************

// MESSAGE FLOW

function getMessage() {
    fetch('http://localhost:3000/')
        .then(r => r.text())
        .then(renderMessage)
        .catch(console.warn)
}

function renderMessage(msgText) {
    document.querySelector('#msg-btn').textContent = msgText

};
// ********************************************

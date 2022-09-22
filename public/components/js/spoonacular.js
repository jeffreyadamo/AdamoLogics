// const recipeFormEl = document.getElementByClassName("recipeForm");
const recipeSearched = document.getElementById("recipeInput");
const insertIntolerancesEl = document.getElementById("insertIntolerances");
const recipeResponseEl = document.getElementById("recipeResponse")

$("#addIntolerances").on("click", function(event){
  event.preventDefault();
  insertIntolerancesEl.innerHTML = ('<div class="row"><div class="col-12 roboto middle"><label class="btn btn-secondary btn-sm active"><input type="radio" name="options" id="option1" checked> No Constraints</label><label class="btn btn-secondary btn-sm"><input type="radio" name="options" id="option2"> Vegan</label><label class="btn btn-secondary btn-sm"><input type="radio" name="options" id="option3"> Vegetarian</label>    <label class="btn btn-secondary btn-sm"><input type="radio" name="options" id="option4"> Gluten Free</label></div></div>');
  recipeResponseEl.innerHTML = "";
})

$(".recipeForm").on("submit", function(event) {
  event.preventDefault();
  console.log("submitted recipe is: " + recipeSearched.value);
  spoonacularAPI(recipeSearched.value)
})

const spoonacularAPI = (recipe) => {
  $.get('/api/spoonacular/' + recipe)
  .then((response) => {
    console.log("first response");
    console.log("second response: " + response);
  })
}


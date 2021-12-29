// const recipeFormEl = document.getElementByClassName("recipeForm");
const recipeSearched = document.getElementById("recipeInput")

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


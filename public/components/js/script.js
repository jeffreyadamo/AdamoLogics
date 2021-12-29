// $(document).ready(function(){

// $(".spotifyDiv").on("click", function(event) {
//     event.preventDefault();
//     alert("Soon this will direct towards Spotify's authentication page");

// });

// Happy New Year
// =======================
function changeColor() {
    setInterval(flashText, 500);
}

function flashText() {
    const oElem = document.getElementById("happyNewYear");
    if (oElem.className === "col-12 middle go") {
      oElem.className = "col-12 middle stop";
    } else {
      oElem.className = "col-12 middle go";
    }
  }

changeColor();

// TEMP CALCULATOR
// ========================================================================
$("#tempForm").on("submit", function(event) {
    event.preventDefault();
    let tempF = document.getElementById("tempF").value;
    let tempC = (tempF - 32) * (5/9);
    document.getElementById("tempC").value = tempC.toFixed(2);
})

$("#tempCForm").on("submit", function(event) {
    event.preventDefault();
    let tempC = document.getElementById("tempC").value;
    let tempF = ((tempC * (9/5)) + 32);
    document.getElementById("tempF").value = tempF.toFixed(2);
})

$("#ugmL_to_molarity_Form").on("submit", function(event) {
    event.preventDefault();
    let molecularWeight = document.getElementById("molecularWeightInputugmL").value;
    let ugmL = document.getElementById("ugmLInput").value;
    let nanoMolar = (ugmL/molecularWeight)*1000;
    document.getElementById("molecularWeightInputnM").value = molecularWeight
    document.getElementById("nMInput").value = nanoMolar.toFixed(2);
})

$("#molarity_to_ugmL_Form").on("submit", function(event) {
    event.preventDefault();
    let molecularWeight = document.getElementById("molecularWeightInputnM").value;
    let nanoMolar = document.getElementById("nMInput").value;
    let ugmL = (nanoMolar*molecularWeight)/1000;
    document.getElementById("molecularWeightInputugmL").value = molecularWeight
    document.getElementById("ugmLInput").value = ugmL.toFixed(2);
})

// Spoonacular
// ===================================
// $(".recipeForm").on("submit", function(event) {
//     event.preventDefault();
//     const recipeInput = document.getElementById("recipeInput");
//     console.log("Searched for: " + recipeInput.value);
//     console.log()
//     console.log("ready to search recipies!")
// })
// Spoonacular end
// ===================================

    
// PARTY MODE
// ========================================================================
    let partyMode = false;
    $("#partySwitch").on("change", function(event) {
        if (!partyMode){
            partyMode = true; 
            const newSection = document.createElement('section');
            newSection.style.width = '200px';
            $("#partyMode").append(newSection);
            setInterval(createSquare, 150);
            $(".navbar").css({"background-image": "url('https://media.giphy.com/media/lPAaLdlvicAMJWn5L4/giphy.gif')"});
        } else {
            partyMode = false;
            clearInterval(createSquare);
            $("#partyMode").empty();
            $(".navbar").css({"background-image": ""});
        }
        console.log("partyMode is " + partyMode);
        console.log('change');
    })
// ========================================================================

    // Animation Squares
    ///////////////////////
    const colors = [
        '#2196f3',
        '#e91e63',
        '#ffeb3b',
        '#74ff1d',
    ]
    function createSquare() {
        const section = document.querySelector("section");
        const square = document.createElement("span");
        var size = Math.random() * 50;
        square.style.width = size + 'px';
        square.style.height = size + 'px';
        square.style.top = 0.96*(Math.random() * innerHeight) + 'px';
        square.style.left = 0.96*(Math.random() * innerWidth) + 'px';
        const bg = colors[Math.floor(Math.random() * colors.length)];
        square.style.background = bg;
        if(partyMode){
            section.appendChild(square);
        };
        setTimeout(() =>{
            square.remove()
        },5000)
    }   
    ///////////////////////

// }
// )

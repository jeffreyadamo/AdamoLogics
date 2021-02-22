$(document).ready(function(){

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
// ========================================================================

// NASA PIC OF THE DAY
// ========================================================================
function getPOTD() {
    $.get('https://api.nasa.gov/planetary/apod?api_key=I5hJfu7D8nKT2KpOGLAyVaIe11JkH1uWszjag25o')
    .then((response) => {
        console.log(response);
        let nasa = document.getElementById('nasa');
        var link = document.createElement('a');
        var img = document.createElement("img");
        link.setAttribute('href', response.hdurl);
        link.setAttribute('target', '_blank');
        img.setAttribute('src', response.url);
        img.style.height= '40rem';
        link.appendChild(img);
        nasa.appendChild(link);
        document.getElementById('nasaPOTDAuthor').append(response.copyright);
        document.getElementById('nasaPOTDTitle').append(response.title);
        document.getElementById('nasaPOTDExplanation').append(response.explanation);
    });
}
getPOTD();
// ========================================================================
    
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

})

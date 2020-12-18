$(document).ready(function(){

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
    
    // Party Mode
    let partyMode = false;
    $("#partySwitch").on("change", function(event) {
        if (!partyMode){
            partyMode = true; 
            $("#partyMode").append("<section></section>");
            setInterval(createSquare, 150);
            $(".navbar").css({"background-image": "url('https://media.giphy.com/media/lPAaLdlvicAMJWn5L4/giphy.gif')"});
        } else {
            partyMode = false;
            clearInterval(createSquare);
            $("#partyMode").empty();
            $(".navbar").css({"background-image": ""});
        }
        console.log("partyMode is " + partyMode);
    })

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
        square.style.width = 20 + size + 'px';
        square.style.height = 20 + size + 'px';
        square.style.top = Math.random() * innerHeight + 'px';
        square.style.left = Math.random() * innerWidth + 'px';
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

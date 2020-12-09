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


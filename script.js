// const tempF = document.getElementById("tempF").value;

$("#tempForm").on("submit", function(event) {
    event.preventDefault();
    const tempF = document.getElementById("tempF").value;
    console.log(tempF);
    let tempC = (tempF - 32) * (5/9);
    $("#tempC").html(tempC.toFixed(2) + " &#176" + "C");
})


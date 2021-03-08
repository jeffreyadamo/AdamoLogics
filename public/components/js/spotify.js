const usernameElement = document.querySelectorAll(".spotifyUsername");
const userPhoto = document.getElementById('spotifyUserPhoto');
const userHomepage = document.getElementById('spotifyUserHomepage');
// var spotifyUsername = "";

function getUserInfo() {
  $.get('/api/getUserInfo')
  .then((data) =>{
    var dataObj = JSON.parse(data)
    console.log(dataObj)
    let spotifyUsername = dataObj.display_name;
    let spotifyUserPhoto = dataObj.images[0].url;
    let spotifyUserHomepage = dataObj.external_urls.spotify;
    console.log(spotifyUserPhoto);
    insertSpotifyUserName(spotifyUsername);
    insertSpotifyUserPhoto(spotifyUserPhoto);
    insertSpotifyUserHomepageLink(spotifyUserHomepage);
  })
};

function insertSpotifyUserName(spotifyUsername) {
  usernameElement.forEach(function(username){
    username.innerHTML =  "Wecome, " +spotifyUsername;
  })
};

function insertSpotifyUserPhoto(spotifyUserPhoto) {
  userPhoto.setAttribute('src', spotifyUserPhoto)
}

function insertSpotifyUserHomepageLink(link) {
  userHomepage.setAttribute('href', link)
}

$(document).ready(function () {
getUserInfo();

});
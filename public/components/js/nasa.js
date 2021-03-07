function getNasaPOTD() {
  $.get('/api/getNasaPOTD')
  .then((response) => {
    console.log(response);
    let nasa = document.getElementById('nasa');
    let link = document.createElement('a');
    link.setAttribute('target', '_blank');

    if (response.media_type === 'video'){
        link.setAttribute('href', response.url);
        let vid = document.createElement('iframe');
        vid.setAttribute('src', response.url);
        vid.style.width="560px";
        vid.style.height="315px";
        link.appendChild(vid);
    } else {
        link.setAttribute('href', response.hdurl);
        let img = document.createElement("img");
        img.setAttribute('src', response.url);
        img.style.width= '70vw';
        link.appendChild(img);
    }

    nasa.appendChild(link);
    
    document.getElementById('nasaPOTDTitle').append(response.title);
    document.getElementById('nasaPOTDExplanation').append(response.explanation);
    if (response.copyright) {
      document.getElementById('nasaPOTDAuthor').append("Photograph copyright: " + response.copyright);
    };
  })
}
getNasaPOTD();
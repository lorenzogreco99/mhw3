function onTokenJson1(json){
    console.log(json)
    token = json.access_token;

}

function onJson1(json){
    console.log(json);
    const artista = document.querySelector('#artista');
    const sezione1 = document.querySelector('#album');
    sezione1.innerHTML = '';
    const image1 = document.createElement('img');
    image1.classList.add('img');

    console.log(json.tracks.items[0].artists[0].name)
    let i = 0;
    while(json.tracks.items[i]){
        if(artista.value == json.tracks.items[i].artists[0].name){
            image1.src = json.tracks.items[i].album.images[0].url;
            break;
        }
        i++;
        console.log(json.tracks.items[i].artists[0].name)
    }
    sezione1.appendChild(image1);
}

function onJson2(json){
    console.log(json);
    const sezione2 = document.querySelector('#cibo');
    sezione2.innerHTML = '';
    const image2 = document.createElement('img');
    image2.classList.add('img');
    image2.src = json.image;
    sezione2.appendChild(image2);

}

function onResponse2(response) {
    console.log('Risposta ricevuta2');
    return response.json();
}

function onTokenResponse1(response) {
    return response.json();
}

function onResponse1(response){
    console.log('Risposta ricevuta1');
    return response.json();
}



function search1(event){
    event.preventDefault();
    const canzone_input = document.querySelector('#canzone');
    const canzone = encodeURIComponent(canzone_input.value);
    const artista_input = document.querySelector('#artista');
    const artista = encodeURIComponent(artista_input.value);
    console.log('Eseguo ricerca: ' + canzone);

    fetch("https://api.spotify.com/v1/search?type=track&q=" + canzone ,
    {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse1).then(onJson1);

}

function search2(event) {
    event.preventDefault();

    const cibo_input = document.querySelector('#food');
    const food = encodeURIComponent(cibo_input.value);
    console.log('Eseguo ricerca: ' + food);
    rest_url= 'https://foodish-api.herokuapp.com/api/images/' + food;
    console.log('URL: ' + rest_url);
  // Esegui fetch
    fetch(rest_url).then(onResponse2).then(onJson2);
}

function chiudiModale(){
    modale.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function finestra(){
    const modale = document.querySelector('#modale');
    modale.classList.remove('hidden');
    document.body.classList.add('no-scroll');


}

const client_id = '958f24b517194c07a32cfe14a9515fbb';
const client_secret = '7c06ad57169743058c164b48ba9c3358';

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse1).then(onTokenJson1);

const cerca = document.querySelector('nav span');
cerca.addEventListener('click', finestra);


const form1 = document.querySelector('#domanda1');
form1.addEventListener('submit', search1);

const form2 = document.querySelector('#domanda2');
form2.addEventListener('submit', search2);

const modalView =document.querySelector('#exit');
modalView.addEventListener('click', chiudiModale);
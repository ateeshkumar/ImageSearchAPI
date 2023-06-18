const API_KEY = 'EuflDwf2CEnfWGArMBTvPILYdNvHMtzcCoSxZy_mjBA';
window.onload = function(){
const API_URL = 'https://api.unsplash.com/search/photos'
const form = document.querySelector('form');
const input = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.getElementById('show-more');
const searchButton = document.getElementById('search-button');


let inputData = "";
let page = 1;



const searchImage = async ()=>{
    inputData = input.value;
    const url = `${API_URL}?page=${page}&query=${inputData}&client_id=${API_KEY}`;
    
    const responce = await fetch(url);
    const data = await responce.json();
    const results = data.results;

    console.log(results);
    if(page===1){
        searchResults.innerHTML = "";
    }
    results.map((result)=>{
        const div = document.createElement('div');
        div.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        div.appendChild(image);
        div.appendChild(imageLink);
        searchResults.appendChild(div);
    });
    page++;
    if(page>1){
        showMore.style.display = 'block';
    }

}
// searchImage();

function onSubmit(e){
    e.preventDefault();
    page = 1;
    searchImage();
}

input.addEventListener('submit',onSubmit);
showMore.addEventListener('click',onSubmit);
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    page = 1;
    searchImage();
});
}
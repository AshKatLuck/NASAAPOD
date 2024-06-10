const resultsNav=document.getElementById("resultsNav");
const favouritesNav=document.getElementById("FavouritesNav");
const imagesContainer=document.querySelector(".images-container");
const saveConfirmed=document.querySelector(".save-confirmed");
const loader=document.querySelector(".loader");


//url data
const apiKey='LbpfAsiA5nGcgfxuS9fYhX5txFazg8FFvBE9nkcv';
const count=10;
const apiURL=`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

//global varibles
let resultsArray=[];
let favourites={};
let displayArray=[];

function createDOMNodes(page){
    if(page=='favourites'){
        displayArray=Object.values(favourites);
    }else{
        displayArray=resultsArray;
    }

      displayArray.forEach((result)=>{
        const card=document.createElement("div");
        card.classList.add("card");
        const anchor=document.createElement("a");
        anchor.title="View Full Image";
        anchor.href=result.hdurl;
        anchor.target='__blank';
        const image=document.createElement("img");
        image.classList.add("card-img-top");
        image.src=result.url;
        image.loading='lazy';
        image.alt='NASA picture of the day';
        anchor.appendChild(image);

        const cardBody=document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle=document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText=`${result.title}`;
        const addToFavourites=document.createElement("p");
        addToFavourites.classList.add("clickable");
        if(page=='results'){
            addToFavourites.innerText='Add to Favourites';
            addToFavourites.setAttribute('onclick',`saveFavourites('${result.url}')`);
        }else{
            addToFavourites.innerText='Remove from favourites';
            addToFavourites.setAttribute('onclick', `deleteFavourite('${result.url}')`);
        }
        
        const cardText=document.createElement("p");
        cardText.classList.add('card-text');
        cardText.innerText=`${result.explanation}`;
        
        const small=document.createElement("small");
        small.classList.add('text-muted');
        const date=document.createElement("strong");
        date.innerText=`${result.date}`;
        const copyright=document.createElement("span");
        if(!result.copyright){
            copyright.innerText='';
        }else{
            copyright.innerText=`${result.copyright}`;
        }
        
        small.appendChild(date);
        small.appendChild(copyright);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(addToFavourites);
        cardBody.appendChild(cardText);
        cardBody.appendChild(small);

        card.appendChild(anchor);
        card.appendChild(cardBody);
        imagesContainer.appendChild(card);
        
        
    });
}

//function to update DOM
function updateDOM(){
    imagesContainer.innerHTML='';
    //check if favourites are there in local storage
    if(localStorage.getItem('nasaFavourites')){
        favourites=JSON.parse(localStorage.getItem('nasaFavourites'));
    }
    createDOMNodes('favourites');
}

//function to get Nasa pictures
async function getNASAPictures(){
    try{
        const results=await fetch(apiURL);
        resultsArray=await results.json();
        // console.log(resultsArray)
        updateDOM('results');

    }catch(e){
        console.log(e);
    } 
}

//function to save favourites url
function saveFavourites(itemURL){
    resultsArray.forEach((item)=>{
        if((item.url.includes(itemURL)) && !favourites[itemURL]){
            favourites[itemURL]=item;
            console.log(favourites);
            //show the save confirmation for 3 seconds
            saveConfirmed.classList.remove("hidden");
            setTimeout(()=>{
                saveConfirmed.classList.add("hidden");
            },3000)
            localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
        }
    })
}

//function to delete a url from favourtites
function deleteFavourite(itemUrl){
    if(favourites[itemUrl]){
        delete favourites[itemUrl];
        localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
        updateDOM('favourites');
    }
}

//Onload
getNASAPictures();

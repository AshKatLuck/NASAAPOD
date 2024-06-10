const resultsNav=document.getElementById("resultsNav");
const favouritesNav=document.getElementById("FavouritesNav");
const imagesContainer=document.querySelector(".images-container");
const saveConfirmed=document.querySelector(".save-confirmed");
const loader=document.querySelector(".loader");


//url data
const apiKey='LbpfAsiA5nGcgfxuS9fYhX5txFazg8FFvBE9nkcv';
const count=10;
const apiURL=`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray=[];

//function to update DOM
function updateDOM(){
    resultsArray.forEach((result)=>{
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
        addToFavourites.innerText='Add to Favourites';
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

//function to get Nasa pictures
async function getNASAPictures(){
    try{
        const results=await fetch(apiURL);
        resultsArray=await results.json();
        console.log(resultsArray)
        updateDOM();

    }catch(e){
        console.log(e);
    } 
}

//Onload
getNASAPictures();
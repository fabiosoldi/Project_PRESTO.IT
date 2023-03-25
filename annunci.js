let icona = document.querySelector('#Iconflip');
let iconabox = document.querySelector('#Iconhide');
let posizione = false;

icona.addEventListener('click', ()=>{
if( posizione == false)
{
icona.style.transform = 'rotate(180deg)';
posizione = true;
}
else{
icona.style.transform = 'rotate(0deg)';
posizione = false;
}
});

let navbar = document.querySelector('#navbarId');
let navbarco = document.querySelector('.navbarIdc')
let conteinerNav = document.querySelector('#conteinerNav');

document.addEventListener('scroll', ()=>{

    if(window.scrollY>0){
        conteinerNav.style.height = '100px';
        navbar.style.backgroundColor = 'var(--giallo)';
        navbarco.style.backgroundColor = 'var(--giallo)';
        iconabox.classList.add('d-none');
    }
    else if(window.scrollY==0){
        conteinerNav.style.height = '80px';
        navbar.style.backgroundColor = '';
        navbarco.style.backgroundColor = '';
        iconabox.classList.remove('d-none');
    }

});

fetch("./annunci.json").then( (response)=> response.json() ).then( (data)=>{

    let contenitoreCategorie = document.querySelector('#contenitoreCategorie');
    let contenitoreCards = document.querySelector('#contenitoreCards');

    function filtroCategorie(){

        let categorie = data.map((categoria)=>categoria.category)
        let arrayCat = [];

        categorie.forEach((categoria)=>{
            if(!arrayCat.includes(categoria)){
                arrayCat.push(categoria);
            }
        });

        arrayCat.forEach((categoria)=>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}"></input>

            <label class="form-check-label font" for="${categoria}">
              ${categoria}
            </label>`;
            
            contenitoreCategorie.appendChild(div);
        })
    }


    filtroCategorie();


function showCards(array){

    contenitoreCards.innerHTML = '';

    array.sort(( a , b )=> Number(b.price - a.price));

    array.forEach( (element, i)=>{

        let div = document.createElement('div');

        div.classList.add('col-12', 'col-md-3', 'my-3', 'd-flex', 'justify-content-center');

        div.innerHTML = `
        
                <div class="announcementCard">
                    <div class="card-head">
                        <img src="https://picsum.photos/${200+i}" alt="">
                    </div>
                   
                    <p class="h3">${element.name}</p>
                    <p class="h3">${element.category}</p>
                    <p class="h3">${element.price} €</p>
                </div>
        
        `;

        contenitoreCards.appendChild(div);
    

    } )

}

showCards(data);

//  evento sui radio button per filtrare per categoria

let checkInputs = document.querySelectorAll('.form-check-input');

checkInputs.forEach( (checkInput)=>{

    checkInput.addEventListener('click', ()=>{

        globalFilter();

    })

})

// fine funzione mostra card su array filtrato per categoria

function filteredByCategory(array){

    // per trasformare una node-list in un array, utilizziamo il macrooggetto Array, con il metodo .from()
    // a partire dalla node-list "checkInputs", trasformamela in un array

    let arrayFromNodelist = Array.from(checkInputs);
    
    let button = arrayFromNodelist.find( (button)=> button.checked );
    
    let categoria = button.id;

   

    if( categoria != 'All'){

        let filtered = array.filter( (annuncio)=> annuncio.category == categoria);

    

        return filtered;

    } else {

        return data ;

    }

   
}


// metodo per settare il max price input

let incrementaNumber = document.querySelector('#incrementNumber');

let priceInput = document.querySelector('#priceInput');

function setPriceInput(){

let prices = data.map((categoria)=> Number(categoria.price));

let maxPrice = (Math.max(...prices));

priceInput.max = maxPrice;

priceInput.value = maxPrice;

incrementaNumber.innerHTML = maxPrice;


}

setPriceInput();

// fine metodo per settare il max price input


// funzione che filtra per prezzo

function filteredByPrice(array){

let filtered = array.filter((categoria)=> Number(categoria.price <= priceInput.value));

return filtered;

}


//evento input dell'input range

priceInput.addEventListener('input', ()=>{

incrementaNumber.innerHTML = priceInput.value;


globalFilter();

})

// fine funzione che filtra per prezzo


// filtro per parola

let wordInput = document.querySelector('#wordInput');

let Cerca = document.querySelector('#searchBtn');

function filteredByWord(array){

let nome = wordInput.value;

let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()) );

return filtered;

}


// // evento input filtro per parola

// wordInput.addEventListener('input', ()=>{

// globalFilter();

// })

searchBtn.addEventListener('click', ()=>{
    
    globalFilter();
    
})

// funzione globale che filtra tutti i filtri

function globalFilter(){

let filterByCategory = filteredByCategory(data);

let filterByPrice = filteredByPrice(filterByCategory);

let filterByWord = filteredByWord(filterByPrice);

showCards(filterByWord);

}

})

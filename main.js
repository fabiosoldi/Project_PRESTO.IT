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

let primoSpan = document.querySelector('.numSpan1');
let secondoSpan = document.querySelector('.numSpan2');
let terzoSpan = document.querySelector('.numSpan3');

function incrementNum (finalNum, el){
    let conta = 0;
    let interval = setInterval(()=>{
        
        conta++;
        if(conta<finalNum){
        
            conta++;
            el.innerHTML = conta;
        
        } else{
        
            clearInterval(interval);
        
        }
    })
};

let intersecazione = true;
let observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && intersecazione == true){
            incrementNum(1250, primoSpan);
            incrementNum(2030, secondoSpan);
            incrementNum(1301, terzoSpan);
            
            intersecazione = false;

        }
    })

})
observer.observe(primoSpan);
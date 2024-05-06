 let cardsWrapper = document.querySelector('#cardsWrapper');
 let categoriesWrapper=document.querySelector("#categoriesWrapper")
 let navbar= document.querySelector('#navbar');
let dropdownmenu= document.querySelector('.dropdown-menu')
let navlink = document.querySelectorAll('.nav-link')
let btnsearch= document.querySelector("#btnsearch")
let priceInput=document.querySelector("#priceInput")
let priceLabel=document.querySelector("#priceLabel")
let wordInput=document.querySelector("#wordInput")
window.addEventListener('scroll',() => {
  if(window.scrollY > 100){
      navbar.classList.add('bg-custom-color')
      dropdownmenu.classList.add('bgdropd')
      navlink.forEach((link)=>{
          link.style.color='yellow'
      })
      
      btnsearch.classList.add("bgbtnsearch")
  }else {
      navbar.classList.remove('bg-custom-color')
      navlink.forEach((link)=>{
          link.style.color='black'
       })
       dropdownmenu.classList.remove('bgdropd')
       btnsearch.classList.remove("bgbtnsearch")

  }
})
//  abbiamo  collegato json per creare le nostre card 
 fetch('./annunci2.json')
//  ci permette di estrarre un contenuto del file e ci ritorna sotto forma di "promise"
.then((response)=> response.json())
// il primo"then" ci ritorna un array di oggetti
.then((data)=>{
  function setCategoryFilter(){
    let categories= data.map((prodotti) => prodotti.category)
    // abbiamo creato un array con solo categorie
    let oneCategories= []
    categories.forEach((category) =>{
      if(!oneCategories.includes(category)){
             oneCategories.push(category)
            }
            
          })
    oneCategories.forEach((oneCategorie)=>{
      let div= document.createElement("div");
      div.classList.add("form-check")
      div.innerHTML=`
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="${oneCategorie}">
          <label class="form-check-label" for="${oneCategorie}">
           ${oneCategorie}
          </label>`
        
          categoriesWrapper.appendChild(div)
    })


          
  }
  setCategoryFilter()

// mentre il secondo i singoli oggetti di un array
function showCards (array){
  cardsWrapper.innerHTML="";
  array.sort((a,b)=>+b.price- +a.price)
  array.forEach((prodotti) => {
    // qui aggiungiamo ogni singolo prodotto alle card
      let div = document.createElement('div');
div.classList.add('col-12','col-md-4','d-flex', 'justify-content-around');
  div.innerHTML=`<div class="card mt-2 me-2 p-1" style="width: 18rem;">
  <img src="${prodotti.url}" class="card-img-top custom-img" alt="...">
  <div class="card-body ">
    <h5 class="card-title text-truncate" title="${prodotti.name}">${prodotti.name}</h5>
    <div class="d-flex justify-content-between">
    <p class="card-text">${prodotti.category}</p>
    <h5 class="card-title fw-bold">€${prodotti.price}</h5>
    </div>
    <a href="#" class="btn btn-outline-dark d-flex justify-content-around w-100 p-2 mb-0">Aggiungi al carrello<i class="bi bi-cart4"></i></a>
  </div>
</div>
  `
cardsWrapper.appendChild(div)
      
  });

  }

  showCards(data)




// eventi



// FILTRI

// cattura

let radioInputs=document.querySelectorAll(".form-check-input")


// filtro per categoria


function filterByCategory(){
  let arrayInput = Array.from(radioInputs)
  
  let checkedRadio= arrayInput.find((radio)=>radio.checked).id
  if (checkedRadio!="All"){
   let filtered= data.filter((prodotti)=> prodotti.category==checkedRadio);
   showCards(filtered)
  }else{
    showCards(data)
  }

  
}

// evento per filtro categoria
radioInputs.forEach((input)=>{
  input.addEventListener("click",()=>{
filterByCategory()})
})

//parte filtro prezzo
function findMaxprice() {
  let maxPrice=data.map((prodotti)=>+(prodotti.price)).sort((a,b)=>b-a)[0];
priceInput.max=maxPrice
priceInput.value=maxPrice

}

findMaxprice()

function filterByprice() {
  let filtered=data.filter((prodotti)=>+(prodotti.price)<=+(priceInput.value))
  ;
showCards(filtered)
}

// evento per filtro prezzo
priceInput.addEventListener('input',()=>{
  priceLabel.innerHTML=`€${priceInput.value}`
  filterByprice()})



//filtro per nome

function filterByword() {
  let searchedName=wordInput.value
  let filtered=data.filter((prodotti)=>prodotti.name.toLowerCase().includes(searchedName))
showCards(filtered)}
// evento per filtro nome
wordInput.addEventListener('input',()=> {
 filterByword()
})




// function globalfilter(){
//   let filterByCategory= filterByCategory(data)
//   let filterByprice=filterByprice(filterByCategory)
//   let filterByword=filterByword(filterByprice)
//   showCards(filterByword)
//   ;
// }














}
)

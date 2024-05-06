// prendiamo le classi e gli id
let navbar= document.querySelector('#navbar');
let dropdownmenu= document.querySelector('.dropdown-menu')
let navlink = document.querySelectorAll('.nav-link')
let btnsearch= document.querySelector("#btnsearch")
let span1= document.querySelector("#span1")
let span2= document.querySelector("#span2")
let span3= document.querySelector("#span3")

// eventi
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
// inizializzare la libreria
AOS.init();


// chiamata asincrona
function createInt ( final ,element){
    let counter= 0
    let interval=setInterval(()=>{
       if(counter<final){
       counter++
       element.innerHTML=counter
   
   
       }else {
          clearInterval(interval);
       }
   },)

}
createInt(500,span1,)
createInt(200,span2,)
createInt(300,span3,)


// // intersection observer
let confirm= false 
let observer= new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting && confirm==false){
    createInt(500,span1)
createInt(200,span2)
createInt(300,span3)
confirm=true;
setTimeout(()=>{
    confirm=false;
   
},8000)
} 
})
})
observer.observe(span1)





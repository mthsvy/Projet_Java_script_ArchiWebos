const openModal = function(e) {
    e.preventDefault();

}

document.querySelectorAll(".openModal").forEach( a =>{
    a.addEventListener("click" , openModal)
    
})

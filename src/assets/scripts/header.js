const toggleButton = document.getElementsByClassName("toggle-button")[0];
const navBarLinks = document.getElementsByClassName("navbar-links")[0];
toggleButton.addEventListener('click', ()=>{
//   navBarLinks.classList.add('displayNav');
    document.querySelector("#navbar-links").classList.add("displayNav");
    alert('hello')
});


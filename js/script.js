// =====================================
// KRYSTAL INTERNATIONAL WEBSITE SCRIPT
// =====================================



console.log(
    "Krystal International Website Loaded"
);





// =====================================
// MOBILE MENU
// =====================================



const menuBtn = document.querySelector(
    ".menu-btn"
);


const navbar = document.querySelector(
    "#navbar"
);



if(menuBtn){


menuBtn.addEventListener(
"click",
()=>{


navbar.classList.toggle(
    "active"
);



menuBtn.classList.toggle(
    "open"
);



});



}








// =====================================
// CLOSE MENU AFTER CLICK
// =====================================



const navLinks =
document.querySelectorAll(
"#navbar a"
);



navLinks.forEach(
(link)=>{


link.addEventListener(
"click",
()=>{


navbar.classList.remove(
"active"
);


});


});








// =====================================
// HEADER SCROLL EFFECT
// =====================================



const header =
document.querySelector(
"header"
);



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 50){


header.classList.add(
"scrolled"
);



}

else{


header.classList.remove(
"scrolled"
);


}



});









// =====================================
// AUTO COPYRIGHT YEAR
// =====================================



const year =
new Date().getFullYear();



const copyright =
document.querySelector(
".copyright"
);



if(copyright){


copyright.innerHTML =

`© ${year} Krystal International All Rights Reserved.`;



}








// =====================================
// SMOOTH SCROLL
// =====================================



document.querySelectorAll(
'a[href^="#"]'
)

.forEach(
(anchor)=>{


anchor.addEventListener(
"click",
function(e){


e.preventDefault();



document.querySelector(
this.getAttribute("href")
)

.scrollIntoView({

behavior:"smooth"

});



});


});








// =====================================
// IMAGE LOADING ANIMATION
// =====================================



const images =
document.querySelectorAll(
"img"
);



images.forEach(
(img)=>{


img.addEventListener(
"load",
()=>{


img.classList.add(
"loaded"
);


});


});
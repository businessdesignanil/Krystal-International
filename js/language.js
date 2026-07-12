const switcher =
document.getElementById(
"languageSwitcher"
);



switcher.addEventListener(
"change",
()=>{


let lang =
switcher.value;



if(lang==="en"){


document.getElementById(
"heroText"
).innerHTML=

"Creating Future With Trust And Quality";


}



else{


document.getElementById(
"heroText"
).innerHTML=

"信頼と品質で未来を創る";


}



});

// =====================================
// KRYSTAL INTERNATIONAL LANGUAGE SYSTEM
// Japanese / English
// =====================================


const languageSwitcher =
document.getElementById("languageSwitcher");





const translations = {


jp:{


home:"ホーム",

about:"会社概要",

business:"事業内容",

news:"ニュース",

contact:"お問い合わせ",



heroTitle:
"Krystal International",


heroText:
"信頼と品質で未来を創る",


heroButton:
"詳しく見る",




aboutTitle:
"会社概要",


aboutText:
"Krystal International は、日本でレストラン事業、食品販売事業を展開しています。",



businessTitle:
"事業内容",



asha:
"ASHA Minamiurawa Ten",

milan:
"Milan Restaurant",

mart:
"Krystal Mini Mart",




newsTitle:
"最新ニュース",


newsText:
"公式ウェブサイトを公開しました。",




contactTitle:
"お問い合わせ",


contactText:
"お気軽にお問い合わせください"



},





en:{


home:"Home",

about:"About",

business:"Business",

news:"News",

contact:"Contact",




heroTitle:
"Krystal International",


heroText:
"Creating Future With Trust And Quality",


heroButton:
"Learn More",





aboutTitle:
"About Company",



aboutText:
"Krystal International operates restaurant businesses and food retail services in Japan.",




businessTitle:
"Our Businesses",



asha:
"ASHA Minamiurawa Ten",


milan:
"Milan Restaurant",


mart:
"Krystal Mini Mart",





newsTitle:
"Latest News",



newsText:
"Krystal International official website has launched.",





contactTitle:
"Contact Us",



contactText:
"Feel free to contact us anytime."



}


};









function changeLanguage(lang){



const text =
translations[lang];



if(!text) return;





// Find all translated elements


document.querySelectorAll(
"[data-lang]"
)

.forEach(element=>{


const key =
element.getAttribute(
"data-lang"
);



if(text[key]){


element.innerHTML =
text[key];


}


});





// Save language

localStorage.setItem(
"language",
lang
);



}








// Language selector


if(languageSwitcher){


languageSwitcher.addEventListener(
"change",
()=>{


changeLanguage(
languageSwitcher.value
);


});


}







// Load saved language


const savedLanguage =
localStorage.getItem(
"language"
)
||
"jp";



if(languageSwitcher){

languageSwitcher.value =
savedLanguage;

}



changeLanguage(
savedLanguage
);
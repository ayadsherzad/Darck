let homeicon = document.getElementById('home-icon');
let lawicon = document.getElementById('law-icon');
let infoicon = document.getElementById('info-icon');
let backtolaw = document.getElementById('backtolaw');


var dark = document.getElementById("dark");


 dark.onclick = function(){
    var SetTheme = document.body;
    SetTheme.classList.toggle("dark-theme")
    var theme;


    if(SetTheme.classList.contains("dark-theme")){
        console.log("Dark mode");
        theme = "DARK";
        
    }else{
        console.log("Light mode");
        theme = "LIGHT";
      
        
    }
    
    localStorage.setItem("PageTheme", JSON.stringify(theme));
    
}

setInterval(() => {
    let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
    console.log(GetTheme);
    if(GetTheme === "DARK"){
        document.body.classList = "dark-theme";
        dark.checked = true; 
    }else{
        document.body.classList = "";
        dark.checked = false;
    }
}, 0);


document.getElementById("info_label").innerHTML = ((navigator.userAgent).match(/OS (\d)?\d_\d(_\d)?/i)[0].replace(/_/g,".").replace("OS","iOS") + " - FEYE V1.0"); 





function show(elementID) {
  const ele = document.getElementById(elementID);
  if (!ele) {
    alert("no such element");
    return;
  }

 
  const pages = document.getElementsByClassName('page');

  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
if (elementID ==='home'){
infoicon.style.filter = 'invert(50%)';
lawicon.style.filter = 'invert(50%)';
}
if (elementID ==='law'){
homeicon.style.filter = 'invert(50%)';
infoicon.style.filter = 'invert(50%)';
}
if (elementID ==='info'){
homeicon.style.filter = 'invert(50%)';
lawicon.style.filter = 'invert(50%)';
}
  }

if (elementID === 'home'){
homeicon.style.filter = 'sepia(100%) hue-rotate(190deg) saturate(500%)';}
if (elementID === 'law'){
lawicon.style.filter = 'sepia(100%) hue-rotate(190deg) saturate(500%)';
}
if (elementID === 'info'){
infoicon.style.filter = 'sepia(100%) hue-rotate(190deg) saturate(500%)';
}
ele.style.display = 'block';
 

  
}

function hide(elementID) {
  const eele = document.getElementById(elementID);
  if (!eele) {
    alert("no such element");
    return;
  }

 
  const laws = document.getElementsByClassName('laws');
  for (let i = 0; i < laws.length; i++) {

    laws[i].style.display = 'none';

  }


backtolaw.style.display = 'block';
eele.style.display = 'block';

if (document.getElementById('laws').style.display === 'block'){
    backtolaw.style.display = 'none';
}
  
}







var x;
//localStorage.setItem(keyname, 20);
function setVale(val){
    x=val;
    console.log(x);
}
function localVar(value){
    localStorage.setItem("country", value);
    widows.redirect()
}
async function valueChange(value){
    
    value=document.getElementById("search").value;
    if(value=="")
    value='a';
    try{
var b = await fetch("https://restcountries.eu/rest/v2/name/"+value).then(res=>res.json()).then(posts=>setVale(posts));    
    }
    catch{
        console.log("waiting");
    }
    console.log(b);
    var cardcontainer=document.getElementById("cardcontainer");
 if(x.status==404){
    cardcontainer.innerHTML="<h2>Sorry! No result Found</h2>";
 }   
 else{

cardcontainer.innerHTML="";
            for(var i=0;i<x.length && i<10 ;i++){
                var temp="<a href='./detailed.html'><div class='card'onclick='localVar (\""+x[i].name+"\")'><img width='200px' height='150px'src="+x[i].flag+"></img><div class='ctry'>"+x[i].name+"</div><div class='cap'> Capital: "+x[i].capital+"</div></div></a>";
                cardcontainer.innerHTML+=temp;
                }
            }
}

function localVar(value){
    localStorage.setItem("country", value);//
}
//this fuction called when the input box is updated 
async function valueChange(value){
    var x;    // to store data retrived from api
    value=document.getElementById("search").value;  // getting value inside the text box
    if(value=="") // if value is null then value is set to a because it shows null on passing empty string
    value='a';
    try{
        //fetting data from API
     var b = await fetch("https://restcountries.eu/rest/v2/name/"+value).then(res=>res.json()).then(posts=>x=posts);    
    }
    catch{
        //any error then updated here
        document.getElementById("cardcontainer").innerHTML="<p>Sorry unable to load data. Please check internet connection</p>";
        console.log("Error occured");
    }
    //console.log(b);
    var cardcontainer=document.getElementById("cardcontainer");//getting container of cards
            if(x.status==404){
                //cecking status if value returnd is null then it was displayed
                cardcontainer.innerHTML="<h2>Sorry! No result Found</h2>";
            }   
            else{
                cardcontainer.innerHTML=""; //making card container epmty
             for(var i=0;i<x.length && i<10 ;i++){//the card is restricted to 10 on considering perfomance on mind
                //card ws creatd with flag, country name and  capital name
                var temp="<a href='./detailed.html'><div class='card'onclick='localVar (\""+x[i].name+"\")'><img width='200px' height='150px'src="+x[i].flag+"></img><div class='ctry'>"+x[i].name+"</div><div class='cap'> Capital: "+x[i].capital+"</div></div></a>";
                //card added to the cardcontainer
                cardcontainer.innerHTML+=temp;
                }
            }
}
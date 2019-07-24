var countyName=localStorage.getItem('country');

valueChange();
async function valueChange(){
    
var b = await fetch("https://restcountries.eu/rest/v2/name/"+countyName+"?fullText=true").then(res=>res.json()).then(posts=>x=posts);    

var cardcontainer     =document.getElementById("root");

//                var temp="<a href='./detailed.html'><div class='card'onclick='localVar (\""+x[0].name+"\")'><img width='200px' height='150px'src="+x[0].flag+"></img><div class='ctry'>"+x[0].name+"</div><div class='cap'> Capital: "+x[0].capital+"</div></div></a>";
                
                document.getElementById("cntryName").innerHTML=x[0].name;
                document.getElementById("flag").setAttribute('src',x[0].flag);
                document.getElementById("capital").innerText="Capital city : "+x[0].capital;
                var temp="";

                for(var i=0;i<x[0].currencies.length;i++){
                    temp+=x[0].currencies[i]["code"]+" - "+x[0].currencies[i]["name"]+" - "+x[0].currencies[i]["symbol"];
                    console.log(temp);
                }
                document.getElementById("currencies").innerText=temp;
                temp=""; 
                for(var i=0;i<x[0].altSpellings.length;i++){
                    temp+=x[0].altSpellings[i]+", ";
                    console.log(temp);
                }
                document.getElementById("altrNam").innerText=" Alternative Names: "+temp.substr(0,temp.length-2);
                document.getElementById("region").innerText=" Region : "+x[0].region;
                
                temp=""; 
                for(var i=0;i<x[0].borders.length;i++){
                    temp+=x[0].borders[i]+", ";
                    console.log(temp);
                }
                document.getElementById("borders").innerText=temp.substr(0,temp.length-2);
                temp=""; 
                for(var i=0;i<x[0].timezones.length;i++){
                    temp+=x[0].timezones[i]+", ";
                    console.log(temp);
                }

                document.getElementById("timezone").innerText=temp;

                temp=""; 
                for(var i=0;i<x[0].languages.length;i++){
                    temp+=x[0].languages[i]["name"]+", ";
                    console.log(temp);
                }

                document.getElementById("languages").innerText=temp.substr(0,temp.length-2);
                document.getElementById("latlang").innerHTML="Latitude : "+x[0].latlng[0]+"<br>     Longditude : "+x[0].latlng[1];
                document.getElementById("population").innerText="Population : "+x[0].population;
                document.getElementById("area").innerHTML="Area : "+x[0].area+" m<sup>2</sup>";
                temp=""; 
                for(var i=0;i<x[0].regionalBlocs.length;i++){
                    temp+=x[0].regionalBlocs[0].name+"(" +x[0].regionalBlocs[0].acronym+"), ";
                    console.log(temp);
                }
                document.getElementById("blocks").innerText=temp.substr(0,temp.length-2);
                document.getElementById("call").innerText="Calling Codes: "+x[0].callingCodes;
                temp=""; 
                for(var i=0;i<x[0].topLevelDomain.length;i++){
                    temp+=x[0].topLevelDomain[i]+", ";
                    console.log(temp);
                }


                document.getElementById("domain").innerText="Country Domains: "+temp.substr(0,temp.length-2);
                document.getElementById("subregion").innerText="Subregion: "+x[0].subregion;
                
                
                
                }
            
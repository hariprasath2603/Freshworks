var countyName=localStorage.getItem('country'); //reading the respective  country name to be displayed
document.title=countyName; //change the title of the page to countries name
valueChange();      // caling the below function


async function valueChange(){
 // fetching value of the particular country using the api   
 try{
    await fetch("https://restcountries.eu/rest/v2/name/"+countyName+"?fullText=true").then(res=>res.json()).then(posts=>x=posts);    




                
                document.getElementById("cntryName").innerHTML=x[0].name; // setting country name
                document.getElementById("flag").setAttribute('src',x[0].flag); // seting url for flag image
                document.getElementById("capital").innerText="Capital city : "+x[0].capital; // country capital
                // when more then then one values are in list format then this loop is executed 
                var temp="";
                for(var i=0;i<x[0].currencies.length;i++){
                    temp+=x[0].currencies[i]["code"]+" - "+x[0].currencies[i]["name"]+" - "+x[0].currencies[i]["symbol"]; // currency  contains three compinent- name,
                    //console.log(temp);                                                                                    // symbol, representation of currency
                }
                document.getElementById("currencies").innerText=temp; //setting currency 
                // loading various name of the countery
                temp=""; 
                for(var i=0;i<x[0].altSpellings.length;i++){
                    temp+=x[0].altSpellings[i]+", ";
                    //console.log(temp);
                }
                document.getElementById("altrNam").innerText=" Alternative Names: "+temp.substr(0,temp.length-2);//last toe didgit consist of ", " so deleted
                document.getElementById("region").innerText=" Region : "+x[0].region;// region was updated
                //neighbouring countries
                temp=""; 
                for(var i=0;i<x[0].borders.length;i++){
                    temp+=x[0].borders[i]+", ";
                    //console.log(temp);
                }
                document.getElementById("borders").innerText=temp.substr(0,temp.length-2);// updating neighbouring countries
                
                //loading various time zones
                temp=""; 
                for(var i=0;i<x[0].timezones.length;i++){
                    temp+=x[0].timezones[i]+", ";
                    //console.log(temp);
                }

                document.getElementById("timezone").innerText=temp;//updating time zones

                //languages used inside the country
                temp=""; 
                for(var i=0;i<x[0].languages.length;i++){
                    temp+=x[0].languages[i]["name"]+", ";
                    //console.log(temp);
                }

                document.getElementById("languages").innerText=temp.substr(0,temp.length-2);//languages updated

                document.getElementById("latlang").innerHTML="Latitude : "+x[0].latlng[0]+"<br>     Longditude : "+x[0].latlng[1];//latitude and longditude are updated

                document.getElementById("population").innerText="Population : "+x[0].population;// updating population of country
                document.getElementById("area").innerHTML="Area : "+x[0].area+" m<sup>2</sup>";// updating area of country and adding m^2 to at last
                
                // organization in which the country part of 
                temp=""; 
                for(var i=0;i<x[0].regionalBlocs.length;i++){
                    temp+=x[0].regionalBlocs[0].name+"(" +x[0].regionalBlocs[0].acronym+"), ";
                    //console.log(temp);
                }
                document.getElementById("blocks").innerText=temp.substr(0,temp.length-2); // updating the organiztions

                document.getElementById("call").innerText="Calling Codes: "+x[0].callingCodes;//updating the call codes of the country
                //domains related to the country like .in, .us, .uk
                temp=""; 
                for(var i=0;i<x[0].topLevelDomain.length;i++){
                    temp+=x[0].topLevelDomain[i]+", ";
                    //console.log(temp);
                }


                document.getElementById("domain").innerText="Country Domains: "+temp.substr(0,temp.length-2);// updating the domain's
                document.getElementById("subregion").innerText="Subregion: "+x[0].subregion; //updating the suregions
                
            }
            catch{
                //cation is displayed if any problem on connectio or on loading API
                document.getElementById("root").innerHTML="<p>Sorry unable to load data. Please check internet connection</p>"
                console.log("Problem on loading data");
            }           
                
                }
            
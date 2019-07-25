const express = require("express"); //imported express modudel for get some basic server features
var sizeof = require('object-sizeof')// this module is to calculate size of the objects
var fs = require('fs');// files module

var dbPath= "./db.json"; //default datata base path

const app = express();//creating express app
app.use(express.json()); // allowing express to use json

//this is the api call for set the database location if it is now working then default locatioon is used 
app.get('/setDBPath/:url',(req,res)=>{
        if( fs.readFileSync(req.params.url))
        {
            dbPath=req.params.url;                // if sucessful then url is chaged and info is send
        res.send("Sucessfully updated");
        }
        else{
            res.status(404).send("Please give some valid path");        // other wise 404 error is thrown
        } 
        });

    // this is a adition feature i made it for the displaying all the value and key pairs in database
    app.get('/get/all',(req,res)=>{
    var data= fs.readFileSync(dbPath);     // opening database
    var jsondata=JSON.parse(data.toString()); //parsing database to JSON 
    if(jsondata.database){
        res.send(jsondata.database);       // if database exit means all key value pairs are sent 
    }
    else{
        res.status(404).send("No entries found");  //otherwise error is thrown
    }

});


// this is to rad particular key's value 
app.get('/get/:id',(req,res)=>{
    var now=new Date();                 // data variable
    var data= fs.readFileSync(dbPath);
    var jsondata=JSON.parse(data.toString());
    var key=req.params.id;               // to capture required key value whose value we are gonea return

    if(jsondata.database[key]){      // checking if key is existing or not
        if(jsondata.database[key][0]!= Infinity && jsondata.database[key][0]<now){  // checking time to live
            res.send("Time limit exeds");     
        }else
        res.send(jsondata.database[key][1]);     // if all conditions are satisfied means the value is returened as the JSON object
    }
    else{
        res.status(404).send("Key Not found");     
    }
    //console.log(jsondata.database["key1"]);
});


// this call is to delete the key value pair by sending key value
app.get('/delete/:id',(req,res)=>{
    var now = new Date();          
    var data= fs.readFileSync(dbPath);
    var jsondata=JSON.parse(data.toString());    // initaializations as like previous
    var key=req.params.id;

    if(jsondata.database[key]){
        if(jsondata.database[key][0]!= Infinity && jsondata.database[key][0]<now){   // checking time to live
            res.send("Time limit exeds");    
        }
        else{    
        delete jsondata.database[key]                               // value is deleted
        fs.writeFileSync(dbPath,JSON.stringify(jsondata));       // then updated to the database
        res.send("sucessfully deleted");      // respose that data was deleted
          }       
    }
    else{
        res.status(404).send("Key Not found");                      // if key is not fount then 404 was sent
    }
    //console.log(jsondata.database["key1"]);
    });
    

// creating the key value pair
app.post('/create',(req,res)=>{
    var now = new Date();   //creating date object
    var jsondata={};          //empty json object
    var data= fs.readFileSync(dbPath);   //opeing db path
    if(data.length==0){
        jsondata["database"]={};    // id db is not there means creating database 
    }
    else{
    jsondata=JSON.parse(data.toString());     
    }
    var body=req.body;           // getting the json object sent over the post methode body
    //console.log(req);
    
    if(sizeof(jsondata)+sizeof(req.body)>1000000000){                 // checking wheather one GB is exteding or not 
        res.send("Maximum size of database reached..");                 
    }
    else
    if(!jsondata.database[body.key])                           // checking whether key is already exist 
    {
        if(body.key.length>32)                 // resticting key lenth to 32 characters
        {
            res.status(404).send("Key size exedes...");   
        }
        
        else if(sizeof(body.value)<64000){                         // restricting value to 64 KB
            if(body.ttl){
                now.setSeconds(now.getSeconds()+body.ttl)                 // if time to live is mention then it is made as tme stamp where after that time is not valid
                jsondata.database[body.key]=[now,body.value];            // inserting in database
                         }
            else{
                jsondata.database[body.key]=[Infinity,body.value];                //if time to live is not mentioned then the it is infinite life time
                }   
            fs.writeFileSync(dbPath,JSON.stringify(jsondata));            // stored over the database
            res.send(jsondata);
        }
        else{
            res.status(404).send("Value size exeds...");   
           }   
    }
    else{
        res.status(404).send("Already data exist");
         }
});


app.listen(3000,()=>{
console.log("Server runing on prt 3000.....")                     // starting server and running on port 3000
})
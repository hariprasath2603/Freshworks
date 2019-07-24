const express = require("express");
var sizeof = require('object-sizeof')
var dbPath= "./db.json";
var fs = require('fs');
const app = express();

app.use(express.json());

app.get('/setDBPath/:url',(req,res)=>{
     if( fs.readFileSync(req.params.url))
    {
        dbPath=req.params.url;
    res.send("Sucessfully updated");
   
    }
    else{
        res.status(404).send("Please give some valid path");
        
    } 
       

    });

app.get('/get/all',(req,res)=>{
var data= fs.readFileSync(dbPath);
var jsondata=JSON.parse(data.toString());
if(jsondata.database){
    res.send(jsondata.database);
}
else{
    res.status(404).send("No entries found");
}

});

app.get('/get/:id',(req,res)=>{
    var now=new Date();
var data= fs.readFileSync(dbPath);
var jsondata=JSON.parse(data.toString());
var key=req.params.id;

if(jsondata.database[key]){
   
    if(jsondata.database[key][0]!= Infinity && jsondata.database[key][0]<now){
        res.send("Time limit exeds");    
    }else
    res.send(jsondata.database[key][1]);
}
else{
    res.status(404).send("Key Not found");
}
//console.log(jsondata.database["key1"]);

});

app.get('/delete/:id',(req,res)=>{
    var now = new Date();
    var data= fs.readFileSync(dbPath);
    var jsondata=JSON.parse(data.toString());
    var key=req.params.id;
    if(jsondata.database[key]){
        if(jsondata.database[key][0]!= Infinity && jsondata.database[key][0]<now){
            res.send("Time limit exeds");    
        }else
{    
        delete jsondata.database[key]
        fs.writeFileSync(dbPath,JSON.stringify(jsondata));
}       
        res.send("sucessfully deleted");
    }
    else{
        res.status(404).send("Key Not found");
    }
    //console.log(jsondata.database["key1"]);
    
    });

    app.get('/mad',(req,res)=>{
           res.status(404).send("Key Not found");
        console.log("hi")
        //console.log(jsondata.database["key1"]);
        
        });
    
    


app.post('/create',(req,res)=>{
    var now = new Date();
    var jsondata={};
    var data= fs.readFileSync(dbPath);
    if(data.length==0){
        jsondata["database"]={};
    }
    else{
    jsondata=JSON.parse(data.toString());
    }
    var body=req.body;
    //console.log(req);
    
    if(sizeof(jsondata)>1000000000){
        res.send("Maximum size of database reached..");
    }
    else
    if(!jsondata.database[body.key]){

        if(body.key.length>32)
        {
            res.status(404).send("Key size exedes...");   
        }
        
        else if(sizeof(body.value)<64000){
            if(body.ttl){
                now.setSeconds(now.getSeconds()+body.ttl)
                jsondata.database[body.key]=[now,body.value];
            }
            else{
                jsondata.database[body.key]=[Infinity,body.value];
            }
            
            
            fs.writeFileSync(dbPath,JSON.stringify(jsondata));
            res.send(jsondata);
        }
        else{
            res.status(404).send("Value size exeds...");   
        }
        
    }
    else{
        res.status(404).send("Already data exist");
    }

})
app.listen(3000,()=>{
console.log("Server runing on prt 3000.....")
})
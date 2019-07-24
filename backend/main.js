const express = require("express");
var sizeof = require('object-sizeof')
  
var fs = require('fs');
const app = express();

app.use(express.json());
//get all key pair values
app.get('/get/all',(req,res)=>{
var data= fs.readFileSync("./db.json");
var jsondata=JSON.parse(data.toString());
if(jsondata.database){
    res.send(jsondata.database);
}
else{
    res.status(404).send("No entries found");
}

});

app.get('/get/:id',(req,res)=>{
var data= fs.readFileSync("./db.json");
var jsondata=JSON.parse(data.toString());
var key=req.params.id;
if(jsondata.database[key]){
    res.send(jsondata.database[key][1]);
}
else{
    res.status(404).send("Key Not found");
}
//console.log(jsondata.database["key1"]);

});

app.get('/delete/:id',(req,res)=>{
    var data= fs.readFileSync("./db.json");
    var jsondata=JSON.parse(data.toString());
    var key=req.params.id;
    if(jsondata.database[key]){
        delete jsondata.database[key]
        fs.writeFileSync("./db.json",JSON.stringify(jsondata));
        
        res.send("sucessfully deleted");
    }
    else{
        res.status(404).send("Key Not found");
    }
    //console.log(jsondata.database["key1"]);
    
    });
    
    


app.post('/create',(req,res)=>{
    
    var data= fs.readFileSync("./db.json");
    var jsondata=JSON.parse(data.toString());
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
                jsondata.database[body.key]=[body.ttl,body.value];
            }
            else{
                jsondata.database[body.key]=[2000,body.value];
            }
            
            
            fs.writeFileSync("./db.json",JSON.stringify(jsondata));
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
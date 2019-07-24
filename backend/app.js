var fs = require('fs');
var db = require("./db.json");
//fs.writeFileSync("./db.json",JSON.stringify(dataTo));
var data= fs.readFileSync("./db.json");
var jsondata=JSON.parse(data.toString());
jsondata.database["key1"]=[40,"value 2"];
if(!jsondata.database["key2"]){
    jsondata.database["key2"]=[40,"value 6"];
}
else{
    console.log("already is there...!");
}
fs.writeFileSync("./db.json",JSON.stringify(jsondata));
console.log(jsondata);
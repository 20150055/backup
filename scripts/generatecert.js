var selfsigned = require('selfsigned');
const fs = require('fs');
var attrs = [{ name: 'commonName', value: 'localhost' }];
var pems = selfsigned.generate(attrs, { days: 10000 });
console.log(pems)


fs.writeFile("../service/cert.cert", pems.cert, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The cert file was created");
}); 
fs.writeFile("../service/key.key", pems.cert, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The key file was created");
}); 
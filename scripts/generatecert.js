var selfsigned = require('selfsigned');
const fs = require('fs');

var attrs = [{ name: 'commonName', value: 'localhost' }];
var pems = selfsigned.generate(attrs, { days: 10000 });


fs.writeFile("../service/build/cert.cert", pems.cert, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The cert file was created");
}); 
fs.writeFile("../service/build/privkey.key", pems.private, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The private key file was created");
}); 
fs.writeFile("../service/build/pubkey.key", pems.public, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The public key file was created");
}); 
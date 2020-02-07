var selfsigned = require('selfsigned');
const fs = require('fs');
const ip = require('ip');
var attrs = [{ name: 'commonName', value: ip.address() }, { name: "subjectAltName", value: ip.address() }];
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
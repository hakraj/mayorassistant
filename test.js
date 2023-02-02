const ip = require("ip");
const geoipLite = require("geoip-lite")
const ipLocation = require('ip-location')

console.log(ip.address());

const geo = geoipLite.lookup(ip.address());
console.log(geo); 



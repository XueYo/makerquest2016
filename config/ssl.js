var fs = require('fs');

module.exports.ssl = {
	
	key: fs.readFileSync('ssl/privkey.pem'),
	cert: fs.readFileSync('ssl/cert.pem')

};
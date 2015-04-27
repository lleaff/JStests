var fs = require('fs');

if (process.argv !== undefined) var filename = process.argv[2];
else throw new Error("No input file");

fs.watch(filename, function() {
	console.log(filename + " has been modified");
});

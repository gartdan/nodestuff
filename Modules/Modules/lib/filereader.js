var fs = require('fs');

var FileReader = function() {

}

FileReader.prototype.readTextFile = function(filePath, callback) {
        fs.readFile(filePath, callback);
        
}

FileReader.prototype.readSettings = function(filePath) {
    var data = fs.readFileSync(filePath);
    var txt = data.toString();
    var json = JSON.parse(txt); 
    return json;   
}


if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= FileReader;
}

const fs = require('fs');

// var jsonstr = '{"name":"Muthu"}';
// var obj = JSON.parse(jsonstr);
// console.log(obj);
// console.log(obj.name);

var origNotes = {title: 'title1', body: 'test body'};
fs.writeFileSync('test-note.json',JSON.stringify(origNotes));


var fileStr = fs.readFileSync('test-note.json').toString();
var fileObj = JSON.parse(fileStr);

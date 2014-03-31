var Calculator = require('./lib/calculator.js');

var TextPrinter = function() {

}

TextPrinter.prototype.print = function(err, data) {
    if(err) console.error(err);
    console.log(data.toString());
}

var calc = new Calculator();
var result = calc.add(1, 2);

console.log(result);
console.log('Hello world');

var FileReader = require('./lib/filereader.js');
var printer = new TextPrinter();

var text = '';
var fr = new FileReader();
fr.readTextFile('./readme.txt', printer.print);

var settings = fr.readSettings('./package.json');
console.log(settings.name);
console.log(settings.description);

function printText(err, data) {
    if(err) console.error(err);
    console.log(data.toString());
}

var ContactManager = require('./lib/contactmanager.js'), 
    Contact = require('./lib/contact.js');
var contact = new Contact();
contact.emailAddress = 'dgartner@gmail.com';
var cm = new ContactManager();
cm.on('contact-added', function(c) { console.log('added contact '+ c.emailAddress); });
cm.on('contact-deleted', function(c) { console.log('REMOVED CONTACT '+ c.emailAddress); });
cm.addContact(contact);
cm.deleteContact(contact);


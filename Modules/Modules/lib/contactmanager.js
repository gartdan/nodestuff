var events = require('events'),
    util = require('util'),
    fs = require('fs'),
    Contact = require('./contact.js');

var ContactManager = function () {
    this.contacts = [];
}

util.inherits(ContactManager, events.EventEmitter);

ContactManager.prototype.addContact = function(contact) {
    if(!contact.isvalid()) throw new Error("Invalid Contact");
    var c = this.findByEmail(contact.emailAddress);
    if(c !== null) {
        this.updateContact(c);
        return;
    }
    this.contacts.push(contact);
    this.emit('contact-added', contact);
}

ContactManager.prototype.findByEmail = function(emailAddress) {
    var result = this.contacts.filter(function(c) { return c.emailAddress == emailAddress; });
    if(result.length > 0)
        return result[0];
    return null;
}

ContactManager.prototype.updateContact = function(contact) {
    if(!contact.isvalid()) throw new Error("Invalid Contact");
    var toUpdate = this.findByEmail(contact.emailAddress);
    if(toUpdate != null) {
        toUpdate = contact;
        this.emit('contact-updated', contact);
    }
}

ContactManager.prototype.deleteContact = function(contact) {
    var toDelete = this.findByEmail(contact.emailAddress);
    if(toDelete != null) {
        var idx = this.contacts.indexOf(toDelete);
        this.contacts.splice(idx, 1);
        this.emit('contact-deleted', toDelete);
    }
}

module.exports = ContactManager;
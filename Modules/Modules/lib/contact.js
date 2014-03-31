var Contact = function()
{
    this.emailAddress = '';
    this.firstName = '';
    this.lastName = '';
    this.mobilePhone = '';
}

Contact.prototype.isvalid = function() {
    var re = /\S+@\S+\.\S+/;
    return re.test(this.emailAddress);
}

module.exports = Contact;
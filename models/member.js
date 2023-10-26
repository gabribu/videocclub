const mongoose = require('mongoose');


const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _phone: String,
    _address: {
        street: String,
        Number: String,
        zip: String,
        city: String,
        state: String,
        country: String
    }
});

class Member{
    constructor(name, lastName, phone, address){
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._address = address;
    }

    get name(){
        return this._name;
    }
    set name(v){
        return this._name = v;
    }
    get lastNameame(){
        return this._lastName;
    }
    set lastName(v){
        return this._lastName = v;
    }
    get phone(){
        return this._phone;
    }

    set phone(v){
        return this._phone = v;
    }
    get address(){
        return this._address;
    }

    set address(v){
        return this._address= v;
    }
}

schema.loadClass(Member);
module.exports = mongoose.model('Member', schema);
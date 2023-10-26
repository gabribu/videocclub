const mongoose = require('mongoose');

// Schema: Estructura que representa la coneccione que se encuentra en la base de datos
const schema = mongoose.Schema({
    _title:String,
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: 'Director'
    }
});

// Clase: Para los objetos
class Movie {
    constructor(title, director){
        this._title = title;
        this._director = director;
    }

    get title(){
        return this._title;
    }
    set title(v){
        this._title = v;
    }

    get director(){
        return this._director;
    }
    set director(v){
        this._director = v;
    }
}

schema.loadClass(Movie);
module.exports = mongoose.model('Movie', schema);
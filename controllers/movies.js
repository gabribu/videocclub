const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');

async  function create(req, res, next){
    const title = req.body.title;
    const directorId = req.body.directorId;

    let director = await Director.findOne({"_id":directorId});
    let movie = new Movie({
        title: title,
        director: director
    });

    movie.save().then(obj => res.status(200).json({
        msg: "Pelicula almacenada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "Pelicula no creada",
        obj: ex
    }))
}

function list(req, res, next) {
    Movie.find().populate("_director").then(objs => res.status(200).json({
        msg: "Lista de peliculas creada",
        objs: objs
    })).catch(ex => res.status(500).json({
        msg: "Lista no creada",
        obj: ex
    }))
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message:`Lista con el id ${id}`,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:`No se puedo consultar la lista con el id: ${id}`,
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let title = req.body.title ? req.body.title : "";
    let directorId = req.body.directorId ? req.body.directorId : "";
    let director = req.body.director ? req.body.director : "";
    let movie = new Object({
        _title:title, _director:director
    });
    
    User.findOneAndUpdate({"_id":id}, user, {new:true})
            .then(obj => res.status(200).json({
                message:`Usuario reemplazado correctamente, con el id: ${id}`,
                obj:obj
            })).catch(ex => res.status(500).json({
                message:`No se puedo reemplazar el usuario con el id: ${id}`,
                obj:ex
            }));
}

function update(req, res, next){
    res.send('Users update')
}

function destroy(req, res, next){
    res.send('Users destroy')
}

module.exports = {
    create, list, index, replace, update, destroy
};
